<?php

namespace App;

use App\Purchase;
use App\Product;
use Illuminate\Database\Eloquent\Model;

class PurchaseDetails extends Model
{
    protected $fillable = ['purchase_id', 'product_id', 'quantity', 'cost', 'rate', 'discount', 'net_amount'];
    
     /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['deleted'];
    
     /**
     * Get the deleted flag for the purchase details.
     *
     * @return bool
     */
    public function getDeletedAttribute()
    {
        return false;
    }
    
    /**
     * Get the purchase that owns the PurchaseDetails.
     */
    public function purchase()
    {
        return $this->belongsTo('App\Purchase');
    }
    
     /**
     * Get the product that owns the PurchaseDetails.
     */
    public function product()
    {
        return $this->belongsTo('App\Product');
    }
}
