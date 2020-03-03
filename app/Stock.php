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
    
    /**
     * Get the product record associated with the stock.
     */
    public function stock()
    {
        return $this->hasOne(Product);
    }
}
