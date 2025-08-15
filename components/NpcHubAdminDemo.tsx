'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  FolderOpen, 
  Users, 
  FileText, 
  Lightbulb, 
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  X,
  Clock,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';

interface Post {
  id: string;
  title: string;
  category: string;
  author: string;
  status: string;
  date: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  posts: number;
}

interface Author {
  id: string;
  name: string;
  biography: string;
}

interface Proposal {
  id: string;
  title: string;
  source: string;
  date: string;
  status: string;
  variants: number;
}

const NpcHubAdminDemo: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const posts: Post[] = [
    { id: '1', title: 'Lies of P, DayZ та My Hero – безкоштовно!', category: 'Новини', author: 'Без автора', status: 'Опубліковано', date: '31.07.2025' },
    { id: '2', title: 'Календар релізів ігор 2025 від NPC HUB', category: 'Новини', author: 'Без автора', status: 'Опубліковано', date: '28.07.2025' },
    { id: '3', title: 'Коди для Sims 4: Чит-коди на ПК, PS4, PS5, Xbox One', category: 'Гайди', author: 'Main NPC', status: 'Опубліковано', date: '23.07.2025' },
    { id: '4', title: 'Як повернути гроші за гру в Steam', category: 'Гайди', author: 'Main NPC', status: 'Опубліковано', date: '23.07.2025' },
  ];

  const categories: Category[] = [
    { id: '1', name: 'Новини', slug: 'news', posts: 2 },
    { id: '2', name: 'Гайди', slug: 'guides', posts: 2 },
    { id: '3', name: 'Технології', slug: 'tech', posts: 0 },
    { id: '4', name: 'Огляди', slug: 'reviews', posts: 0 },
  ];

  const authors: Author[] = [
    { id: '1', name: 'Review NPC', biography: 'Немає біографії' },
    { id: '2', name: 'Main NPC', biography: 'Немає біографії' },
  ];

  const proposals: Proposal[] = [
    { id: '1', title: 'Ось кілька варіантів заголовків: *...', source: 'Немає посилання', date: '31.07.2025', status: 'Очікує', variants: 5 },
    { id: '2', title: 'Ось кілька варіантів заголовків: *...', source: 'Немає посилання', date: '24.07.2025', status: 'Очікує', variants: 5 },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">NPC HUB Admin Dashboard</h1>
        <p className="text-gray-600">Ласкаво просимо в адмін-панель!</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Управління контентом:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <FolderOpen className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700">Категорії - управління категоріями статей</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Users className="w-6 h-6 text-green-600" />
            <span className="text-gray-700">Автори - управління авторами</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <FileText className="w-6 h-6 text-purple-600" />
            <span className="text-gray-700">Пости - створення та редагування статей</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
            <span className="text-gray-700">Пропозиції - обробка пропозицій від парсерів</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FolderOpen className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Управління категоріями</h1>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Додати категорію
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Назва</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Постів</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дії</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {category.slug}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.posts}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-200 flex justify-end">
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</span>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ChevronDown className="w-4 h-4 rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAuthors = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Управління авторами</h1>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Додати автора
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ім&apos;я</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Біографія</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дії</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {authors.map((author) => (
                <tr key={author.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{author.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{author.biography}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4 text-blue-600" />
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
        <div className="px-6 py-3 border-t border-gray-200 flex justify-end">
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</span>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ChevronDown className="w-4 h-4 rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPosts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">Управління постами</h1>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Створити пост
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Заголовок</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Категорія</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Автор</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дії</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">{post.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4 text-blue-600" />
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
        <div className="px-6 py-3 border-t border-gray-200 flex justify-end">
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</span>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ChevronDown className="w-4 h-4 rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProposals = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Lightbulb className="w-6 h-6 text-yellow-600" />
          <h1 className="text-2xl font-bold text-gray-900">Пропозиції від геміні</h1>
        </div>
        <div className="text-sm text-gray-500">Всього: {proposals.length}</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Заголовок</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Джерело</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дії</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proposals.map((proposal) => (
                <tr key={proposal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-900 max-w-xs truncate">{proposal.title}</span>
                      <button className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200">
                        +{proposal.variants}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proposal.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proposal.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {proposal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-200 flex justify-center">
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</span>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ChevronDown className="w-4 h-4 rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return renderDashboard();
      case 'categories': return renderCategories();
      case 'authors': return renderAuthors();
      case 'posts': return renderPosts();
      case 'proposals': return renderProposals();
      default: return renderDashboard();
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Clock },
    { id: 'categories', label: 'Категорії', icon: FolderOpen },
    { id: 'authors', label: 'Автори', icon: Users },
    { id: 'posts', label: 'Пости', icon: FileText },
    { id: 'proposals', label: 'Пропозиції', icon: Lightbulb },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-blue-800 transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <Gamepad2 className="w-8 h-8 text-white" />
            {!sidebarCollapsed && <span className="text-xl font-bold text-white">NPC HUB</span>}
          </div>
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
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-100 hover:bg-blue-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex justify-center p-2 text-blue-100 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <ArrowLeft className={`w-5 h-5 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">Вийти</button>
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

export default NpcHubAdminDemo; 