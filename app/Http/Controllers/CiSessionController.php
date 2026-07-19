<?php

namespace App\Http\Controllers;

use App\Models\InputSource;
use App\Models\Language;
use App\Models\Modality;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CiSessionController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Tracker/Index', [
            'languages' => Language::where('is_active', true)
                ->orderBy('sort_order')->get(),
            'modalities' => Modality::orderBy('id')->get(),
            'inputSources' => InputSource::where('is_active', true)
                ->where(function ($q) use ($request) {
                    $q->whereNull('user_id')->orWhere('user_id', $request->user()->id);
                })
                ->orderBy('name')->get(),
            'sessions' => $request->user()->ciSessions()
                ->with(['modality', 'inputSource', 'language'])
                ->orderByDesc('started_at')
                ->limit(20)
                ->get(),
        ]);
    }
}
