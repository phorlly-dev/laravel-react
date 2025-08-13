<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\RepresentativeController;
use App\Http\Controllers\Api\Usercontroller;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register')->name('create');
    Route::post('login', 'login')->name('auth');
})->middleware('guest');
Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::get('me', 'me')->name('owner');
        Route::post('logout', 'logout')->name('clear');
    });

    Route::apiResource('users', UserController::class);

    // Customer routes
    Route::apiResource('customers', CustomerController::class);
    Route::get('customers-statistics', [CustomerController::class, 'statistics']);

    // Country routes
    Route::apiResource('countries', CountryController::class)->only(['index', 'show']);

    // Representative routes
    Route::apiResource('representatives', RepresentativeController::class)->only(['index', 'show']);
    Route::get('representatives/{representative}/customers', [RepresentativeController::class, 'customers']);
});
