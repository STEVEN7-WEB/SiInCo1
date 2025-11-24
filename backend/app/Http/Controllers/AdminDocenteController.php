<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdminDocente;
use Illuminate\Support\Facades\Hash;

class AdminDocenteController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'rol' => 'required|in:admin,docente',
            'nombre' => 'required|string|max:255',
            'fechaNacimiento' => 'required|date',
            'telefono' => 'nullable|string|max:20',
            'sexo' => 'nullable|string|max:10',
            'usuario' => 'nullable|string|unique:admin_docentes,usuario',
            'contrasena' => 'nullable|string|min:4',
            'correo' => 'nullable|email',
            'carrera' => 'nullable|string|max:255',
        ]);

        // Generar usuario si no viene
        $usuario = $validated['usuario'] ?? strtolower(str_replace(' ', '', $validated['nombre'])) . date('dm', strtotime($validated['fechaNacimiento']));

        $adminDocente = AdminDocente::create([
            'rol' => $validated['rol'],
            'nombre' => $validated['nombre'],
            'fecha_nacimiento' => $validated['fechaNacimiento'],
            'telefono' => $validated['telefono'] ?? null,
            'sexo' => $validated['sexo'] ?? null,
            'usuario' => $usuario,
            'password' => Hash::make($validated['contrasena'] ?? '1234'),
            'correo' => $validated['correo'] ?? null,
            'carrera' => $validated['carrera'] ?? null,
        ]);

        return response()->json([
            'message' => 'Usuario guardado correctamente',
            'user' => $adminDocente
        ]);
    }
}
