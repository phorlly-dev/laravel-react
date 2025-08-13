<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Representative;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'name' => $this->faker->name(),
            'country_id' => Country::factory(),
            'company' => $this->faker->company(),
            'date' => $this->faker->dateTimeBetween('-5 years', 'now')->format('Y-m-d'),
            'status' => $this->faker->randomElement(['qualified', 'unqualified', 'new', 'negotiation', 'renewal', 'proposal']),
            'verified' => $this->faker->boolean(),
            'activity' => $this->faker->numberBetween(1, 100),
            'representative_id' => Representative::factory(),
            'balance' => $this->faker->randomFloat(2, 0, 100000),
        ];
    }
}
