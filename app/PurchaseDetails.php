<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PurchaseDetails extends Model
{
    protected $fillable = ['purchase_id', 'product_id', 'quantity', 'cost', 'discount', 'net_amount'];
}
