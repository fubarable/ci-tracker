<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InputSourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sources = [
            ['name' => 'NONE',             'slug' => 'none',             'exclude_from_ds_hours' => false],
            ['name' => 'Dreaming Spanish', 'slug' => 'dreaming-spanish', 'exclude_from_ds_hours' => true],
            ['name' => 'Audible',          'slug' => 'audible',          'exclude_from_ds_hours' => false],
            ['name' => 'News in Spanish',  'slug' => 'news',             'exclude_from_ds_hours' => false],
            ['name' => 'Other Spanish',    'slug' => 'other',            'exclude_from_ds_hours' => false],
            ['name' => 'Video / Movie',    'slug' => 'video-movie',      'exclude_from_ds_hours' => false],
            ['name' => 'Book',             'slug' => 'book',             'exclude_from_ds_hours' => true],
            ['name' => 'iTalki',           'slug' => 'italki',           'exclude_from_ds_hours' => false],
        ];

        foreach ($sources as $s) {
            \App\Models\InputSource::firstOrCreate(
                ['slug' => $s['slug']],
                [...$s, 'is_system' => true, 'is_active' => true, 'user_id' => null]
            );
        }
    }
}
