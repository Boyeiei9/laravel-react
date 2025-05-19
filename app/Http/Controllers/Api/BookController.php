<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        return Book::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'genre' => 'nullable|string',
            'year' => 'nullable|numeric',
            'price' => 'nullable|numeric',
            'image' => 'nullable|string',
        ]);

        return Book::create($data);
    }

    public function show(Book $book)
    {
        return $book;
    }

    public function update(Request $request, Book $book)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'genre' => 'nullable|string',
            'year' => 'nullable|numeric',
            'price' => 'nullable|numeric',
            'image' => 'nullable|string',
        ]);

        $book->update($data);
        return $book;
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(['message' => 'ลบเรียบร้อย']);
    }
}
