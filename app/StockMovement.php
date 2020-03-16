<?php

namespace App;

use App\Product;
use App\StockMovementType;
use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    /**
     * Get the stock_movement_type that owns the stock_movement.
     */
    public function stock_movement_type()
    {
        return $this->belongsTo('App\StockMovementType');
    }
    
    /**
     * Get the product that owns the stock_movement.
     */
    public function product()
    {
        return $this->belongsTo('App\Product');
    }
}
