<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Supplier;
use App\PurchaseDetails;

class Purchase extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'purchase';

    protected $fillable = ['dr_cr', 'purchase_date', 'supplier_id', 'net_amount', 'tax_amount', 'total', 'discount', 'description'];

        
    /**
     * Get the supplier that owns the purchase.
     */
    public function supplier()
    {
        return $this->belongsTo('App\Supplier');
    }
    
    /**
     * Get all of the purchase details for the purchase.
     */
    public function purchase_details()
    {
        return $this->hasMany('App\PurchaseDetails');
    }
}
