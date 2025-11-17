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
            'numControl' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('numControl', $request->numControl)->first();

        if (!$user || !password_verify($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciales incorrectas ❌'], 401);
        }

        return response()->json(['usuario' => $user], 200);
    }

    public function show($id)
    {
        $usuario = User::find($id);
        if (!$usuario) return response()->json(['message' => 'Usuario no encontrado'], 404);
        return response()->json($usuario);
    }

    public function verificarRecuperacion(Request $request)
    {
        $user = User::where('numControl', $request->numControl)
                    ->where('celular', $request->celular)
                    ->where('respuestaSeguridad', $request->respuestaSeguridad)
                    ->first();
        if (!$user) return response()->json(['success' => false, 'message' => 'Datos no coinciden ❌'], 404);
        return response()->json(['success' => true, 'message' => 'Usuario verificado ✅', 'user_id' => $user->id], 200);
    }

    public function actualizarContrasena(Request $request)
    {
        $user = User::find($request->user_id);
        if (!$user) return response()->json(['success' => false, 'message' => 'Usuario no encontrado ❌'], 404);
        $user->password = bcrypt($request->password);
        $user->save();
        return response()->json(['success' => true, 'message' => 'Contraseña actualizada ✅']);
    }

    public function usuarioPorNumControl($numControl)
    {
        $user = User::where('numControl', $numControl)->first();
        if (!$user) return response()->json(['message' => 'Usuario no encontrado'], 404);
        return response()->json($user);
    }
    
}
