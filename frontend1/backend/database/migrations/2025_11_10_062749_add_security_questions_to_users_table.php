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
// ... en el nuevo archivo de migración ...
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        // AÑADE ESTAS DOS LÍNEAS:
        $table->string('preguntaSeguridad')->nullable();
        $table->string('respuestaSeguridad')->nullable();
    });
}
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
