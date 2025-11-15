
import React from 'react';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const coverUrl = book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
    : 'https://picsum.photos/200/300?grayscale';

  const authors = book.authors?.map((author) => author.name).join(', ') || 'Unknown Author';

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-2 transition-all duration-300 group">
      <div className="relative aspect-[2/3]">
        <img
          src={coverUrl}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
             <p className="text-slate-400 text-sm">First published: {book.first_publish_year}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-100 truncate" title={book.title}>
          {book.title}
        </h3>
        <p className="text-slate-400 text-sm mt-1 truncate" title={authors}>
          {authors}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
