<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Supplier;

class Purchase extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'purchase';

    protected $fillable = ['dr_cr', 'purchase_date', 'supplier_id', 'tax_amount', 'total', 'discount', 'description'];

        
    /**
     * Get the supplier that owns the purchase.
     */
    public function supplier()
    {
        return $this->belongsTo(Supplier);
    }
}
