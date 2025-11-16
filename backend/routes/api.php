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

// ------------------------------------------------------
// 🔹 SOLICITUDES
// ------------------------------------------------------
Route::post('/solicitud', [SolicitudController::class, 'store']); // Crear solicitud
Route::get('/solicitudes-usuario/{numControl}', [SolicitudController::class, 'solicitudesUsuario']); // Solo del usuario
Route::get('/solicitudes', [SolicitudController::class, 'obtenerSolicitudes']); // Para admin

// ------------------------------------------------------
// 🔹 USUARIO
// ------------------------------------------------------
Route::prefix('usuario')->group(function () {
    // 🔹 Obtener usuario por numControl
    Route::get('/numcontrol/{numControl}', [UsuarioController::class, 'usuarioPorNumControl']);

    // 🔹 Obtener usuario por ID
    Route::get('/id/{id}', [UsuarioController::class, 'show']);

    // 🔹 Actualizar usuario por ID
    Route::put('/id/{id}', [UsuarioController::class, 'update']);

    // 🔹 Recuperación de contraseña
    Route::post('/verificar', [UsuarioController::class, 'verificarRecuperacion']);
    Route::post('/actualizar-contrasena', [UsuarioController::class, 'actualizarContrasena']);
});
