<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SolicitudController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí se registran las rutas API de la aplicación.
|
*/

// ------------------------------------------------------
// 🔹 AUTENTICACIÓN Y REGISTRO
// ------------------------------------------------------
Route::post('/registrar', [UsuarioController::class, 'registrar']);
Route::post('/login', [UsuarioController::class, 'login']);
Route::post('/login-docente', [AuthController::class, 'loginDocente']);

Route::post('/solicitud', [SolicitudController::class, 'store']); 
Route::get('/solicitudes-usuario/{numControl}', [SolicitudController::class, 'solicitudesUsuario']); // Solo del usuario
Route::get('/solicitudes', [SolicitudController::class, 'obtenerSolicitudes']);
Route::patch('/solicitudes/{id}/estatus', [SolicitudController::class, 'actualizarEstatus']);

Route::prefix('usuario')->group(function () {
    Route::get('/numcontrol/{numControl}', [UsuarioController::class, 'usuarioPorNumControl']);
    Route::get('/id/{id}', [UsuarioController::class, 'show']);
    Route::put('/id/{id}', [UsuarioController::class, 'update']);
    Route::post('/verificar', [UsuarioController::class, 'verificarRecuperacion']);
    Route::post('/actualizar-contrasena', [UsuarioController::class, 'actualizarContrasena']);
});
