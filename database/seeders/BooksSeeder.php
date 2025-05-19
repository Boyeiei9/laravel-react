<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BooksSeeder extends Seeder
{
    public function run()
    {
        DB::table('books')->insert([
            [
                'title' => 'The Hobbit',
                'author' => 'J.R.R. Tolkien',
                'genre' => 'Fantasy',
                'year' => 1937,
                'price' => 19.99,
                'created_at' => now(),
                'updated_at' => now(),
                'image' => 'https://inwfile.com/s-dx/gm54qw.jpg',
            ],
            [
                'title' => '1984',
                'author' => 'George Orwell',
                'genre' => 'Dystopia',
                'year' => 1949,
                'price' => 14.99,
                'created_at' => now(),
                'updated_at' => now(),
                'image' => 'https://image.makewebcdn.com/makeweb/m_1920x0/7GFEYsdVK/DefaultData/1984.jpg',
            ],
            [
                'title' => 'The Catcher in the Rye',
                'author' => 'J.D. Salinger',
                'genre' => 'Classic',
                'year' => 1951,
                'price' => 10.50,
                'created_at' => now(),
                'updated_at' => now(),
                'image' => 'https://images.squarespace-cdn.com/content/v1/57923bb33e00be1777423ef5/1586280358093-RLUQ54VAQCDEBKRQVQUT/IMG_1836.jpeg?format=1000w',
            ],
            [
                'title' => 'To Kill a Mockingbird',
                'author' => 'Harper Lee',
                'genre' => 'Classic',
                'year' => 1960,
                'price' => 12.99,
                'created_at' => now(),
                'updated_at' => now(),
                'image' => 'https://m.media-amazon.com/images/I/81OdwZGdRXL.jpg',
            ],
            [
                'title' => 'Brave New World',
                'author' => 'Aldous Huxley',
                'genre' => 'Dystopia',
                'year' => 1932,
                'price' => 15.99,
                'created_at' => now(),
                'updated_at' => now(),
                'image' => 'https://images-na.ssl-images-amazon.com/images/I/71UwSHSZRnS.jpg',
            ],
            [
                'title' => 'The Great Gatsby',
                'author' => 'F. Scott Fitzgerald',
                'genre' => 'Classic',
                'year' => 1925,
                'price' => 11.99,
                'created_at' => now(),
                'updated_at' => now(),
                'image' => 'https://m.media-amazon.com/images/I/81AFgU9z-dL.jpg',
            ],
            [
                'title' => 'Harry Potter and the Sorcerer\'s Stone',
                'author' => 'J.K. Rowling',
                'genre' => 'Fantasy',
                'year' => 1997,
                'price' => 24.99,
                'created_at' => now(),
                'updated_at' => now(),
                'image' => 'https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg',
            ],
            [
                'title' => 'The Lord of the Rings',
                'author' => 'J.R.R. Tolkien',
                'genre' => 'Fantasy',
                'year' => 1954,
                'price' => 29.99,
                'created_at' => now(),
                'updated_at' => now(),
                'image' => 'https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg',
            ],
            [
                'title' => 'Fahrenheit 451',
                'author' => 'Ray Bradbury',
                'genre' => 'Dystopia',
                'year' => 1953,
                'price' => 13.50,
                'created_at' => now(),
                'updated_at' => now(),
                'image' => 'https://m.media-amazon.com/images/I/71OFqSRFDgL.jpg',
            ],
            [
                'title' => 'Pride and Prejudice',
                'author' => 'Jane Austen',
                'genre' => 'Romance',
                'year' => 1813,
                'price' => 9.99,
                'created_at' => now(),
                'updated_at' => now(),
                'image' => 'https://images-na.ssl-images-amazon.com/images/I/91HHqVTAJQL.jpg',
            ],
            [
                'title' => 'Moby Dick',
                'author' => 'Herman Melville',
                'genre' => 'Adventure',
                'year' => 1851,
                'price' => 17.75,
                'created_at' => now(),
                'updated_at' => now(),
                'image' => 'https://m.media-amazon.com/images/I/71O0hYRiZCL.jpg',
            ],
        ]);
    }
}
