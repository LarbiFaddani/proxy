<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->integer('user_id');
            $table->integer('location_id');
            $table->integer('longitude');
            $table->integer('altitude');
            $table->integer('business_type_id');
            $table->integer('business_activity_id');
            // $table->enum('role', ['business'])->default('business');
            $table->foreign('business_activity_id')->references('id')->on('business_activities');
            $table->foreign('business_type_id')->references('id')->on('business_types');
            $table->foreign('location_id')->references('id')->on('locations');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};
