<?php

namespace App;

use App\Purchase;
use App\Product;
use Illuminate\Database\Eloquent\Model;

class PurchaseDetails extends Model
{
    protected $fillable = ['purchase_id', 'product_id', 'quantity', 'cost', 'discount', 'net_amount'];
    
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
