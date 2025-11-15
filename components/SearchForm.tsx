
import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (category: string) => void;
  initialCategory: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, initialCategory }) => {
  const [searchTerm, setSearchTerm] = useState(initialCategory);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="e.g., Fantasy, History, Technology..."
        className="flex-grow bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow duration-300"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
