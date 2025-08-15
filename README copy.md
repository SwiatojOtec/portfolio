# 🎮 NPC HUB - Український Ігровий Портал

![NPC HUB Logo](https://img.shields.io/badge/NPC_HUB-Gaming_Portal-blue?style=for-the-badge&logo=gamepad)

**NPC HUB** — це сучасний український ігровий портал, що поєднує новини, огляди та технологічні інновації у світі відеоігор. Проект створений з використанням найсучасніших веб-технологій і включає потужні інструменти для автоматизації контенту.

## 🌟 Основні функції

### 🎯 Контент-платформа
- **Багатокатегорійний блог** - новини, огляди, технології, гайди
- **SEO-оптимізація** - мета-теги, канонічні URL, sitemap
- **Адаптивний дизайн** - повна підтримка мобільних пристроїв
- **Українська локалізація** - весь контент українською мовою

### 🤖 AI-інтеграція
- **Gemini AI** - автоматичний рерайтинг статей
- **Генерація заголовків** - множинні варіанти заголовків
- **Контент-аналіз** - обробка та покращення текстів
- **Автоматичні описи** - SEO-описи на основі контенту

### 🕷️ Контент-парсери
- **Multi-site parsing** - IGN, Kotaku, GameSpot, PCGamer, Polygon
- **Кластеризація статей** - об'єднання схожих новин
- **Автоматичний контент** - повний текст статей з джерел
- **Similarity detection** - виявлення дублікатів

### ⚡ Адмін-панель
- **Управління контентом** - статті, категорії, автори
- **Парсер-інтерфейс** - запуск парсерів через веб-інтерфейс  
- **AI-інструменти** - рерайтинг та генерація контенту
- **Предложки** - обробка автоматично згенерованих статей

## 🛠️ Технічний стек

### Frontend (Next.js)
```json
{
  "framework": "Next.js 15.4.2",
  "runtime": "React 19.1.0", 
  "styling": "CSS + TailwindCSS",
  "editor": "TipTap + EditorJS",
  "ui": "Ant Design",
  "language": "TypeScript"
}
```

### Backend & Database
```json
{
  "database": "PostgreSQL",
  "orm": "Prisma 6.12.0",
  "auth": "JWT + bcryptjs",
  "api": "Next.js API Routes",
  "deployment": "Railway + Vercel"
}
```

### AI & Parsing
```json
{
  "ai": "Google Gemini 1.5 Flash",
  "parsing": "Cheerio + Axios",
  "similarity": "Custom algorithm",
  "content": "Multi-source aggregation"
}
```

## 🏗️ Архітектура проекту

```
NPC_HUB/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API endpoints
│   │   │   ├── admin/         # Admin operations
│   │   │   ├── ai/            # AI integration
│   │   │   └── parser/        # Content parsers
│   │   ├── blog/              # Blog pages
│   │   └── admin/             # Admin interface
│   ├── components/            # React components
│   ├── lib/                   # Core libraries
│   │   ├── parsers/           # Site-specific parsers
│   │   ├── gemini.ts          # AI integration
│   │   └── similarity.ts      # Content clustering
│   └── types/                 # TypeScript definitions
├── prisma/                    # Database schema
├── public/                    # Static assets
└── blog_npchub/              # Legacy Django project
    ├── backend/              # Django API
    └── frontend/             # React SPA
```

## 🚀 Швидкий старт

### Передумови
- Node.js 18+ 
- PostgreSQL 14+
- Git

### Локальна установка

1. **Клонування репозиторію**
```bash
git clone https://github.com/your-username/npc-hub.git
cd npc-hub
```

2. **Встановлення залежностей**
```bash
npm install
```

3. **Налаштування середовища**
```bash
# Створити .env.local файл
cp .env.example .env.local

# Додати необхідні змінні
DATABASE_URL="postgresql://user:password@localhost:5432/npchub"
JWT_SECRET="your-secret-key"
GEMINI_API_KEY="your-gemini-api-key"
```

4. **Налаштування бази даних**
```bash
# Генерація Prisma Client
npx prisma generate

# Міграції
npx prisma db push

# Seed data (опціонально)
curl http://localhost:3000/api/admin/seed
```

5. **Запуск проекту**
```bash
# Development режим
npm run dev

# Production build
npm run build
npm start
```

Проект буде доступний за адресою: `http://localhost:3000`

## 🌐 Деплоймент

### Production Setup (Railway + Vercel)

**Backend (Railway):**
- PostgreSQL база даних
- Next.js API
- Автоматичний деплой з GitHub

**Frontend (Vercel):**
- Static site generation
- Edge функції для API
- CDN розподіл контенту

Детальна інструкція: [DEPLOYMENT.md](DEPLOYMENT.md)

### Змінні середовища

**Обов'язкові:**
```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-jwt-secret
```

**Опціональні:**
```env
GEMINI_API_KEY=your-gemini-key
GEMINI_API_KEY_2=backup-key-2
GEMINI_API_KEY_3=backup-key-3
GEMINI_API_KEY_4=backup-key-4
GEMINI_API_KEY_5=backup-key-5
```

## 📊 Основні можливості

### 🎮 Контент-менеджмент
- ✅ Створення та редагування статей
- ✅ Категоризація контенту  
- ✅ Управління авторами
- ✅ SEO-оптимізація
- ✅ Зображення та медіа

### 🤖 Автоматизація
- ✅ Парсинг новин з 5+ джерел
- ✅ AI-рерайтинг контенту
- ✅ Генерація заголовків
- ✅ Кластеризація схожих статей
- ✅ Автоматичні предложки

### 🔧 Адміністрування  
- ✅ Веб-інтерфейс адміна
- ✅ Управління парсерами
- ✅ AI-інструменти
- ✅ Аналітика контенту
- ✅ Модерація предложок

## 🎯 API Endpoints

### Публічні маршрути
```
GET  /                          # Головна сторінка
GET  /blog                      # Список статей
GET  /blog/[category]           # Категорія статей
GET  /blog/[category]/[slug]    # Окрема стаття
GET  /about                     # Про нас
GET  /contacts                  # Контакти
```

### Адмін API
```
POST /api/admin/simple-auth     # Авторизація
GET  /api/admin/posts           # Список постів
POST /api/admin/posts           # Створення поста
GET  /api/admin/categories      # Категорії
GET  /api/admin/authors         # Автори
GET  /api/admin/suggested       # Предложки
```

### Парсери та AI
```
POST /api/parser/ign            # IGN парсер
POST /api/parser/multi          # Мульти-парсер  
POST /api/ai/rewrite           # AI рерайтинг
POST /api/upload               # Завантаження файлів
```

## 📝 Модель даних

### Основні сутності
```prisma
model Post {
  id              Int       @id @default(autoincrement())
  title           String
  content         String
  slug            String    @unique
  excerpt         String?
  featuredImage   String?
  published       Boolean   @default(false)
  category        Category  @relation(fields: [categoryId], references: [id])
  author          Author?   @relation(fields: [authorId], references: [id])
  // SEO поля
  metaTitle       String?
  metaDescription String?
  keywords        String?
}
```

Повна схема: [prisma/schema.prisma](prisma/schema.prisma)

## 🔍 Парсери контенту

### Підтримувані сайти
- **IGN** - ігрові новини та огляди
- **Kotaku** - ігрова журналістика  
- **GameSpot** - новини та огляди ігор
- **PCGamer** - PC ігри та технології
- **Polygon** - ігрова індустрія

### Можливості парсерів
- 🔄 Автоматичне оновлення контенту
- 🧠 Кластеризація схожих статей  
- 🎯 Категоризація за темами
- 📝 Повний текст статей
- 🔗 Збереження джерел

## 🤖 AI інтеграція

### Google Gemini Features
- **Рерайтинг** - унікалізація контенту
- **Генерація заголовків** - множинні варіанти
- **SEO-описи** - автоматичні meta descriptions  
- **Переклад** - адаптація для української аудиторії
- **Ротація ключів** - обхід лімітів API

### Приклад використання
```javascript
// Рерайтинг статті
const rewritten = await rewriteArticle(originalContent, sourceUrl)

// Генерація заголовків
const titles = await generateMultipleTitles(content, originalTitle)

// Обробка кластера статей
const suggestions = await generateArticleSuggestions(news, reviews)
```

## 🎨 Дизайн та UX

### Тема оформлення
- **Стиль:** Cyberpunk/Gaming
- **Кольори:** Темна тема з неоновими акцентами
- **Типографіка:** Сучасні, читабельні шрифти
- **Анімації:** Плавні переходи та ефекти

### Адаптивність
- 📱 Mobile-first підхід
- 💻 Підтримка всіх екранів
- ⚡ Швидке завантаження
- ♿ Доступність (A11Y)

## 🔒 Безпека

### Аутентифікація
- JWT токени для адмінів
- Bcrypt хешування паролів
- Session management
- CORS налаштування

### Валідація даних
- Server-side валідація
- SQL injection захист (Prisma)
- XSS захист
- Rate limiting

## 📈 SEO та продуктивність

### SEO функції
- ✅ Meta tags управління
- ✅ Canonical URLs  
- ✅ XML Sitemap
- ✅ Robots.txt
- ✅ Google Search Console інтеграція
- ✅ Structured data

### Оптимізація
- ⚡ Next.js SSR/SSG
- 🖼️ Оптимізація зображень
- 📦 Code splitting
- 💾 Кешування
- 🌐 CDN розподіл

## 🧪 Тестування та якість

### Code Quality
```bash
# Лінтинг
npm run lint

# Type checking  
npx tsc --noEmit

# Форматування
npm run format
```

### База даних
```bash
# Перегляд даних
npx prisma studio

# Міграції
npx prisma migrate dev

# Seed
curl localhost:3000/api/admin/seed
```

## 🤝 Внесок у проект

Ми відкриті до співпраці! Якщо ви хочете допомогти:

1. Fork репозиторію
2. Створіть feature branch (`git checkout -b feature/amazing-feature`)
3. Commit зміни (`git commit -m 'Add amazing feature'`)
4. Push до branch (`git push origin feature/amazing-feature`)
5. Відкрийте Pull Request

### Правила контрибуції
- Код українською мовою в коментарях
- TypeScript для всього коду
- Дотримання ESLint правил
- Тестування нових функцій

## 📄 Ліцензія

Цей проект розповсюджується під ліцензією MIT. Дивіться [LICENSE](LICENSE) для деталей.

## 👥 Команда

- **Головний розробник** - Ваше ім'я
- **UI/UX дизайн** - Команда дизайнерів  
- **Контент-менеджмент** - Редакційна команда

## 📞 Контакти

- **Сайт:** [https://npc-hub.vercel.app](https://npc-hub.vercel.app)
- **Email:** contact@npchub.ua
- **GitHub:** [https://github.com/your-username/npc-hub](https://github.com/your-username/npc-hub)

## 📋 Roadmap

### v1.1 (Планується)
- [ ] Система коментарів
- [ ] Користувацькі профілі
- [ ] Push-сповіщення
- [ ] Мобільний додаток

### v1.2 (Майбутнє)
- [ ] Відео-контент
- [ ] Подкасти
- [ ] Стрімінг інтеграція
- [ ] Соціальні функції

---

<div align="center">

**🎮 NPC HUB - Твій провідник у світі ігор! 🎮**

[![Made with ❤️ in Ukraine](https://img.shields.io/badge/Made_with_❤️_in-Ukraine-blue?style=for-the-badge&logo=ukraine)](https://ukraine.ua/)

</div>
