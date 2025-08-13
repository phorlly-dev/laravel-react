<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(8800)->create();

        User::factory()->create([
            'name' => 'Admin System',
            'email' => 'admin@system.me',
            'password' =>  bcrypt('Admin@123'),
            'is_admin' => true
        ]);
    }
}
