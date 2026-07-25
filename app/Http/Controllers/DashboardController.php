<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $tz = $user->timezone ?? config('app.timezone');

        return Inertia::render('Dashboard', [
            'summary' => $this->summaryCards($user, $tz),
            'dailyTotals' => $this->dailyTotals($user, $tz),
            'bySource' => $this->breakdownBy($user, 'inputSource', 'name'),
            'byModality' => $this->breakdownBy($user, 'modality', 'name'),
        ]);
    }

    private function summaryCards(User $user, string $tz): array
    {
        $sessions = $user->ciSessions()->whereNotNull('ended_at')->get();

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

    private function dailyTotals(User $user, string $tz, int $days = 30): array
    {
        $start = now($tz)->subDays($days - 1)->startOfDay();

        $sessions = $user->ciSessions()
            ->whereNotNull('ended_at')
            ->where('started_at', '>=', $start->copy()->utc())
            ->get();

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

    private function breakdownBy(User $user, string $relation, string $labelField): array
    {
        $sessions = $user->ciSessions()
            ->whereNotNull('ended_at')
            ->with($relation)
            ->get();

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
}
