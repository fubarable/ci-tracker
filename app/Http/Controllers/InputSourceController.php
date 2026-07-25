<?php

namespace App\Http\Controllers;

use App\Models\InputSource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InputSourceController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('settings/InputSources', [
            'sources' => InputSource::where(function ($q) use ($request) {
                $q->whereNull('user_id')->orWhere('user_id', $request->user()->id);
            })->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $request->user()->inputSources()->create([
            'name' => $validated['name'],
            'slug' => str($validated['name'])->slug(),
            'is_system' => false,
            'is_active' => true,
            'exclude_from_ds_hours' => false,
        ]);

        return back();
    }

    public function toggleActive(Request $request, InputSource $inputSource)
    {
        $this->authorizeOwn($request, $inputSource);

        $inputSource->update(['is_active' => ! $inputSource->is_active]);

        return back();
    }

    public function destroy(Request $request, InputSource $inputSource)
    {
        $this->authorizeOwn($request, $inputSource);

        if ($inputSource->ciSessions()->exists()) {
            return back()->withErrors(['source' => 'Cannot delete a source with existing sessions. Deactivate it instead.']);
        }

        $inputSource->delete();

        return back();
    }

    private function authorizeOwn(Request $request, InputSource $inputSource): void
    {
        abort_if($inputSource->is_system || $inputSource->user_id !== $request->user()->id, 403);
    }
}
