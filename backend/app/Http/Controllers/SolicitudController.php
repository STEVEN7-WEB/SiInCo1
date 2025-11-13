<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitud;

class SolicitudController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'marca' => 'required',
            'color' => 'required',
            'sistemaOperativo' => 'required',
            'titulo' => 'required|string',
            'descripcion' => 'required|string'
        ]);

        $solicitud = Solicitud::create($request->all());

        return response()->json([
            'message' => 'Solicitud registrada con éxito',
            'solicitud' => $solicitud
        ]);
    }
}
