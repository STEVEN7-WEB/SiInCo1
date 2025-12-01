<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    use HasFactory;

    protected $table = 'solicitudes';

    protected $fillable = [
        'user_id',
        'marca',
        'color',
        'sistemaOperativo',
        'titulo',
        'descripcion',
        'mensajeError',
        'instalaRam',
        'instalaSsd',
        'mantenimiento',
        'instalaPrograma',
        'nombrePrograma',
        'aceptaConfirmacion',
        'estatus'
    ];

    // 🔥 ESTA ES LA RELACIÓN QUE FALTABA
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
