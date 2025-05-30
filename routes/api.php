<?php

use App\Http\Controllers\Api\ProductController;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Book;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//11/5/68

Route::get('/product', function () {
    $products = Product::all(); // Fetch all products
    return response()->json($products); // Return as JSON
});


Route::get('/books', function () {
    return response()->json(Book::all());
});

Route::apiResource('/product', ProductController::class);

//homework

use App\Http\Controllers\Api\BookController;
Route::apiResource('books', BookController::class);


//project
use App\Http\Controllers\Api\EmployeeController;
use App\Models\Employee;

Route::apiResource('employees', EmployeeController::class);

Route::get('/employees', function () {
    return response()->json(Employee::all());
});


