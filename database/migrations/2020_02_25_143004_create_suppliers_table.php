<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuppliersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('supplier', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 250);
            $table->char('code', 100);
            $table->string('contact_person', 250)->nullable($value = true);
            $table->string('mobile', 20)->nullable($value = true);
            $table->string('email', 50)->nullable($value = true);
            $table->string('address_one', 250)->nullable($value = true);
            $table->string('address_two', 250)->nullable($value = true);
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
        Schema::dropIfExists('supplier');
    }
}
