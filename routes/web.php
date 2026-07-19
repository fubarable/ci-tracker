<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CiSessionController;

Route::inertia('/', 'Welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');
    Route::get('/tracker', [CiSessionController::class, 'index'])->name('tracker.index');
});

require __DIR__ . '/settings.php';
