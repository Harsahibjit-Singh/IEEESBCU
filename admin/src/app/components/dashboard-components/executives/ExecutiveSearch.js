// app/components/ExecutiveSearch.js
'use client';
import { useState } from 'react';

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

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`/api/executives/search_executive?${query}`);
    const data = await res.json();
    onSearch(data);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Search Executives</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {['name', 'society', 'rank', 'uniid', 'memid', 'branch'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={filters[field]}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        ))}
        <input type="number" name="graduation_year" placeholder="Graduation Year" value={filters.graduation_year} onChange={handleChange} className="p-2 border rounded" />
        <input type="date" name="start_date" value={filters.start_date} onChange={handleChange} className="p-2 border rounded" />
        <input type="date" name="end_date" value={filters.end_date} onChange={handleChange} className="p-2 border rounded" />
        <select name="sort_by" value={filters.sort_by} onChange={handleChange} className="p-2 border rounded">
          <option value="name">Name</option>
          <option value="graduation_year">Graduation Year</option>
        </select>
        <select name="order" value={filters.order} onChange={handleChange} className="p-2 border rounded">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setFilters((f) => ({ ...f, page: Math.max(1, f.page - 1) }))}
          className="px-3 py-1 bg-gray-300 rounded"
        >Prev</button>
        <span>Page {filters.page}</span>
        <button
          onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
          className="px-3 py-1 bg-gray-300 rounded"
        >Next</button>
        <button
          onClick={handleSearch}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >Search</button>
      </div>
    </div>
  );
}
