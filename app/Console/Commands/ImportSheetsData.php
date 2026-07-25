<?php

namespace App\Console\Commands;

use App\Models\CiSession;
use App\Models\InputSource;
use App\Models\Language;
use App\Models\Modality;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class ImportSheetsData extends Command
{
    protected $signature = 'import:sheets {file} {--user=} {--dry-run}';
    protected $description = 'Import historical CI session data from a Google Sheets CSV export';

    /**
     * Maps the raw "Choice of Task" string to [modality_slug, input_source_slug].
     */
    private array $taskMap = [
        'Listening to Dreaming Spanish' => ['listening', 'dreaming-spanish'],
        'Listening to Audible' => ['listening', 'audible'],
        'Listening to News in Spanish' => ['listening', 'news'],
        'Listening to Other Spanish Lang' => ['listening', 'other'],
        'Watching Spanish Video or Movie' => ['watching', 'video-movie'],
        'Reading Spanish Book' => ['reading', 'book'],
        'iTalki Speaking Lessons' => ['speaking', 'italki'],
        'NONE' => [null, 'none'],
    ];

    public function handle(): int
    {
        $path = $this->argument('file');

        if (! file_exists($path)) {
            $this->error("File not found: {$path}");
            return self::FAILURE;
        }

        $userEmail = $this->option('user');
        $user = $userEmail
            ? User::where('email', $userEmail)->first()
            : User::first();

        if (! $user) {
            $this->error('No matching user found. Use --user=email@example.com or ensure at least one user exists.');
            return self::FAILURE;
        }

        $isDryRun = $this->option('dry-run');
        $language = Language::where('code', 'es')->firstOrFail();

        $rows = array_map('str_getcsv', file($path));
        $header = array_shift($rows); // discard header row

        $imported = 0;
        $skippedZero = 0;
        $skippedUnmapped = 0;
        $totalSeconds = 0;

        foreach ($rows as $row) {
            if (count($row) < 4 || trim($row[0]) === '') {
                continue; // skip blank/malformed lines
            }

            [$task, $startRaw, $endRaw, $delta] = $row;

            if (trim($delta) === '0:00:00') {
                $skippedZero++;
                continue;
            }

            $task = trim($task);
            if (! isset($this->taskMap[$task])) {
                $this->warn("Unmapped task: \"{$task}\" — skipping row.");
                $skippedUnmapped++;
                continue;
            }

            [$modalitySlug, $sourceSlug] = $this->taskMap[$task];

            $modality = $modalitySlug ? Modality::where('slug', $modalitySlug)->first() : null;
            $inputSource = InputSource::where('slug', $sourceSlug)->first();

            if (! $inputSource || ($modalitySlug && ! $modality)) {
                $this->warn("Could not resolve modality/source for: \"{$task}\" — skipping row.");
                $skippedUnmapped++;
                continue;
            }

            $startedAt = Carbon::createFromFormat('n/j/Y H:i:s', trim($startRaw));
            $endedAt = Carbon::createFromFormat('n/j/Y H:i:s', trim($endRaw));
            $seconds = abs($startedAt->diffInSeconds($endedAt));
            $totalSeconds += $seconds;

            if (! $isDryRun) {
                CiSession::create([
                    'user_id' => $user->id,
                    'language_id' => $language->id,
                    'modality_id' => $modality?->id,
                    'input_source_id' => $inputSource->id,
                    'started_at' => $startedAt,
                    'ended_at' => $endedAt,
                    'paused_duration_seconds' => 0,
                ]);
            }

            $imported++;
        }

        $this->newLine();
        $this->info("Imported: {$imported}");
        $this->info("Skipped (zero duration): {$skippedZero}");
        $this->info("Skipped (unmapped task): {$skippedUnmapped}");
        $this->info('Total imported time: ' . $this->formatDuration($totalSeconds));

        if ($isDryRun) {
            $this->comment('(Dry run — no data was written.)');
        }

        return self::SUCCESS;
    }

    private function formatDuration(int $seconds): string
    {
        $h = intdiv($seconds, 3600);
        $m = intdiv($seconds % 3600, 60);
        $s = $seconds % 60;
        return sprintf('%d:%02d:%02d', $h, $m, $s);
    }
}
