<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
public function up(): void
{
    Schema::create('admin_docentes', function (Blueprint $table) {
        $table->id();
        $table->string('rol'); // admin o docente
        $table->string('nombre');
        $table->date('fecha_nacimiento');
        $table->string('telefono')->nullable();
        $table->string('sexo')->nullable();
        $table->string('usuario')->unique();
        $table->string('password');
        $table->string('correo')->nullable();
        $table->string('carrera')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admin_docentes');
    }
};
