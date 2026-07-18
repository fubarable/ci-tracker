<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['user_id', 'name', 'slug'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ciSessions()
    {
        return $this->belongsToMany(CiSession::class, 'session_tag');
    }
}
