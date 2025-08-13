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
        // Create countries table
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code', 2);
            $table->timestamps();
        });

        // Create representatives table
        Schema::create('representatives', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image');
            $table->timestamps();
        });

        // Create customers table (main table)
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('country_id')->constrained();
            $table->string('company');
            $table->date('date')->nullable();
            $table->enum('status', ['qualified', 'unqualified', 'new', 'negotiation', 'renewal', 'proposal']);
            $table->boolean('verified')->default(false);
            $table->integer('activity');
            $table->foreignId('representative_id')->constrained();
            $table->decimal('balance', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
        Schema::dropIfExists('representatives');
        Schema::dropIfExists('countries');
    }
};
