<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    
    public function definition(): array
    {
        $text = $this->faker->text(50); // Génère une chaîne de texte aléatoire de 20 caractères
        $region = substr($text, 0, 15);
        $secteur = substr($text, 0, 15);
        return [
            'region' => $region,
            'city' => fake()->city(),
            'secteur'=> $secteur,
            'longitude' => fake()->randomFloat(6, -180, 180),
            'altitude'=> fake()->randomFloat(6, 0, 10000),
        ];
    }
}
