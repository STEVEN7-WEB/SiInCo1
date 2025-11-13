<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitud;

class SolicitudController extends Controller
{
    public function index()
    {
        $solicitudes = Solicitud::all(); // Trae todas las solicitudes
        return response()->json($solicitudes);
    }

    public function store(Request $request)
    {
        $request->validate([
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

        $solicitud = Solicitud::create($request->all());

        return response()->json([
            'message' => 'Solicitud registrada correctamente ✅',
            'solicitud' => $solicitud
        ], 201);
    }
}
