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
        Schema::create('parameters', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->float('ad_price_advertiser');
            $table->float('ad_price_business');
            $table->float('com_display_time')->default(0);
            $table->timestamps();
           // $table->checkConstraint('com_display_time' >= 0);
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('parameters');
    }
};
?>
