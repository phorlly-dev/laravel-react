<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(100000)->create();

        User::factory()->create([
            'name' => 'Admin System',
            'email' => 'admin@system.me',
            'password' =>  bcrypt('Admin@123'),
            'is_admin' => true
        ]);
    }
}
