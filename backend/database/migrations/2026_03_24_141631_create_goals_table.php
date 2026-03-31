<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
        {
        Schema::create('goals', function (Blueprint $table) {
        $table->id() ;
        $table->foreignId('user_id')->constrained()->cascadeOnDelete() ;
        $table->string('name') ;
        $table->string('image')->nullable() ;
        $table->string('category') ;
        $table->decimal('target_amount', 15, 2) ;
        $table->decimal('initial_amount', 15, 2)->default(0) ;
        $table->decimal('daily_target', 15, 2) ;
        $table->date('target_date') ;
        $table->string('status')->default('active') ;
        $table->timestamps() ;
        }) ;
        }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goals');
    }
};
