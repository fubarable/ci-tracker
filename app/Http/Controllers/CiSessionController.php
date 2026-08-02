<?php

namespace App\Http\Controllers;

use App\Models\InputSource;
use App\Models\CiSession;
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
                ->with(['modality', 'inputSource'])
                ->orderByDesc('started_at')
                ->limit(1)
                ->get(),
            // ->map(function ($session) {
            //     $session->tag_ids = $session->tags->pluck('id');
            //     return $session;
            // }),
            'liveSession' => $request->user()->ciSessions()
                ->whereNull('ended_at')
                ->with(['modality', 'inputSource'])
                ->first(),
            'todaysTotalSeconds' => $this->todaysTotalSeconds($request),
            'tags' => $request->user()->tags()->orderBy('name')->get(),
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

    private function todaysTotalSeconds(Request $request): int
    {
        $tz = $request->user()->timezone ?? config('app.timezone');
        $startOfDay = now($tz)->startOfDay()->utc();
        $endOfDay = now($tz)->endOfDay()->utc();

        $todaysSessions = $request->user()->ciSessions()
            ->where('started_at', '>=', $startOfDay)
            ->where('started_at', '<=', $endOfDay)
            ->whereNotNull('ended_at')
            ->get();

        $total = 0;
        foreach ($todaysSessions as $s) {
            $seconds = abs($s->started_at->diffInSeconds($s->ended_at)) - $s->paused_duration_seconds;
            $total += $seconds;
        }

        return max(0, $total);
    }

    public function storeManual(Request $request)
    {
        $validated = $request->validate([
            'language_id' => 'required|exists:languages,id',
            'modality_id' => 'required|exists:modalities,id',
            'input_source_id' => 'required|exists:input_sources,id',
            'started_at' => 'required|date',
            'ended_at' => 'required|date|after:started_at',
            'title' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'tag_ids' => 'nullable|array',
            'tag_ids.*' => 'exists:tags,id',
        ]);

        $tagIds = $validated['tag_ids'] ?? [];
        unset($validated['tag_ids']);

        $session = $request->user()->ciSessions()->create([
            ...$validated,
            'paused_duration_seconds' => 0,
        ]);

        $session->tags()->sync($tagIds);

        return back();
    }

    public function update(Request $request, CiSession $ciSession)
    {
        $this->authorize('update', $ciSession);

        $validated = $request->validate([
            'language_id' => 'required|exists:languages,id',
            'modality_id' => 'required|exists:modalities,id',
            'input_source_id' => 'required|exists:input_sources,id',
            'started_at' => 'required|date',
            'ended_at' => 'required|date|after:started_at',
            'title' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'tag_ids' => 'nullable|array',
            'tag_ids.*' => 'exists:tags,id',
        ]);

        $tagIds = $validated['tag_ids'] ?? [];
        unset($validated['tag_ids']);

        $ciSession->update($validated);
        $ciSession->tags()->sync($tagIds);

        return back();
    }

    public function destroy(CiSession $ciSession)
    {
        $this->authorize('delete', $ciSession);

        $ciSession->delete();

        return back();
    }

    public function history(Request $request)
    {
        $query = $request->user()->ciSessions()
            ->with(['modality', 'inputSource', 'language', 'tags'])
            ->whereNotNull('ended_at');

        if ($request->filled('language_id')) {
            $query->where('language_id', $request->integer('language_id'));
        }
        if ($request->filled('modality_id')) {
            $query->where('modality_id', $request->integer('modality_id'));
        }
        if ($request->filled('input_source_id')) {
            $query->where('input_source_id', $request->integer('input_source_id'));
        }
        if ($request->filled('date_from')) {
            $query->whereDate('started_at', '>=', $request->date('date_from'));
        }
        if ($request->filled('date_to')) {
            $query->whereDate('started_at', '<=', $request->date('date_to'));
        }

        $sessions = $query->orderByDesc('started_at')
            ->paginate(25)
            ->withQueryString();

        $sessions->through(function ($session) {
            $session->tag_ids = $session->tags->pluck('id');

            return $session;
        });

        return Inertia::render('Tracker/History', [
            'languages' => Language::where('is_active', true)->orderBy('sort_order')->get(),
            'modalities' => Modality::orderBy('id')->get(),
            'inputSources' => InputSource::where('is_active', true)
                ->where(function ($q) use ($request) {
                    $q->whereNull('user_id')->orWhere('user_id', $request->user()->id);
                })
                ->orderBy('name')->get(),
            'sessions' => $sessions,
            'filters' => $request->only(['language_id', 'modality_id', 'input_source_id', 'date_from', 'date_to']),
            'tags' => $request->user()->tags()->orderBy('name')->get(),
        ]);
    }

    public function exportCsv(Request $request)
    {
        $query = $request->user()->ciSessions()
            ->with(['modality', 'inputSource', 'language', 'tags'])
            ->whereNotNull('ended_at');

        // reuse the same filters as history()
        if ($request->filled('language_id')) {
            $query->where('language_id', $request->integer('language_id'));
        }
        if ($request->filled('modality_id')) {
            $query->where('modality_id', $request->integer('modality_id'));
        }
        if ($request->filled('input_source_id')) {
            $query->where('input_source_id', $request->integer('input_source_id'));
        }
        if ($request->filled('date_from')) {
            $query->whereDate('started_at', '>=', $request->date('date_from'));
        }
        if ($request->filled('date_to')) {
            $query->whereDate('started_at', '<=', $request->date('date_to'));
        }

        $sessions = $query->orderBy('started_at')->get();

        $filename = 'ci-tracker-export-' . now()->format('Y-m-d') . '.csv';

        return response()->streamDownload(function () use ($sessions) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Date', 'Language', 'Modality', 'Source', 'Start Time', 'End Time', 'Duration', 'Title', 'Notes', 'Tags']);

            foreach ($sessions as $s) {
                $seconds = abs($s->started_at->diffInSeconds($s->ended_at)) - $s->paused_duration_seconds;
                $h = intdiv($seconds, 3600);
                $m = intdiv($seconds % 3600, 60);
                $sec = $seconds % 60;
                $duration = sprintf('%d:%02d:%02d', $h, $m, $sec);

                fputcsv($handle, [
                    $s->started_at->toDateString(),
                    $s->language->name,
                    $s->modality->name,
                    $s->inputSource->name,
                    $s->started_at->format('n/j/Y H:i:s'),
                    $s->ended_at->format('n/j/Y H:i:s'),
                    $duration,
                    $s->title,
                    $s->notes,
                    $s->tags->pluck('name')->join(', '),
                ]);
            }

            fclose($handle);
        }, $filename, ['Content-Type' => 'text/csv']);
    }
}
