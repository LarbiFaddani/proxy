<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('campaign_businessActivities',function (Blueprint $table){
            $table->integer('businessActivity_id');
            $table->integer('campaign_id');
            $table->string('campaign_name');
            $table->string('activity_name');
            $table->primary(['businessActivity_id', 'campaign_id']);
            $table->foreign('businessActivity_id')->references('id')->on('business_activities');
            $table->foreign('campaign_id')->references('id')->on('campaigns');
            $table->timestamps();

    } );
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
