<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\InventarioController;
use App\Http\Controllers\AdminDocenteController;
use App\Http\Controllers\ReportesController;

// ---------- LOGIN Y REGISTROS ----------
Route::post('/registrar', [UsuarioController::class, 'registrar']);
Route::post('/login', [UsuarioController::class, 'login']);
Route::post('/login-docente', [AuthController::class, 'loginDocente']);

// ---------- USUARIOS ----------
Route::prefix('usuario')->group(function () {
Route::get('/usuario', [UsuarioController::class, 'index']);
Route::delete('/usuario/id/{id}', [UsuarioController::class, 'destroy']);


    Route::get('/usuario', [UsuarioController::class, 'index']);
    Route::get('/', [UsuarioController::class, 'index']);              // listar todos
    Route::get('/id/{id}', [UsuarioController::class, 'show']);        // ver uno
    Route::put('/id/{id}', [UsuarioController::class, 'update']);      // actualizar
    Route::delete('/id/{id}', [UsuarioController::class, 'destroy']);  // eliminar

    Route::get('/numcontrol/{numControl}', [UsuarioController::class, 'usuarioPorNumControl']);
    Route::post('/verificar', [UsuarioController::class, 'verificarRecuperacion']);
    Route::post('/actualizar-contrasena', [UsuarioController::class, 'actualizarContrasena']);
});

// ---------- SOLICITUDES ----------
Route::post('/solicitud', [SolicitudController::class, 'store']);
Route::get('/solicitudes-usuario/{numControl}', [SolicitudController::class, 'solicitudesUsuario']);
Route::get('/solicitudes-docente/{id}', [SolicitudController::class, 'solicitudesDocente']);
Route::get('/solicitudes', [SolicitudController::class, 'obtenerSolicitudes']);
Route::patch('/solicitudes/{id}/estatus', [SolicitudController::class, 'actualizarEstatus']);

// ---------- INVENTARIO ----------
Route::post('/inventario', [InventarioController::class, 'store']);
Route::get('/inventario', [InventarioController::class, 'index']);

// ---------- ADMIN / DOCENTE ----------
Route::post('/admin-docente', [AdminDocenteController::class, 'store']);
Route::post('/login-admin-docente', [AdminDocenteController::class, 'login']);

Route::prefix('admin-docente')->group(function () {
    Route::get('/', [AdminDocenteController::class, 'index']);
    Route::get('/{id}', [AdminDocenteController::class, 'show']);
    Route::put('/{id}', [AdminDocenteController::class, 'update']);
    Route::delete('/{id}', [AdminDocenteController::class, 'destroy']);
});

// ---------- REPORTES ----------
Route::get('/reportes', [ReportesController::class, 'index']);
