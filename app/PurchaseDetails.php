<?php

namespace App;

use App\Purchase;
use App\Product;
use Illuminate\Database\Eloquent\Model;

class PurchaseDetails extends Model
{
    /**
     * Get the purchase that owns the PurchaseDetails.
     */
    public function purchase()
    {
        return $this->belongsTo(Purchase);
    }
    
     /**
     * Get the product that owns the PurchaseDetails.
     */
    public function product()
    {
        return $this->belongsTo(Product);
    }
}
