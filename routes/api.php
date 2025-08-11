<?php

use App\Http\Controllers\Api\Usercontroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    Route::apiResource('users', UserController::class);
});
