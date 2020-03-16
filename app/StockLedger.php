<?php

namespace App;
use App\Product;

use Illuminate\Database\Eloquent\Model;

class StockLedger extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'stock_ledger';

    protected $fillable = ['stock_movement_type_id', 'purchase_id', 'movement_id', 'product_id', 'previouse_quantity', 'latest_quantity', 'description'];

    /**
     * Get the product that owns the PurchaseDetails.
     */
    public function product()
    {
        return $this->belongsTo('App\Product');
    }

    /**
     * Get the product that owns the PurchaseDetails.
     */
    public function stock_movement_type()
    {
        return $this->belongsTo('App\StockMovementType');
    }
}
