<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdminDocente;
use Illuminate\Support\Facades\Hash;

class AdminDocenteController extends Controller
{
    // =====================================================
    //  REGISTRO (ya lo tenías)
    // =====================================================
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


    // =====================================================
    //  LOGIN (ESTE ES EL QUE TE FALTABA)
    // =====================================================
    public function login(Request $request)
    {
        $request->validate([
            'usuario' => 'required|string',
            'password' => 'required|string'
        ]);

        // Buscar admin/docente
        $usuario = AdminDocente::where('usuario', $request->usuario)->first();

        if (!$usuario) {
            return response()->json([
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        // Verificar contraseña hasheada
        if (!Hash::check($request->password, $usuario->password)) {
            return response()->json([
                'message' => 'Contraseña incorrecta'
            ], 401);
        }

        return response()->json([
            'message' => 'Login exitoso',
            'usuario' => $usuario
        ], 200);
    }
    public function index()
{
    return response()->json(AdminDocente::all());
}

public function show($id)
{
    $doc = AdminDocente::find($id);
    if (!$doc) {
        return response()->json(['error' => 'No encontrado'], 404);
    }
    return response()->json($doc);
}

public function update(Request $request, $id)
{
    $doc = AdminDocente::find($id);
    if (!$doc) return response()->json(['error' => 'No encontrado'], 404);

    $data = $request->all();

    // Si viene contraseña desde Angular (como "contrasena")
    if (isset($data['contrasena']) && !empty($data['contrasena'])) {
        $data['password'] = Hash::make($data['contrasena']);
    }

    // Evitar guardar el campo temporal "contrasena"
    unset($data['contrasena']);

    $doc->update($data);

    return response()->json(['message' => 'Actualizado correctamente']);
}


public function destroy($id)
{
    $doc = AdminDocente::find($id);
    if (!$doc) return response()->json(['error' => 'No encontrado'], 404);

    $doc->delete();
    return response()->json(['message' => 'Eliminado']);
}

}
