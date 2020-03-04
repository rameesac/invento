<?php

namespace App;

user App\Category;
user App\Stock;
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
        return $this->belongsTo(Category);
    }
    
     /**
     * Get the stock record associated with the product.
     */
    public function stock()
    {
        return $this->hasOne(Stock);
    }
}
