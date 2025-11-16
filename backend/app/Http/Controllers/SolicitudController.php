<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitud;
use App\Models\User;

class SolicitudController extends Controller
{
    // Registrar una nueva solicitud
    public function store(Request $request)
    {
        $request->validate([
            'numControl' => 'required|string',
            'marca' => 'required|string',
            'color' => 'required|string',
            'sistemaOperativo' => 'required|string',
            'titulo' => 'required|string',
            'descripcion' => 'required|string',
            'mensajeError' => 'nullable|string',
            'instalaRam' => 'boolean',
            'instalaSsd' => 'boolean',
            'mantenimiento' => 'boolean',
            'instalaPrograma' => 'boolean',
            'nombrePrograma' => 'nullable|string',
            'aceptaConfirmacion' => 'required|boolean',
        ]);

        $user = User::where('numControl', $request->numControl)->first();
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $solicitud = Solicitud::create([
            'user_id' => $user->id,
            'marca' => $request->marca,
            'color' => $request->color,
            'sistemaOperativo' => $request->sistemaOperativo,
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'mensajeError' => $request->mensajeError,
            'instalaRam' => $request->instalaRam,
            'instalaSsd' => $request->instalaSsd,
            'mantenimiento' => $request->mantenimiento,
            'instalaPrograma' => $request->instalaPrograma,
            'nombrePrograma' => $request->nombrePrograma,
            'aceptaConfirmacion' => $request->aceptaConfirmacion
        ]);

        return response()->json([
            'message' => 'Solicitud registrada correctamente',
            'solicitud' => $solicitud
        ], 201);
    }

    // Obtener solicitudes de un usuario específico por numControl
    public function solicitudesUsuario($numControl)
    {
        $user = User::where('numControl', $numControl)->first();
        if (!$user) return response()->json(['message' => 'Usuario no encontrado'], 404);

        return Solicitud::where('user_id', $user->id)
                        ->orderBy('created_at', 'desc')
                        ->get();
    }

    // Obtener todas las solicitudes (admin)
    public function obtenerSolicitudes()
    {
        return Solicitud::orderBy('created_at', 'desc')->get();
    }
}
