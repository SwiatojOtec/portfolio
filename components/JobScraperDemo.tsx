'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  link: string;
  source: string;
  dateAdded: string;
  status: 'new' | 'viewed' | 'applied' | 'favorite';
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Senior Project Manager',
    company: 'TechCorp Ukraine',
    location: 'Київ, Україна',
    link: '#',
    source: 'DOU',
    dateAdded: '2025-01-15',
    status: 'new'
  },
  {
    id: 2,
    title: 'Project Manager (IT)',
    company: 'SoftServe',
    location: 'Львів, Україна',
    link: '#',
    source: 'Work.ua',
    dateAdded: '2025-01-14',
    status: 'viewed'
  },
  {
    id: 3,
    title: 'Product Manager',
    company: 'EPAM Systems',
    location: 'Київ, Україна',
    link: '#',
    source: 'Djinni',
    dateAdded: '2025-01-13',
    status: 'applied'
  },
  {
    id: 4,
    title: 'Project Manager',
    company: 'Luxoft',
    location: 'Київ, Україна',
    link: '#',
    source: 'Robota.ua',
    dateAdded: '2025-01-12',
    status: 'favorite'
  },
  {
    id: 5,
    title: 'Senior Project Manager',
    company: 'GlobalLogic',
    location: 'Харків, Україна',
    link: '#',
    source: 'HappyMonday',
    dateAdded: '2025-01-11',
    status: 'new'
  },
  {
    id: 6,
    title: 'IT Project Manager',
    company: 'Ciklum',
    location: 'Київ, Україна',
    link: '#',
    dateAdded: '2025-01-10',
    source: 'Jobs.ua',
    status: 'viewed'
  },
  {
    id: 7,
    title: 'Project Manager',
    company: 'N-iX',
    location: 'Львів, Україна',
    link: '#',
    source: 'Jooble.ua',
    dateAdded: '2025-01-09',
    status: 'new'
  },
  {
    id: 8,
    title: 'Senior Project Manager',
    company: 'DataArt',
    location: 'Київ, Україна',
    link: '#',
    source: 'GRC.ua',
    dateAdded: '2025-01-08',
    status: 'applied'
  }
];

const sources = ['Всі', 'DOU', 'Work.ua', 'Djinni', 'Robota.ua', 'HappyMonday', 'Jobs.ua', 'Jooble.ua', 'GRC.ua'];

const JobScraperDemo: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSource, setSelectedSource] = useState('Всі');
  const [searchCompany, setSearchCompany] = useState('');
  const [searchPosition, setSearchPosition] = useState('project manager');

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesTab = activeTab === 'all' || 
        (activeTab === 'new' && job.status === 'new') ||
        (activeTab === 'viewed' && job.status === 'viewed') ||
        (activeTab === 'applied' && job.status === 'applied') ||
        (activeTab === 'favorite' && job.status === 'favorite');
      
      const matchesSource = selectedSource === 'Всі' || job.source === selectedSource;
      const matchesCompany = !searchCompany || job.company.toLowerCase().includes(searchCompany.toLowerCase());
      const matchesPosition = !searchPosition || job.title.toLowerCase().includes(searchPosition.toLowerCase());
      
      return matchesTab && matchesSource && matchesCompany && matchesPosition;
    });
  }, [activeTab, selectedSource, searchCompany, searchPosition]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-500';
      case 'viewed': return 'bg-blue-500';
      case 'applied': return 'bg-purple-500';
      case 'favorite': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Нова';
      case 'viewed': return 'Переглянута';
      case 'applied': return 'Відправлена';
      case 'favorite': return 'В обраних';
      default: return 'Невідомо';
    }
  };

  const handleRefresh = () => {
    // Симуляція оновлення даних
    const newJobs = mockJobs.map(job => ({
      ...job,
      status: job.status === 'new' ? 'viewed' : job.status
    }));
    // В реальному додатку тут був би запит до API
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Job Scraper Platform - Демо
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Інтерактивна демонстрація парсера вакансій з 11 українських сайтів пошуку роботи
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-gray-800 rounded-t-xl p-1">
          {[
            { key: 'all', label: 'Всі', count: mockJobs.length },
            { key: 'new', label: 'Нові', count: mockJobs.filter(j => j.status === 'new').length },
            { key: 'viewed', label: 'Переглянуті', count: mockJobs.filter(j => j.status === 'viewed').length },
            { key: 'applied', label: 'Відправлені', count: mockJobs.filter(j => j.status === 'applied').length },
            { key: 'favorite', label: 'В обраних', count: mockJobs.filter(j => j.status === 'favorite').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-lg mx-1 transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gray-800 rounded-xl p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Позиція
            </label>
            <input
              type="text"
              value={searchPosition}
              onChange={(e) => setSearchPosition(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="project manager"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Компанія
            </label>
            <input
              type="text"
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Назва компанії"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Джерело
            </label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleRefresh}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              🔄 Оновити вакансії
            </button>
          </div>
        </div>
      </motion.div>

      {/* Jobs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gray-800 rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Позиція
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Компанія
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Локація
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Джерело
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Дата
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-700 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{job.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{job.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{job.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                      {job.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(job.status)}`}>
                      {getStatusText(job.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(job.dateAdded).toLocaleDateString('uk-UA')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Вакансії не знайдено</div>
            <div className="text-gray-500 text-sm mt-2">Спробуйте змінити фільтри</div>
          </div>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Всього вакансій', value: mockJobs.length, color: 'bg-blue-500' },
          { label: 'Нові', value: mockJobs.filter(j => j.status === 'new').length, color: 'bg-green-500' },
          { label: 'Відправлені', value: mockJobs.filter(j => j.status === 'applied').length, color: 'bg-purple-500' },
          { label: 'В обраних', value: mockJobs.filter(j => j.status === 'favorite').length, color: 'bg-yellow-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-4 text-center">
            <div className={`w-12 h-12 ${stat.color} rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold`}>
              {stat.value}
            </div>
            <div className="text-gray-300 text-sm">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default JobScraperDemo; 