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
        Schema::create('input_sources', function (Blueprint $table) {
            $table->id();
            $table->string('name');                              // "Dreaming Spanish"
            $table->string('slug')->unique();                    // "dreaming-spanish"
            $table->boolean('is_system')->default(false);        // seeded vs user-added
            $table->boolean('is_active')->default(true);
            $table->boolean('exclude_from_ds_hours')->default(false);
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('input_sources');
    }
};
