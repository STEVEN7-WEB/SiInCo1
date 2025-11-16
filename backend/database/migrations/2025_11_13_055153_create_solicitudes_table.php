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
    Schema::create('solicitudes', function (Blueprint $table) {
        $table->id();
        $table->string('marca');
        $table->string('color');
        $table->string('sistemaOperativo');
        $table->string('titulo');
        $table->text('descripcion');
        $table->string('mensajeError')->nullable();
        $table->boolean('instalaRam')->default(false);
        $table->boolean('instalaSsd')->default(false);
        $table->boolean('mantenimiento')->default(false);
        $table->boolean('instalaPrograma')->default(false);
        $table->string('nombrePrograma')->nullable();
        $table->boolean('aceptaConfirmacion')->default(false);
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
        Schema::dropIfExists('solicitudes');
    }
};
