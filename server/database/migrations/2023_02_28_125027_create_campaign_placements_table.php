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
        Schema::create('campaign_placements', function (Blueprint $table) {
            $table->integer('campaign_id');
            $table->integer('placement_id');
            $table->integer('tracking_id');
            $table->primary(['campaign_id', 'placement_id']);
            $table->foreign('campaign_id')->references('id')->on('campaigns')->onDelete('cascade');
            $table->foreign('placement_id')->references('id')->on('placements')->onDelete('cascade');
            $table->foreign('tracking_id')->references('id')->on('trackings')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaign_placements');
    }
};
