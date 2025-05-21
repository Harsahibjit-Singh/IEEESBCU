'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';

export default function ExecutiveSearch({ onSearch }) {
  const [filters, setFilters] = useState({
    name: '',
    society: '',
    rank: '',
    start_date: '',
    end_date: '',
    graduation_year: '',
    branch: '',
    uniid: '',
    memid: '',
    sort_by: 'name',
    order: 'asc',
    page: 1,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`/api/executives/search_executive?${query}`);
    const data = await res.json();
    onSearch(data);
  };

  const resetFilters = () => {
    setFilters({
      name: '',
      society: '',
      rank: '',
      start_date: '',
      end_date: '',
      graduation_year: '',
      branch: '',
      uniid: '',
      memid: '',
      sort_by: 'name',
      order: 'asc',
      page: 1,
    });
  };

  const filterFields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'society', type: 'text', placeholder: 'Society' },
    { name: 'rank', type: 'text', placeholder: 'Rank' },
    { name: 'uniid', type: 'text', placeholder: 'University ID' },
    { name: 'memid', type: 'text', placeholder: 'Member ID' },
    { name: 'branch', type: 'text', placeholder: 'Branch' },
    { name: 'graduation_year', type: 'number', placeholder: 'Graduation Year' },
    { name: 'start_date', type: 'date', placeholder: 'Start Date' },
    { name: 'end_date', type: 'date', placeholder: 'End Date' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-xl shadow-lg mb-6 border border-gray-100"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Search className="mr-2 text-blue-600" size={24} />
          Executive Search
        </h2>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Filter className="mr-2" size={16} />
            {isExpanded ? 'Hide Filters' : 'More Filters'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetFilters}
            className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <X className="mr-2" size={16} />
            Reset
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filterFields.slice(0, isExpanded ? filterFields.length : 3).map((field) => (
          <div key={field.name} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {field.placeholder}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={filters[field.name]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 placeholder-gray-500"
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Sort By</label>
          <select 
            name="sort_by" 
            value={filters.sort_by} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50"
          >
            <option value="name">Name</option>
            <option value="graduation_year">Graduation Year</option>
            <option value="rank">Rank</option>
            <option value="society">Society</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Order</label>
          <select 
            name="order" 
            value={filters.order} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilters((f) => ({ ...f, page: Math.max(1, f.page - 1) }))}
            disabled={filters.page === 1}
            className={`flex items-center px-4 py-2 rounded-lg ${filters.page === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'} transition-colors`}
          >
            <ChevronLeft className="mr-1" size={18} />
            Previous
          </motion.button>
          <span className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
            Page {filters.page}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
            className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Next
            <ChevronRight className="ml-1" size={18} />
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSearch}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
        >
          <Search className="mr-2" size={18} />
          Search Executives
        </motion.button>
      </div>
    </motion.div>
  );
}
