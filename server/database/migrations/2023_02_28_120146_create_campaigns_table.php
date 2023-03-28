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
        Schema::create('campaigns', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->string('name', 45);
            $table->float('budget_max', 8, 2)->default(0.00);
            $table->date('begin_date');
            $table->date('end_date');
            $table->string('file');
            $table->time('display_hours');
            $table->enum('status', ['actif','pending','inactif','finished'])->default('pending');
            $table->string('url');
            $table->integer('advertiser_id');
            $table->foreign('advertiser_id')->references('id')->on('advertisers')->onDelete('cascade');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
