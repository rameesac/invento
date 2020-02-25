<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchaseDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchase_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('purchase_id');
            $table->foreign('purchase_id')->references('id')->on('purchase');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')->on('product');
            $table->integer('quantity');
            $table->double('cost', 8, 2);
            $table->double('discount', 8, 2);
            $table->double('net_amount', 8, 2);
            $table->longText('description')->nullable($value = true);
            $table->tinyInteger('status')->default(1);
            $table->mediumInteger('created_by')->nullable($value = true);
            $table->mediumInteger('updated_by')->nullable($value = true);
            $table->softDeletes();
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
        Schema::dropIfExists('purchase_details');
    }
}
