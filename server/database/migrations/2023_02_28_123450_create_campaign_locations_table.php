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
        Schema::create('campaign_locations', function (Blueprint $table) {
            $table->integer('campaign_id');
            $table->integer('location_id');
            $table->integer('radius');
            $table->primary(['campaign_id', 'location_id']);
            $table->foreign('campaign_id')->references('id')->on('campaigns');
            $table->foreign('location_id')->references('id')->on('locations');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaign_locations');
    }
};
