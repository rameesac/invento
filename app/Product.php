<?php

namespace App;

use App\Category;
use App\Stock;
use App\Unit;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'product';
    
    /**
     * Get the category that owns the product.
     */
    public function category()
    {
        return $this->belongsTo('App\Category');
    }
    
     /**
     * Get the stock record associated with the product.
     */
    public function stock()
    {
        return $this->hasOne('App\Stock');
    }

    /**
     * Get the unit that owns the product.
     */
     public function unit()
     {
         return $this->belongsTo('App\Unit');
     }
     
}
