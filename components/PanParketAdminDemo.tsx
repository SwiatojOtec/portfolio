'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Grid3X3, 
  ShoppingCart, 
  Package, 
  FolderOpen, 
  Users, 
  FileText, 
  Mail, 
  Download, 
  DollarSign,
  LogOut,
  Search,
  Plus,
  Eye,
  Download as DownloadIcon,
  Copy,
  Edit,
  Trash2,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  Clock,
  Truck,
  Calendar,
  Phone,
  MapPin,
  MessageSquare
} from 'lucide-react';

interface Order {
  id: string;
  client: string;
  amount: number;
  status: 'confirmed' | 'processing' | 'shipped';
  date: string;
  products: string[];
}

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: string;
  unit: string;
  image?: string;
}

interface Category {
  name: string;
  subcategories: number;
  products: number;
  description?: string;
}

const PanParketAdminDemo: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const orders: Order[] = [
    { id: '#1234', client: 'Іван Петренко', amount: 2500, status: 'confirmed', date: '2024-01-15', products: ['Паркет дубовий', 'Підкладка'] },
    { id: '#1235', client: 'Марія Коваленко', amount: 1800, status: 'processing', date: '2024-01-15', products: ['Ламінат'] },
    { id: '#1236', client: 'Олександр Сидоренко', amount: 3200, status: 'shipped', date: '2024-01-14', products: ['Вінілова підлога', 'Підкладка'] },
    { id: '#1237', client: 'Анна Мельник', amount: 950, status: 'confirmed', date: '2024-01-14', products: ['Підвіконня'] },
  ];

  const products: Product[] = [
    { id: '1', name: 'тест паркет', sku: 'parq-001', category: 'Паркет', price: 2000, stock: '123 м2', unit: 'м2' },
    { id: '2', name: 'Композитне покриття', sku: 'ATW--spc-whispers-551059', category: 'Вінілова підлога', price: 1650, stock: 'В наявності', unit: 'м2' },
    { id: '3', name: 'Ламінат Premium', sku: 'ATW--spc-enchante-550229', category: 'Ламінат', price: 1200, stock: '45 м2', unit: 'м2' },
    { id: '4', name: 'Підкладка звукоізоляційна', sku: 'pod-001', category: 'Підкладка', price: 85, stock: '200 м2', unit: 'м2' },
  ];

  const categories: Category[] = [
    { name: 'Вінілова підлога', subcategories: 0, products: 23 },
    { name: 'Ламінат', subcategories: 0, products: 39 },
    { name: 'Паркет', subcategories: 0, products: 1, description: 'Купити паркет у Києві від ПАН ПАРКЕТ. Широкий вибір дерев\'яного паркету: дуб, ясен, горіх. Якість, гарантія, вигідна ціна.' },
    { name: 'Підвіконня', subcategories: 0, products: 28 },
    { name: 'Підкладка', subcategories: 2, products: 25 },
    { name: 'Супутні товари', subcategories: 1, products: 11 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Підтверджено';
      case 'processing': return 'В обробці';
      case 'shipped': return 'Відправлено';
      default: return 'Невідомо';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Дашборд</h1>
        <p className="text-gray-600">Огляд вашого бізнесу</p>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex items-center text-green-600 text-sm">
              <ArrowUp className="w-4 h-4 mr-1" />
              +12%
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">Всього товарів</p>
            <p className="text-2xl font-bold text-gray-900">1,234</p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex items-center text-green-600 text-sm">
              <ArrowUp className="w-4 h-4 mr-1" />
              +5%
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">Замовлень сьогодні</p>
            <p className="text-2xl font-bold text-gray-900">23</p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex items-center text-red-600 text-sm">
              <ArrowDown className="w-4 h-4 mr-1" />
              -2%
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">Активних клієнтів</p>
            <p className="text-2xl font-bold text-gray-900">456</p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex items-center text-green-600 text-sm">
              <ArrowUp className="w-4 h-4 mr-1" />
              +18%
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">Виручка за місяць</p>
            <p className="text-2xl font-bold text-gray-900">₴125,000</p>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Останні замовлення</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">НОМЕР</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">КЛІЄНТ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">СУМА</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">СТАТУС</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₴{order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Товари</h1>
          <p className="text-gray-600">Управління каталогом товарів</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Перевірити всі ціни
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Додати товар
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Пошук товарів..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
          <option>Всі категорії</option>
          <option>Паркет</option>
          <option>Ламінат</option>
          <option>Вінілова підлога</option>
          <option>Підкладка</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ТОВАР</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">КАТЕГОРІЯ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ЦІНА</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ЗАЛИШОК</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ОДИНИЦЯ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ДІЇ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs mr-3">
                        IMG
                      </div>
                      <span className="text-sm font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.price.toLocaleString()} UAH
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <DownloadIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Категорії</h1>
          <p className="text-gray-600">Управління категоріями товарів</p>
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Додати категорію
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Пошук категорій..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">КАТЕГОРІЯ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ОПИС</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ПІДКАТЕГОРІЇ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ТОВАРИ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ДІЇ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium mr-3">
                        {category.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        {category.description && (
                          <div className="text-xs text-gray-500 max-w-xs truncate">{category.description}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.subcategories} підкатегорій</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.products} товарів</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4 text-red-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Замовлення</h1>
        <p className="text-gray-600">Управління замовленнями клієнтів</p>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Пошук замовлень..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
          <option>Всі статуси</option>
          <option>Підтверджено</option>
          <option>В обробці</option>
          <option>Відправлено</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">НОМЕР</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">КЛІЄНТ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ДАТА</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">СУМА</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ТОВАРИ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">СТАТУС</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ДІЇ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  Замовлень не знайдено
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Клієнти</h1>
          <p className="text-gray-600">Управління базою клієнтів</p>
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Додати клієнта
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Пошук клієнтів за ім'ям, email, телефоном або замітками..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          Знайдено: 0 з 0 клієнтів
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">КЛІЄНТ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">КОНТАКТИ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">АДРЕСА</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ЗАМІТКА</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ЗАМОВЛЕННЯ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ДАТА РЕЄСТРАЦІЇ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ДІЇ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  Клієнтів не знайдено
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Рахунки</h1>
        <p className="text-gray-600">Управління рахунками та оплатами</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">НОМЕР</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">КЛІЄНТ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ЗАМОВЛЕННЯ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">СУМА</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">СТАТУС</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ТЕРМІН ОПЛАТИ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ДІЇ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  Рахунків не знайдено
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAppeals = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Звернення</h1>
        <p className="text-gray-600">Управління зверненнями клієнтів</p>
      </div>

      <div className="flex space-x-4">
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
          <option>Всі статуси</option>
          <option>Нові</option>
          <option>В обробці</option>
          <option>Вирішено</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Клієнт</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Контакти</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тема</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дії</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  Показано 1 - 0 з 0
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-200 flex justify-end space-x-2">
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
            Попередня
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
            Наступна
          </button>
        </div>
      </div>
    </div>
  );

  const renderMail = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Пошта</h1>
        <p className="text-gray-600">Управління поштовою системою</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Поштова система налаштовується</p>
      </div>
    </div>
  );

  const renderCurrency = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Курс валют</h1>
        <p className="text-gray-600">Налаштування курсів валют</p>
      </div>

      <div className="max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Курс EUR → UAH</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Курс EUR</label>
              <input
                type="text"
                value="48,15"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Зберегти
            </button>
            
            <div className="text-sm text-gray-600">
              Поточний курс: <span className="font-semibold">48.15 UAH</span> за 1 EUR
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return renderDashboard();
      case 'products': return renderProducts();
      case 'categories': return renderCategories();
      case 'orders': return renderOrders();
      case 'clients': return renderClients();
      case 'invoices': return renderInvoices();
      case 'appeals': return renderAppeals();
      case 'mail': return renderMail();
      case 'currency': return renderCurrency();
      default: return renderDashboard();
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: Grid3X3 },
    { id: 'orders', label: 'Трекер замовлень', icon: ShoppingCart },
    { id: 'products', label: 'Товари', icon: Package },
    { id: 'categories', label: 'Категорії', icon: FolderOpen },
    { id: 'orders', label: 'Замовлення', icon: ShoppingCart },
    { id: 'clients', label: 'Клієнти', icon: Users },
    { id: 'invoices', label: 'Рахунки', icon: FileText },
    { id: 'appeals', label: 'Звернення', icon: MessageSquare },
    { id: 'mail', label: 'Пошта', icon: Mail },
    { id: 'currency', label: 'Курс валют', icon: DollarSign },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">ПАН ПАРКЕТ</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Вийти
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-end">
            <span className="text-sm font-medium text-gray-700">Адміністратор</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default PanParketAdminDemo; 