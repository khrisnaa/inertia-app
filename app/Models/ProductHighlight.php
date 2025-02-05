<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductHighlight extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = ['product_id', 'is_active', 'status'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
