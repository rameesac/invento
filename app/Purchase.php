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
        
    /**
     * Get the supplier that owns the purchase.
     */
    public function supplier()
    {
        return $this->belongsTo(Supplier);
    }
}
