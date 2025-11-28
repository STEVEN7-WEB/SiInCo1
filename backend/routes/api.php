<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\InventarioController;
use App\Http\Controllers\AdminDocenteController;

Route::post('/registrar', [UsuarioController::class, 'registrar']);
Route::post('/login', [UsuarioController::class, 'login']);
Route::post('/login-docente', [AuthController::class, 'loginDocente']);

Route::post('/solicitud', [SolicitudController::class, 'store']); 
Route::get('/solicitudes-usuario/{numControl}', [SolicitudController::class, 'solicitudesUsuario']); 
Route::get('/solicitudes', [SolicitudController::class, 'obtenerSolicitudes']);
Route::patch('/solicitudes/{id}/estatus', [SolicitudController::class, 'actualizarEstatus']);

Route::prefix('usuario')->group(function () {
    Route::get('/numcontrol/{numControl}', [UsuarioController::class, 'usuarioPorNumControl']);
    Route::get('/id/{id}', [UsuarioController::class, 'show']);
    Route::put('/id/{id}', [UsuarioController::class, 'update']);
    Route::post('/verificar', [UsuarioController::class, 'verificarRecuperacion']);
    Route::post('/actualizar-contrasena', [UsuarioController::class, 'actualizarContrasena']);
});

// 🚀 Ruta correcta para inventario (fuera del grupo usuario)
Route::post('/inventario', [InventarioController::class, 'store']);

//Ruta para Admin y Docente
Route::post('/admin-docente', [AdminDocenteController::class, 'store']);

// Nueva ruta para login de Admin y Docente
Route::post('/login-admin-docente', [AdminDocenteController::class, 'login']);