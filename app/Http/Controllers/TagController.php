<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('settings/Tags', [
            'tags' => $request->user()->tags()->withCount('ciSessions')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $request->user()->tags()->firstOrCreate(
            ['slug' => str($validated['name'])->slug()],
            ['name' => $validated['name']]
        );

        return back();
    }

    public function destroy(Request $request, Tag $tag)
    {
        abort_if($tag->user_id !== $request->user()->id, 403);

        $tag->delete();

        return back();
    }

    public function findOrCreate(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $tag = $request->user()->tags()->firstOrCreate(
            ['slug' => str($validated['name'])->slug()],
            ['name' => $validated['name']]
        );

        return response()->json($tag);
    }
}
