<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('numControl')->unique();
            $table->string('carrera');
            $table->string('celular');
            $table->string('password');
            $table->string('preguntaSeguridad');
            $table->string('respuestaSeguridad');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
