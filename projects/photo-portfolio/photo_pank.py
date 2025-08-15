# -*- coding: utf-8 -*-

import logging
import os
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, BotCommand
from telegram.ext import (
    Application, CommandHandler, MessageHandler, CallbackQueryHandler, 
    filters, ContextTypes, ConversationHandler
)
import firebase_admin
from firebase_admin import credentials, firestore, storage
from datetime import datetime
import uuid

# --- НАСТРОЙКА БЕЗОПАСНОСТИ И ПЕРЕМЕННЫХ ---
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "7087827232:AAGAo3Ga1dNr6mNX9Z4xkU5ITqtRpXpbJoc")
STORAGE_BUCKET_NAME = os.getenv("STORAGE_BUCKET_NAME", "photo-pank-9a004.firebasestorage.app")
FIREBASE_CREDS_PATH = "firebase-credentials.json"
# БЕЛЫЙ СПИСОК ID ПОЛЬЗОВАТЕЛЕЙ
ALLOWED_USER_IDS = [664948010, 946806089]


# Настройка логирования
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

# Инициализация Firebase
try:
    if not os.path.exists(FIREBASE_CREDS_PATH):
        raise FileNotFoundError(f"Файл {FIREBASE_CREDS_PATH} не найден.")
    cred = credentials.Certificate(FIREBASE_CREDS_PATH)
    firebase_admin.initialize_app(cred, {'storageBucket': STORAGE_BUCKET_NAME})
    db = firestore.client()
    bucket = storage.bucket()
    logger.info("Firebase успешно инициализирован.")
except Exception as e:
    logger.error(f"Ошибка инициализации Firebase: {e}")
    exit()

# Словарь для категорий
CATEGORY_MAP = {
    "futsal": "Футзал", "street": "Вуличний",
    "beach": "Пляжний", "photosession": "Фотосесія"
}

# Состояния для диалога
MAIN_MENU, ADD_PHOTO_CATEGORY, DELETE_CHOOSE_CATEGORY, DELETE_CONFIRM = range(4)

# --- Функции диалога ---

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Начало или перезапуск диалога. Проверяет ID и показывает главное меню."""
    user = update.effective_user
    if user.id not in ALLOWED_USER_IDS:
        await update.message.reply_text("Вибачте, у вас немає доступу до цього бота.")
        return ConversationHandler.END

    keyboard = [
        [InlineKeyboardButton("✅ Додати фото", callback_data="add_photo")],
        [InlineKeyboardButton("❌ Видалити фото", callback_data="delete_photo")],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    # Если это команда /start, отправляем новое сообщение. Если это колбэк - редактируем.
    if update.callback_query:
        await update.callback_query.edit_message_text(
            "Головне меню. Що хочете зробити?",
            reply_markup=reply_markup
        )
    else:
        await update.message.reply_text(
            "Привіт! Я ваш менеджер портфоліо. Що хочете зробити?",
            reply_markup=reply_markup
        )
    return MAIN_MENU


async def ask_for_photo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Обработка кнопки 'Додати фото'."""
    query = update.callback_query
    await query.answer()
    await query.edit_message_text(text="Чудово! Тепер просто надішліть мені фотографію як ФАЙЛ.")
    return MAIN_MENU

async def ask_for_delete_category(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Обработка кнопки 'Видалити фото' или команды /delete."""
    user_id = update.effective_user.id
    if user_id not in ALLOWED_USER_IDS:
        await update.message.reply_text("Вибачте, у вас немає доступу до цього бота.")
        return ConversationHandler.END
        
    keyboard = [
        [InlineKeyboardButton(display_name, callback_data=f"delcat_{internal_name}")]
        for internal_name, display_name in CATEGORY_MAP.items()
    ]
    keyboard.append([InlineKeyboardButton("⬅️ Назад", callback_data="back_to_main")])
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    text_to_send = "З якої категорії будемо видаляти фото?"

    if update.callback_query:
        await update.callback_query.edit_message_text(text=text_to_send, reply_markup=reply_markup)
    else:
        await update.message.reply_text(text=text_to_send, reply_markup=reply_markup)
        
    return DELETE_CHOOSE_CATEGORY

async def photo_add_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Получение файла с фото и запрос категории для добавления."""
    if not update.message.document or not update.message.document.mime_type.startswith('image'):
        await update.message.reply_text("Будь ласка, надішліть фотографію саме як ФАЙЛ.")
        return MAIN_MENU

    context.user_data['photo_file_id'] = update.message.document.file_id
    keyboard = [
        [InlineKeyboardButton(display_name, callback_data=f"addcat_{internal_name}")]
        for internal_name, display_name in CATEGORY_MAP.items()
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Фото отримав. Тепер виберіть категорію:", reply_markup=reply_markup)
    return ADD_PHOTO_CATEGORY

async def add_photo_to_category(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Сохранение фото в выбранную категорию."""
    query = update.callback_query
    await query.answer()
    category_internal_name = query.data.split("_", 1)[1]
    file_id = context.user_data.pop('photo_file_id', None)
    user_id = query.from_user.id
    
    if not file_id:
        await query.edit_message_text("Щось пішло не так. Надішліть фото ще раз.")
        return await start(update, context)

    category_display_name = CATEGORY_MAP.get(category_internal_name, category_internal_name)
    await query.edit_message_text(text=f"Завантажую фото в категорію '{category_display_name}'...")
    
    try:
        new_file = await context.bot.get_file(file_id)
        file_name = f"{uuid.uuid4()}.jpg"
        await new_file.download_to_drive(file_name)
        blob = bucket.blob(f"photos/{file_name}")
        blob.upload_from_filename(file_name)
        blob.make_public()
        photo_url = blob.public_url
        os.remove(file_name)

        doc_ref = db.collection('photos').document()
        doc_ref.set({
            'url': photo_url, 'category': category_internal_name,
            'category_display': category_display_name, 'timestamp': datetime.now(),
            'filename': file_name, 'user_id': user_id
        })
        await query.edit_message_text(text=f"Готово! ✅ Фото додано. \n\nНатисніть /start, щоб повернутись у головне меню.")
    except Exception as e:
        await query.edit_message_text(f"Помилка: {e}")
    
    return ConversationHandler.END

async def show_photos_to_delete(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Показывает фото из выбранной для удаления категории."""
    query = update.callback_query
    await query.answer()
    category_to_delete = query.data.split("_", 1)[1]
    user_id = query.from_user.id
    
    await query.edit_message_text(text=f"Завантажую фото з категорії '{CATEGORY_MAP.get(category_to_delete)}'...")

    docs = db.collection('photos').where('user_id', '==', user_id).where('category', '==', category_to_delete).order_by('timestamp', direction=firestore.Query.DESCENDING).limit(10).stream()
    
    photos_found = False
    for doc in docs:
        photos_found = True
        photo_data = doc.to_dict()
        caption = f"Завантажено: {photo_data.get('timestamp').strftime('%d-%m-%Y')}"
        keyboard = [[InlineKeyboardButton("❌ Видалити це фото", callback_data=f"del_{doc.id}")]]
        await context.bot.send_photo(chat_id=user_id, photo=photo_data['url'], caption=caption, reply_markup=InlineKeyboardMarkup(keyboard))
    
    if not photos_found:
        await context.bot.send_message(chat_id=user_id, text="В цій категорії немає фотографій.")
    
    await context.bot.send_message(chat_id=user_id, text="Щоб повернутись у головне меню, натисніть /start")
    return ConversationHandler.END


async def delete_photo_confirmed(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Удаляет фото после подтверждения."""
    query = update.callback_query
    await query.answer()
    doc_id = query.data.split("_", 1)[1]
    
    await query.message.delete()
    status_message = await context.bot.send_message(chat_id=query.from_user.id, text="Починаю видалення...")

    doc_ref = db.collection('photos').document(doc_id)
    try:
        doc = doc_ref.get()
        if doc.exists:
            photo_data = doc.to_dict()
            filename = photo_data.get('filename')
            if filename:
                bucket.blob(f"photos/{filename}").delete()
            doc_ref.delete()
            await status_message.edit_text("Фотографія успішно видалена! ✅\n\nНатисніть /start, щоб повернутись у головне меню.")
        else:
            await status_message.edit_text("Фото вже було видалено.")
    except Exception as e:
        await status_message.edit_text(f"Помилка при видаленні: {e}")

    return ConversationHandler.END

async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Отмена и выход из диалога."""
    await update.message.reply_text('Дію скасовано. Натисніть /start, щоб почати знову.')
    return ConversationHandler.END

async def post_init(application: Application) -> None:
    """Создает меню с командами после запуска бота."""
    await application.bot.set_my_commands([
        BotCommand("start", "🚀 Головне меню"),
        BotCommand("delete", "❌ Видалити фотографію"),
    ])

def main() -> None:
    """Основная функция для запуска, настройки и старта бота."""
    application = Application.builder().token(TELEGRAM_BOT_TOKEN).post_init(post_init).build()

    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],
        states={
            MAIN_MENU: [
                CallbackQueryHandler(ask_for_photo, pattern='^add_photo$'),
                CallbackQueryHandler(ask_for_delete_category, pattern='^delete_photo$'),
                MessageHandler(filters.Document.IMAGE, photo_add_handler),
            ],
            ADD_PHOTO_CATEGORY: [
                CallbackQueryHandler(add_photo_to_category, pattern='^addcat_'),
            ],
            DELETE_CHOOSE_CATEGORY: [
                CallbackQueryHandler(show_photos_to_delete, pattern='^delcat_'),
                CallbackQueryHandler(start, pattern='^back_to_main$'), # Используем start для возврата
            ],
        },
        fallbacks=[CommandHandler('cancel', cancel), CommandHandler('start', start)],
    )

    application.add_handler(conv_handler)
    application.add_handler(CommandHandler('delete', ask_for_delete_category))
    application.add_handler(CallbackQueryHandler(delete_photo_confirmed, pattern='^del_'))

    logger.info("Бот запускается...")
    application.run_polling()

if __name__ == "__main__":
    main()