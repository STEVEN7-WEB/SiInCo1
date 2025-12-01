<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\InventarioController;
use App\Http\Controllers\AdminDocenteController;
use App\Http\Controllers\ReportesController;


Route::post('/registrar', [UsuarioController::class, 'registrar']);
Route::post('/login', [UsuarioController::class, 'login']);
Route::post('/login-docente', [AuthController::class, 'loginDocente']);

Route::post('/solicitud', [SolicitudController::class, 'store']); 
Route::get('/solicitudes-usuario/{numControl}', [SolicitudController::class, 'solicitudesUsuario']); 
Route::get('/solicitudes-docente/{id}', [SolicitudController::class, 'solicitudesDocente']);
Route::get('/solicitudes', [SolicitudController::class, 'obtenerSolicitudes']);
Route::patch('/solicitudes/{id}/estatus', [SolicitudController::class, 'actualizarEstatus']);

Route::prefix('usuario')->group(function () {
    Route::get('/numcontrol/{numControl}', [UsuarioController::class, 'usuarioPorNumControl']);
    Route::get('/id/{id}', [UsuarioController::class, 'show']);
    Route::put('/id/{id}', [UsuarioController::class, 'update']);
    Route::post('/verificar', [UsuarioController::class, 'verificarRecuperacion']);
    Route::post('/actualizar-contrasena', [UsuarioController::class, 'actualizarContrasena']);
});

// 🚀 Inventario
Route::post('/inventario', [InventarioController::class, 'store']);
Route::get('/inventario', [InventarioController::class, 'index']); // ← tabla con prioridad

// Admin y Docente
Route::post('/admin-docente', [AdminDocenteController::class, 'store']);
Route::post('/login-admin-docente', [AdminDocenteController::class, 'login']);

Route::get('/reportes', [ReportesController::class, 'index']);