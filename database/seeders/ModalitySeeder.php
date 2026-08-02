<?php

namespace Database\Seeders;

use App\Models\Modality;
use Illuminate\Database\Seeder;

class ModalitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modalities = [
            ['name' => 'Listening', 'slug' => 'listening'],
            ['name' => 'Watching',  'slug' => 'watching'],
            ['name' => 'Reading',   'slug' => 'reading'],
            ['name' => 'Speaking',  'slug' => 'speaking'],
        ];

        foreach ($modalities as $m) {
            Modality::firstOrCreate(['slug' => $m['slug']], $m);
        }
    }
}
