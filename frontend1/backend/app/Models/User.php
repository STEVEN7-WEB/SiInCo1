<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // <- IMPORTAR ESTO
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // si usas API tokens
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nombre',
        'numControl',
        'carrera',
        'celular',
        'password',
        'preguntaSeguridad',
        'respuestaSeguridad',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
