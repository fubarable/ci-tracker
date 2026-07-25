<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CiSessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InputSourceController;
use App\Http\Controllers\TagController;

Route::inertia('/', 'Welcome')->name('home');

Route::middleware(['auth'])->group(function () {
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

    Route::get('/settings/input-sources', [InputSourceController::class, 'index'])->name('input-sources.index');
    Route::post('/settings/input-sources', [InputSourceController::class, 'store'])->name('input-sources.store');
    Route::patch('/settings/input-sources/{inputSource}/toggle', [InputSourceController::class, 'toggleActive'])->name('input-sources.toggle');
    Route::delete('/settings/input-sources/{inputSource}', [InputSourceController::class, 'destroy'])->name('input-sources.destroy');

    Route::get('/settings/tags', [TagController::class, 'index'])->name('tags.index');
    Route::post('/settings/tags', [TagController::class, 'store'])->name('tags.store');
    Route::delete('/settings/tags/{tag}', [TagController::class, 'destroy'])->name('tags.destroy');
});

require __DIR__ . '/settings.php';
