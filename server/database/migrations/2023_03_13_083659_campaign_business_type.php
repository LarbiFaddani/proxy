<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
      Schema::create('campaign_businessType',function (Blueprint $table){
        $table->integer('businesstype_id');
        $table->integer('campaign_id');
        $table->string('campaign_name');
        $table->string('type_name');
        $table->primary(['businesstype_id', 'campaign_id']);
        $table->foreign('businesstype_id')->references('id')->on('business_types');
        $table->foreign('campaign_id')->references('id')->on('campaigns');
        $table->timestamps();
      });
    }

    public function down(): void
    {
        Schema::dropIfExists('com_businessType');
    }
};
