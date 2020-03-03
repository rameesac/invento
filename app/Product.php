<?php

namespace App;

user App\Category;
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
}
