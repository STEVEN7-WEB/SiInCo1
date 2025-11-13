<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UsuarioController extends Controller
{
    public function registrar(Request $request)
{
    $request->validate([
        'nombre' => 'required|string|max:255',
        'numControl' => 'required|string|max:20|unique:users',
        'carrera' => 'required|string|max:255',
        'celular' => 'required|string|max:15',
        'password' => 'required|string|min:6',
        'preguntaSeguridad' => 'required|string|max:255',
        'respuestaSeguridad' => 'required|string|max:255',
    ]);

    // ✅ Guardar los datos manualmente
    $user = new User();
    $user->nombre = $request->nombre;
    $user->numControl = $request->numControl;
    $user->carrera = $request->carrera;
    $user->celular = $request->celular;
    $user->password = bcrypt($request->password);
    $user->preguntaSeguridad = $request->preguntaSeguridad;
    $user->respuestaSeguridad = $request->respuestaSeguridad;
    $user->save();

    return response()->json([
        'message' => 'Usuario registrado correctamente ✅',
        'usuario' => $user
    ], 201);
}
public function login(Request $request)
{
    $request->validate([
        'usuario' => 'required|string',
        'password' => 'required|string',
    ]);

    // Buscar por numControl
    $user = User::where('numControl', $request->usuario)->first();

    if (!$user || !password_verify($request->password, $user->password)) {
        return response()->json([
            'message' => 'Credenciales incorrectas ❌'
        ], 401);
    }

    return response()->json([
        'message' => 'Inicio de sesión exitoso ✅',
        'usuario' => $user
    ], 200);
}
}
