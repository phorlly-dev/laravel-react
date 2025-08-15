<?php
namespace Database\Factories;

use App\Models\Country;
use App\Models\Representative;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

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
            'name'              => $this->faker->name(),
            'country_id'        => Country::factory(),
            'company'           => $this->faker->company(),
            'date'              => $this->faker->dateTimeBetween('-5 years', 'now')->format('Y-m-d'),
            'status'            => $this->faker->randomElement(['Qualified', 'Unqualified', 'New', 'Negotiation', 'Renewal', 'Proposal']),
            'verified'          => $this->faker->boolean(),
            'activity'          => $this->faker->numberBetween(1, 100),
            'representative_id' => Representative::factory(),
            'balance'           => $this->faker->randomFloat(2, 0, 100000),
        ];
    }
}
