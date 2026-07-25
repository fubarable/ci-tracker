<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CiSessionController;
use App\Http\Controllers\DashboardController;

Route::inertia('/', 'Welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::inertia('dashboard', 'Dashboard')->name('dashboard');
    Route::get('/tracker', [CiSessionController::class, 'index'])->name('tracker.index');
    Route::get('/tracker/history', [CiSessionController::class, 'history'])->name('tracker.history');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/tracker/start', [CiSessionController::class, 'start'])->name('tracker.start');
    Route::post('/tracker/pause', [CiSessionController::class, 'pause'])->name('tracker.pause');
    Route::post('/tracker/resume', [CiSessionController::class, 'resume'])->name('tracker.resume');
    Route::post('/tracker/stop', [CiSessionController::class, 'stop'])->name('tracker.stop');
    Route::post('/tracker/manual', [CiSessionController::class, 'storeManual'])->name('tracker.manual');
    Route::patch('/tracker/{ciSession}', [CiSessionController::class, 'update'])->name('tracker.update');
    Route::delete('/tracker/{ciSession}', [CiSessionController::class, 'destroy'])->name('tracker.destroy');
});

require __DIR__ . '/settings.php';
