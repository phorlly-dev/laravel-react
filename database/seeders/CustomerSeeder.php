<?php
namespace Database\Seeders;

use App\Models\Country;
use App\Models\Customer;
use App\Models\Representative;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create countries and representatives first
        Country::factory(195)->create();
        Representative::factory(808)->create();

        // Create customers
        Customer::factory(8800)->create();
    }
}
