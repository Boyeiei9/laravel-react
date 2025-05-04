<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

//
Route::get('/test', function () {
    return Inertia::render('Test');
})->name('test');


Route::get('/tictactoe', function () {
    return Inertia::render('Tictactoe');
})->name('tictactoe');

Route::get('/fruit', function () {
    return Inertia::render('Fruit');
})->name('fruit');


//20/4/2025
Route::get('/bootstrap', function () {
    return Inertia::render('BootstrapContent');
})->name('bootstrap');

//27/4/2025
Route::get('/circle', function () {
    return Inertia::render('Circle');
})->name('circle');

Route::get('/counter', function () {
    return Inertia::render('Counter');
})->name('counter');

Route::get('/form-example', function () {
    return Inertia::render('FormExample');
})->name('form-example');

Route::get('/list-manager', function () {
    return Inertia::render('ListManager');
})->name('list-manager');

Route::get('/infinite-scroll', function () {
    return Inertia::render('InfiniteScrollExample');
})->name('infinite-scroll');

//quiz
// Route สำหรับไปหน้า Queue
// แสดงหน้าคิว
use Illuminate\Support\Facades\Cache;

Route::post('/queue/request', function () {
    // ดึงหมายเลขคิวล่าสุดจาก Cache (หรือ DB ก็ได้)
    $last = Cache::get('last_queue_number', 0);
    $newQueue = $last + 1;
    Cache::put('last_queue_number', $newQueue);

    return response()->json([
        'queue_number' => $newQueue,
    ]);
});

Route::post('/queue/cancel', function () {
    return response()->json(['message' => 'Cancelled']);
});

Route::get('/queue', function () {
    return Inertia::render('Queue');
})->name('queue');



