<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('placements', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->string('name',45);
            $table->integer('business_id');
            //$table->integer('tracking_id');
            $table->foreign('business_id')->references('id')->on('businesses');
            //$table->foreign('tracking_id')->references('id')->on('trackings');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('placements');
    }
};
