<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStockMovementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('stock_movement_type_id');
            $table->foreign('stock_movement_type_id')->references('id')->on('stock_movement_type');
            $table->unsignedBigInteger('product_id')->nullable($value = true);;
            $table->foreign('product_id')->references('id')->on('product');
            $table->integer('quantity');
            $table->longText('narration')->nullable($value = true);
            $table->longText('description')->nullable($value = true);
            $table->mediumInteger('created_by')->nullable($value = true);
            $table->mediumInteger('updated_by')->nullable($value = true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stock_movements');
    }
}
