<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class CiSession extends Model
{
    protected $fillable = ['user_id', 'language_id', 'modality_id', 'input_source_id', 'started_at', 'ended_at', 'paused_duration_seconds', 'title', 'notes', 'paused_at'];

    protected $table = 'ci_sessions';

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'paused_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function modality()
    {
        return $this->belongsTo(Modality::class);
    }

    public function inputSource()
    {
        return $this->belongsTo(InputSource::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'session_tag');
    }
}
