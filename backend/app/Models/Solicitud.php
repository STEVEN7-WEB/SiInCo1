<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    use HasFactory;

    protected $fillable = [
        'marca',
        'color',
        'sistemaOperativo',
        'titulo',
        'descripcion',
        'mensajeError',
        'instalaRam',
        'instalaSsd',
        'mantenimiento',
        'nombrePrograma'
    ];
}
