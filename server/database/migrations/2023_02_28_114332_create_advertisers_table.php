<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('advertisers', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->integer('user_id');
            $table->integer('act_id');
            //$table->integer('type_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('act_id')->references('id')->on('business_activities');
            //$table->foreign('type_id')->references('id')->on('business_types');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('advertisers');
    }
};
?>
