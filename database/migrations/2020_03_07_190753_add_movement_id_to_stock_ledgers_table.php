<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMovementIdToStockLedgersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stock_ledger', function (Blueprint $table) {
            $table->unsignedBigInteger('movement_id')->nullable()->after('purchase_id');
            $table->dropForeign('stock_ledger_purchase_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('stock_ledger', function (Blueprint $table) {
            $table->dropColumn(['movement_id']);
        });
    }
}
