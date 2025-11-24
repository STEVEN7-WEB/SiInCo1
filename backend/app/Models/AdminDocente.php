<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminDocente extends Model
{
    use HasFactory;

    protected $table = 'admin_docentes';

    protected $fillable = [
        'rol',
        'nombre',
        'fecha_nacimiento',
        'telefono',
        'sexo',
        'usuario',
        'password',
        'correo',
        'carrera'
    ];

    protected $hidden = ['password'];
}
