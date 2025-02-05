<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cart extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = ['user_id', 'product_variation_id', 'quantity'];

    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function productVariation() {
        return $this->belongsTo(ProductVariation::class);
    }
}
