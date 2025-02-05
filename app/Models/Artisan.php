<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Artisan extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = ['user_id', 'bio', 'location', 'phone', 'instagram_url', 'facebook_url', 'twitter_url', 'pinterest_url'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
