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
            'liveSession' => $request->user()->ciSessions()
                ->whereNull('ended_at')
                ->with(['modality', 'inputSource'])
                ->first(),
        ]);
    }

    public function start(Request $request)
    {
        $validated = $request->validate([
            'language_id' => 'required|exists:languages,id',
            'modality_id' => 'required|exists:modalities,id',
            'input_source_id' => 'required|exists:input_sources,id',
            'title' => 'nullable|string|max:255',
        ]);

        // Guard: one live session at a time
        if ($request->user()->ciSessions()->whereNull('ended_at')->exists()) {
            return back()->withErrors(['session' => 'A session is already in progress.']);
        }

        $request->user()->ciSessions()->create([
            ...$validated,
            'started_at' => now(),
        ]);

        return back();
    }

    public function pause(Request $request)
    {
        $session = $this->liveSession($request);
        if ($session && is_null($session->paused_at)) {
            $session->update(['paused_at' => now()]);
        }
        return back();
    }

    public function resume(Request $request)
    {
        $session = $this->liveSession($request);
        if ($session && $session->paused_at) {
            $session->update([
                'paused_duration_seconds' => $session->paused_duration_seconds
                    + (int) $session->paused_at->diffInSeconds(now()),
                'paused_at' => null,
            ]);
        }
        return back();
    }

    public function stop(Request $request)
    {
        $session = $this->liveSession($request);
        if ($session) {
            $pausedExtra = $session->paused_at
                ? (int) $session->paused_at->diffInSeconds(now())
                : 0;

            $session->update([
                'ended_at' => now(),
                'paused_duration_seconds' => $session->paused_duration_seconds + $pausedExtra,
                'paused_at' => null,
            ]);
        }
        return back();
    }

    private function liveSession(Request $request)
    {
        return $request->user()->ciSessions()->whereNull('ended_at')->first();
    }
}
