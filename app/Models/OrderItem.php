<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = ['order_id', 'product_variation_id', 'quantity'];

    public function order() {
        return $this->belongsTo(Order::class);
    }
    
    public function productVariation() {
        return $this->belongsTo(ProductVariation::class);
    }
}
