<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventario;

class InventarioController extends Controller
{
    public function store(Request $request)
    {
        $inventario = Inventario::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'cantidad' => $request->cantidad,
            'precio' => $request->precio
        ]);

        return response()->json([
            'mensaje' => 'Inventario guardado correctamente',
            'data' => $inventario
        ]);
    }
}
