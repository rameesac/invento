<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStockLedgersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_ledger', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('stock_movement_type_id');
            $table->foreign('stock_movement_type_id')->references('id')->on('stock_movement_type');
            $table->unsignedBigInteger('purchase_id')->nullable($value = true);;
            $table->foreign('purchase_id')->references('id')->on('purchase');
            $table->integer('previouse_quantity');
            $table->integer('latest_quantity');
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
        Schema::dropIfExists('stock_ledger');
    }
}
