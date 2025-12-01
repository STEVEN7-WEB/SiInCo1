<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\AdminDocente;
use App\Models\Inventario;
use App\Models\Solicitud;

class ReportesController extends Controller
{
    /**
     * Devuelve los datos del dashboard y movimientos.
     * Opcional: ?fecha=YYYY-MM-DD para filtrar movimientos por dia.
     */
    public function index(Request $request)
    {
        $fechaFiltro = $request->query('fecha'); // formato YYYY-MM-DD (opcional)

        // Traer inventario y calcular valor total (precio * cantidad)
        $inventarioQuery = Inventario::query();
        $inventario = $inventarioQuery->get();
        $valorInventario = (float) Inventario::sum(DB::raw('COALESCE(precio,0) * COALESCE(cantidad,0)'));

        // Traer solicitudes con usuario
        $solicitudes = Solicitud::with('user')->get();

        // Calcular conteos de estatus (normalizando a minúsculas)
        $counts = [
            'pendiente' => 0,
            'proceso' => 0,
            'finalizada' => 0
        ];

        foreach ($solicitudes as $s) {
            $estatus = strtolower(trim($s->estatus ?? 'pendiente'));
            if (isset($counts[$estatus])) $counts[$estatus]++;
        }

        // Movimientos combinados (inventario + solicitudes), aplicando filtro por fecha si lo hay
        $movimientos = [];

        foreach ($inventario as $item) {
            if ($fechaFiltro && $item->created_at->toDateString() !== $fechaFiltro) {
                continue;
            }

            $movimientos[] = [
                'tipo' => 'inventario',
                'nombre' => $item->nombre,
                'cantidad' => (int) $item->cantidad,
                'precio' => (float) $item->precio,
                'estado' => null,
                'fecha' => $item->created_at->format('Y-m-d H:i:s'),
                'usuario' => $item->user->nombre ?? 'Sistema',
            ];
        }

        foreach ($solicitudes as $s) {
            if ($fechaFiltro && $s->created_at->toDateString() !== $fechaFiltro) {
                continue;
            }

            $movimientos[] = [
                'tipo' => 'solicitud',
                'solicitud' => $s->titulo,
                'estado' => strtolower($s->estatus ?? 'pendiente'),
                'fecha' => $s->created_at->format('Y-m-d H:i:s'),
                'usuario' => $s->user->nombre ?? 'Desconocido',
            ];
        }

        // Ordenar movimientos por fecha descendente
        usort($movimientos, function ($a, $b) {
            return strtotime($b['fecha']) <=> strtotime($a['fecha']);
        });

        return response()->json([
            // Totales generales
            'total_usuarios'            => User::count(),
            'total_admins'             => AdminDocente::where('rol', 'admin')->count(),
            'total_docentes'           => AdminDocente::where('rol', 'docente')->count(),

            // Inventario: items y valor total
            'total_inventario_items'   => Inventario::count(),
            'total_inventario_valor'   => $valorInventario,

            // Solicitudes y estatus
            'total_solicitudes'        => Solicitud::count(),
            'solicitudes_pendientes'   => $counts['pendiente'],
            'solicitudes_proceso'      => $counts['proceso'],
            'solicitudes_finalizadas'  => $counts['finalizada'],

            // Movimientos listos
            'movimientos'              => $movimientos,
        ]);
    }
}
