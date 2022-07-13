<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChannelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;







Route::middleware(['cors'])->group(function () {

    
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::post('/cikis', [AuthController::class, 'logout']);
    });

    Route::post('/kaydol', [AuthController::class, 'register']);
    Route::post('/giris', [AuthController::class, 'login']);
    Route::get('/kanallar', [ChannelController::class, 'getAllChannels']);
    Route::get('/canli-izle/{id}', [ChannelController::class, 'getSingleChannel']);
});
