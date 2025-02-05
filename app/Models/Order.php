<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = ['user_id', 'status'];

    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function items() {
        return $this->hasMany(OrderItem::class);
    }
}
