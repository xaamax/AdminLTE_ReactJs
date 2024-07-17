<?php

use Illuminate\Support\Facades\Route;


Route::prefix('v1')->middleware('jwt.auth')->group(function () {
    // auth
    Route::prefix('auth')->group(function () {
        Route::get('validate_token', 'App\Http\Controllers\AuthController@validateToken');
        Route::post('me', 'App\Http\Controllers\AuthController@me');
        Route::post('logout', 'App\Http\Controllers\AuthController@logout');
        Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
    });
    // dashboard
    Route::prefix('dashboard')->group(function () {
        Route::get('/', 'App\Http\Controllers\DashboardController@dashboard');
    });
});
Route::post('register', 'App\Http\Controllers\AuthController@register');
Route::post('login', 'App\Http\Controllers\AuthController@login');
// health
Route::get('health', 'App\Http\Controllers\HealthController@getHealth');
