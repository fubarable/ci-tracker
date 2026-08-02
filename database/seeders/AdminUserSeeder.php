<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('ADMIN_EMAIL');
        $password = env('ADMIN_PASSWORD');

        if (!$email || !$password) {
            $this->command->error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env — no user created.');

            return;
        }

        User::firstOrCreate(
            ['email' => $email],
            [
                'name' => env('ADMIN_NAME', 'Admin'),
                'password' => Hash::make($password),
                'email_verified_at' => now(),
                'timezone' => env('ADMIN_TIMEZONE', 'America/New_York'),
            ]
        );

        $this->command->info("Admin user ensured: {$email}");
    }
}
