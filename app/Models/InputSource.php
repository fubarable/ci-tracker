<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InputSource extends Model
{
    protected $fillable = ['name', 'slug', 'is_system', 'is_active', 'exclude_from_ds_hours', 'user_id'];

    public function ciSessions()
    {
        return $this->hasMany(CiSession::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
