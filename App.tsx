
import React, { useState, useEffect, useCallback } from 'react';
import SearchForm from './components/SearchForm';
import BookList from './components/BookList';
import type { Book } from './types';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [category, setCategory] = useState<string>('science_fiction');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    if (!category) return;

    setIsLoading(true);
    setError(null);
    setBooks([]);

    try {
      const response = await fetch(`https://openlibrary.org/subjects/${category}.json?limit=20`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.works && data.works.length > 0) {
        setBooks(data.works);
      } else {
        setBooks([]); // Set to empty if no works found
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(`Failed to fetch books. Please try a different category. Error: ${e.message}`);
      } else {
        setError('An unknown error occurred.');
      }
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearch = (newCategory: string) => {
    const formattedCategory = newCategory.trim().toLowerCase().replace(/\s+/g, '_');
    setCategory(formattedCategory);
  };
  
  const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            Book Explorer
          </h1>
          <p className="text-slate-400 mt-2">Discover books from your favorite categories.</p>
        </header>

        <SearchForm onSearch={handleSearch} initialCategory="Science Fiction" />

        <div className="mt-12">
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-center text-red-400 bg-red-900/50 p-4 rounded-md">{error}</p>}
          {!isLoading && !error && books.length === 0 && (
            <p className="text-center text-slate-500">No books found for this category. Try another one!</p>
          )}
          {!isLoading && !error && books.length > 0 && <BookList books={books} />}
        </div>
      </main>
    </div>
  );
};

export default App;
