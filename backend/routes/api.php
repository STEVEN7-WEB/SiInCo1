<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
use App\Http\Controllers\UsuarioController;

Route::post('/registrar', [UsuarioController::class, 'registrar']);
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);

use App\Http\Controllers\SolicitudController;
Route::post('/solicitudes', [SolicitudController::class, 'store']);

