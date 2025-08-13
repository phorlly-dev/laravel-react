<?php

use App\Http\Controllers\Web\Homecontroller;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('welcome'))->name('home');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');
    Route::get('users/list', [Homecontroller::class, 'userList'])->name('user.list');
    Route::get('customers/list', [Homecontroller::class, 'customerList'])->name('customer.list');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
