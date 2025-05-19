import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function BookForm({ book }: { book?: any }) {
  const [form, setForm] = useState(book || {
    title: '', author: '', genre: '', year: 2024, price: 0, image: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const url = book ? `/api/books/${book.id}` : '/api/books';
    const method = book ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => {
      router.visit('/books-view'); // กลับหน้า list
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{book ? 'แก้ไขหนังสือ' : 'เพิ่มหนังสือ'}</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="title" placeholder="ชื่อหนังสือ" value={form.title} onChange={handleChange} required className="border p-2" />
        <input name="author" placeholder="ผู้เขียน" value={form.author} onChange={handleChange} required className="border p-2" />
        <input name="genre" placeholder="ประเภท" value={form.genre} onChange={handleChange} className="border p-2" />
        <input type="number" name="year" placeholder="ปี" value={form.year} onChange={handleChange} className="border p-2" />
        <input type="number" name="price" placeholder="ราคา" value={form.price} onChange={handleChange} className="border p-2" />
        <input name="image" placeholder="URL รูปภาพ" value={form.image} onChange={handleChange} className="border p-2" />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          {book ? 'บันทึกการแก้ไข' : 'เพิ่มหนังสือ'}
        </button>
      </form>
    </div>
  );
}
