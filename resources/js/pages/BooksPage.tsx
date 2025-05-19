import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

type Book = {
  id?: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  price: number;
  image?: string;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setBooks(data));
  };

  const handleDelete = (id?: number) => {
    if (!id) return;
    if (!confirm('คุณแน่ใจว่าต้องการลบหนังสือนี้?')) return;

    fetch(`/api/books/${id}`, { method: 'DELETE' })
      .then(() => {
        setSelectedBook(null); // ✅ ปิด Modal
        fetchBooks();
        alert('ลบหนังสือเรียบร้อยแล้ว ✅');
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 จัดการหนังสือ</h1>

      {/* 🔗 ปุ่มเพิ่มหนังสือ */}
      <div className="mb-6 text-center">
        <Link
          href="/books/create"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ เพิ่มหนังสือ
        </Link>
      </div>

      {/* 📘 แสดงรายการหนังสือเป็นการ์ด */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {books.map(book => (
          <div key={book.id} className="bg-white shadow rounded overflow-hidden text-center">
            <img
              src={book.image || 'https://via.placeholder.com/225x400'}
              alt={book.title}
              className="w-full object-cover aspect-[9/16]"
            />
            <div className="p-2">
              <h2 className="font-bold">{book.title}</h2>
              <p className="text-sm text-gray-600">✍️ {book.author}</p>
              <button
                onClick={() => setSelectedBook(book)}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                รายละเอียด
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🧾 Modal แสดงรายละเอียดหนังสือ */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setSelectedBook(null)}>✖</button>
            <img src={selectedBook.image} className="w-full object-cover aspect-[9/16] mb-4" />
            <h2 className="text-xl font-bold mb-2">{selectedBook.title}</h2>
            <p>✍️ {selectedBook.author}</p>
            <p>📖 {selectedBook.genre}</p>
            <p>📅 {selectedBook.year}</p>
            <p className="text-red-600 font-bold">💰 {selectedBook.price} บาท</p>
            <div className="mt-4 flex gap-2">
              <Link
                href={`/books/${selectedBook.id}/edit`}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
              >
                แก้ไข
              </Link>
              <button
                onClick={() => handleDelete(selectedBook.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
