<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChannelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header('Access-Control-Allow-Origin:  *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');


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

