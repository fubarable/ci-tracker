<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ci_sessions', function (Blueprint $table) {
            $table->dateTime('paused_at')->nullable()->after('paused_duration_seconds');
        });
    }

    public function down(): void
    {
        Schema::table('ci_sessions', function (Blueprint $table) {
            $table->dropColumn('paused_at');
        });
    }
};
