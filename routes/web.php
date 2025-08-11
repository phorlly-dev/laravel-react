<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\Homecontroller;


Route::get('/', fn() => Inertia::render('welcome'))->name('home');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');
    Route::get('users/list', [Homecontroller::class, 'userList'])->name('user.list');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
