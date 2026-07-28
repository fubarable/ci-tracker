<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Language;
use App\Models\Modality;
use App\Models\InputSource;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $tz = $user->timezone ?? config('app.timezone');

        $filters = [
            'language_ids' => $request->input('language_ids', []),
            'modality_ids' => $request->input('modality_ids', []),
            'input_source_ids' => $request->input('input_source_ids', []),
        ];

        $range = $request->input('range', '30');

        return Inertia::render('Dashboard', [
            'summary' => $this->summaryCards($user, $tz, $filters),
            'dailyTotals' => $this->dailyTotals($user, $tz, $range, $filters),
            'growth' => $this->growthData($user, $tz, $filters),
            'bySource' => $this->breakdownBy($user, 'inputSource', 'name', $filters),
            'byModality' => $this->breakdownBy($user, 'modality', 'name', $filters),
            'languages' => Language::where('is_active', true)->orderBy('sort_order')->get(),
            'modalities' => Modality::orderBy('id')->get(),
            'inputSources' => InputSource::where('is_active', true)
                ->where(function ($q) use ($request) {
                    $q->whereNull('user_id')->orWhere('user_id', $request->user()->id);
                })
                ->orderBy('name')->get(),
            'filters' => $filters,
            'range' => $range,
        ]);
    }

    private function summaryCards(User $user, string $tz, array $filters): array
    {
        $sessions = $this->applyFilters(
            $user->ciSessions()->whereNotNull('ended_at'),
            $filters
        )->get();

        $totalSeconds = $sessions->sum(
            fn($s) => $s->started_at->diffInSeconds($s->ended_at) - $s->paused_duration_seconds
        );

        $todayStart = now($tz)->startOfDay()->utc();
        $todayEnd = now($tz)->endOfDay()->utc();
        $todaySeconds = $sessions
            ->filter(fn($s) => $s->started_at->between($todayStart, $todayEnd))
            ->sum(fn($s) => $s->started_at->diffInSeconds($s->ended_at) - $s->paused_duration_seconds);

        $weekStart = now($tz)->startOfWeek()->utc();
        $weekEnd = now($tz)->endOfWeek()->utc();
        $weekSeconds = $sessions
            ->filter(fn($s) => $s->started_at->between($weekStart, $weekEnd))
            ->sum(fn($s) => $s->started_at->diffInSeconds($s->ended_at) - $s->paused_duration_seconds);

        return [
            'allTimeSeconds' => max(0, $totalSeconds),
            'todaySeconds' => max(0, $todaySeconds),
            'weekSeconds' => max(0, $weekSeconds),
            'sessionCount' => $sessions->count(),
        ];
    }

    private function dailyTotals(User $user, string $tz, string $range, array $filters): array
    {
        if ($range === 'all') {
            $earliest = $this->applyFilters(
                $user->ciSessions()->whereNotNull('ended_at'),
                $filters
            )->orderBy('started_at')->first();

            if (!$earliest) {
                return [];
            }

            $start = $earliest->started_at->copy()->setTimezone($tz)->startOfDay();
            $days = (int) $start->diffInDays(now($tz)->startOfDay()) + 1;
        } else {
            $days = (int) $range;
            $start = now($tz)->subDays($days - 1)->startOfDay();
        }

        $sessions = $this->applyFilters(
            $user->ciSessions()->whereNotNull('ended_at')->where('started_at', '>=', $start->copy()->utc()),
            $filters
        )->get();

        $byDay = [];
        for ($i = 0; $i < $days; $i++) {
            $day = $start->copy()->addDays($i);
            $byDay[$day->toDateString()] = 0;
        }

        foreach ($sessions as $s) {
            $localDate = $s->started_at->copy()->setTimezone($tz)->toDateString();
            if (array_key_exists($localDate, $byDay)) {
                $seconds = $s->started_at->diffInSeconds($s->ended_at) - $s->paused_duration_seconds;
                $byDay[$localDate] += max(0, $seconds);
            }
        }

        return collect($byDay)->map(fn($seconds, $date) => [
            'date' => $date,
            'seconds' => $seconds,
        ])->values()->all();
    }

    private function breakdownBy(User $user, string $relation, string $labelField, array $filters): array
    {
        $sessions = $this->applyFilters(
            $user->ciSessions()->whereNotNull('ended_at')->with($relation),
            $filters
        )->get();

        $totals = [];
        foreach ($sessions as $s) {
            $label = $s->{$relation}->{$labelField};
            $seconds = $s->started_at->diffInSeconds($s->ended_at) - $s->paused_duration_seconds;
            $totals[$label] = ($totals[$label] ?? 0) + max(0, $seconds);
        }

        arsort($totals);

        return collect($totals)->map(fn($seconds, $label) => [
            'label' => $label,
            'seconds' => $seconds,
        ])->values()->all();
    }

    private function applyFilters(Builder|Relation $query, array $filters)
    {
        if (!empty($filters['language_ids'])) {
            $query->whereIn('language_id', $filters['language_ids']);
        }
        if (!empty($filters['modality_ids'])) {
            $query->whereIn('modality_id', $filters['modality_ids']);
        }
        if (!empty($filters['input_source_ids'])) {
            $query->whereIn('input_source_id', $filters['input_source_ids']);
        }
        return $query;
    }

    private function growthData(User $user, string $tz, array $filters): array
    {
        $sessions = $this->applyFilters(
            $user->ciSessions()->whereNotNull('ended_at'),
            $filters
        )->orderBy('started_at')->get();

        if ($sessions->isEmpty()) {
            return [];
        }

        $byDay = [];
        foreach ($sessions as $s) {
            $localDate = $s->started_at->copy()->setTimezone($tz)->toDateString();
            $seconds = max(0, $s->started_at->diffInSeconds($s->ended_at) - $s->paused_duration_seconds);
            $byDay[$localDate] = ($byDay[$localDate] ?? 0) + $seconds;
        }

        ksort($byDay);

        $cumulative = 0;
        $result = [];
        foreach ($byDay as $date => $seconds) {
            $cumulative += $seconds;
            $result[] = ['date' => $date, 'cumulativeSeconds' => $cumulative];
        }

        return $result;
    }
}
