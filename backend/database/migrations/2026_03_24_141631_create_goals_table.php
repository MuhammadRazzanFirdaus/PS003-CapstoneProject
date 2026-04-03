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
        Schema::create('goals', function (Blueprint $table) {
            
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('image')->nullable();
            $table->string('name');
            $table->string('category');
            $table->decimal('target_amount', 15, 2);
            $table->decimal('saving_amount', 15, 2)->nullable();
            $table->enum('saving_period', ['daily', 'weekly', 'monthly'])->nullable();
            $table->decimal('initial_amount', 15, 2)->default(0);
            $table->date('target_date');
            $table->decimal('daily_target', 15, 2)->nullable();
            $table->enum('status', ['in_progress', 'completed', 'not_achieved'])->default('in_progress');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goals');
    }
};