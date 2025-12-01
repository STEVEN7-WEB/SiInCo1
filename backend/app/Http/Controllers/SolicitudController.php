<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitud;
use App\Models\User;

class SolicitudController extends Controller
{
    // Registrar solicitud
public function store(Request $request)
{
    // Validación flexible (usuario o docente)
    $request->validate([
        'user_id' => 'nullable|integer',        // docente
        'numControl' => 'nullable|string',     // usuario normal
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

    // ------------------------
    // 1️⃣ SI ES USUARIO NORMAL
    // ------------------------
    if ($request->numControl) {
        $user = User::where('numControl', $request->numControl)->first();

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $user_id = $user->id;
    }

    // ------------------------
    // 2️⃣ SI ES DOCENTE
    // ------------------------
    elseif ($request->user_id) {
        $user_id = $request->user_id; // ← ESTE ES EL DATO QUE MANDA ANGULAR
    }

    else {
        return response()->json([
            'message' => 'Debe enviar numControl o user_id'
        ], 422);
    }

    // Crear solicitud
    $solicitud = Solicitud::create([
        'user_id' => $user_id,
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
        'aceptaConfirmacion' => $request->aceptaConfirmacion,
    ]);

    return response()->json([
        'message' => 'Solicitud registrada correctamente',
        'solicitud' => $solicitud
    ], 201);
}


    public function solicitudesUsuario($numControl)
    {
        $user = User::where('numControl', $numControl)->first();
        if (!$user) return response()->json(['message' => 'Usuario no encontrado'], 404);

        return Solicitud::where('user_id', $user->id)
                        ->orderBy('created_at', 'desc')
                        ->get();
    }
    public function solicitudesDocente($id)
{
    return Solicitud::where('user_id', $id)->get();
}


    // pal mero admin
    public function obtenerSolicitudes()
    {
        return Solicitud::orderBy('created_at', 'desc')->get();
    }
    public function actualizarEstatus($id, Request $request) {
    $solicitud = Solicitud::findOrFail($id);
    $solicitud->estatus = $request->estatus;
    $solicitud->save();

    return response()->json($solicitud);
}
}
