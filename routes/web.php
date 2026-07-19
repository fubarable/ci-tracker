<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CiSessionController;

Route::inertia('/', 'Welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');
    Route::get('/tracker', [CiSessionController::class, 'index'])->name('tracker.index');
    Route::post('/tracker/start', [CiSessionController::class, 'start'])->name('tracker.start');
    Route::post('/tracker/pause', [CiSessionController::class, 'pause'])->name('tracker.pause');
    Route::post('/tracker/resume', [CiSessionController::class, 'resume'])->name('tracker.resume');
    Route::post('/tracker/stop', [CiSessionController::class, 'stop'])->name('tracker.stop');
});

require __DIR__ . '/settings.php';
