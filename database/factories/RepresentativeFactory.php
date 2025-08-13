<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Representative>
 */
class RepresentativeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $firstName = $this->faker->firstName();
        $lastName  = $this->faker->lastName();
        $name      = $firstName . ' ' . $lastName;

        return [
            'name'  => $name,
            'image' => 'https://ui-avatars.com/api/?name=' . urlencode($name) . '&background=random',
        ];
    }
}
