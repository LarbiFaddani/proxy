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
        Schema::create('trackings', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->string('type', 45);
            $table->datetime('date');
            $table->time('display_time');
            $table->timestamps();
            $table->integer('campaign_id');
            $table->foreign('campaign_id')->references('id')->on('campaigns');
        });
    }

};
