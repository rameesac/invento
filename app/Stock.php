<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Product;

class Stock extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'stock';

    protected $fillable = ['product_id', 'quantity', 'rate', 'cost'];
    
    /**
     * Get the product record associated with the stock.
     */
    public function stock()
    {
        return $this->hasOne('App\Product');
    }
}
