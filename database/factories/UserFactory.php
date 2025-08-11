<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->name();

        return [
            'name'              => $name,
            'email'             => fake()->unique()->safeEmail(),
            'is_admin'          => fake()->boolean(10), // ~10% admins
            'sex'               => fake()->randomElement(['male', 'female', 'other']),
            'status'            => fake()->boolean(90), // active most of the time
            'avatar'            => 'https://ui-avatars.com/api/?name=' . urlencode($name) . '&background=random',
            'phone'             => fake()->unique()->e164PhoneNumber(),
            'dob'               => fake()->date('Y-m-d', now()->subYears(16)), // born <= 16y ago
            'address'           => fake()->address(),
            'email_verified_at' => fake()->boolean(80) ? now() : null,
            'password'          => static::$password ??= Hash::make('password'),
            'remember_token'    => Str::random(10),
            'created_at'        => fake()->dateTimeBetween('-2 years', 'now'),
            'updated_at'        => now(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
