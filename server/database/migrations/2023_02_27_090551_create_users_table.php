<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->string('email', 65)->unique();
            $table->string('password', 255);
            $table->string('name', 45);
            $table->string('phone', 45);
            $table->string('address', 255);
            $table->enum('status', [0, 1])->default(1);
            $table->enum('role', ['advertiser','business','admin']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
