<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CiSession extends Model
{
    protected $fillable = ['user_id', 'language_id', 'modality_id', 'input_source_id', 'started_at', 'ended_at', 'paused_duration_seconds', 'title', 'notes'];
}
