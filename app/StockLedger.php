<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockLedger extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'stock_ledger';

    protected $fillable = ['stock_movement_type_id', 'purchase_id', 'previouse_quantity', 'latest_quantity', 'description'];
}
