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
        Schema::create('product_highlights', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->foreignUuid('product_id')->constrained('products')->onDelete('cascade');
            $table->boolean('is_active')->default(false);
            $table->enum('status', ['recommended', 'hero_section']);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_highlights');
    }
};
