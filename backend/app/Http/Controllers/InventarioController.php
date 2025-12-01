<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventario;

class InventarioController extends Controller
{
    // Obtener inventario priorizando lo que hace falta
    public function index()
    {
        // Ordenar por cantidad de menor a mayor
        $inventario = Inventario::orderBy('cantidad', 'asc')->get();

        // Agregar campo "alerta"
        $inventario->transform(function ($item) {
            $item->alerta = $item->cantidad <= 5; // Cambia el número si quieres
            return $item;
        });

        return response()->json($inventario);
    }

    // Registrar pieza del inventario
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'cantidad' => 'required|integer|min:0',
            'precio' => 'required|numeric|min:0'
        ]);

        $item = Inventario::create($request->all());

        return response()->json([
            'message' => 'Inventario registrado',
            'data' => $item
        ]);
    }
}
