<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Modality extends Model
{
    protected $fillable = ['name', 'slug'];

    public function ciSessions()
    {
        return $this->hasMany(CiSession::class);
    }
}
