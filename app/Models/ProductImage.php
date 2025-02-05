<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductImage extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = ['product_id', 'url'];

    public function product() {
        return $this->belongsTo(Product::class);
    }
}
