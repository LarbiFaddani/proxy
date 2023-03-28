<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Auth>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        
            
        $text = $this->faker->text(50); // Génère une chaîne de texte aléatoire de 20 caractères
        $adress = substr($text, 0, 25);
        $roles = ['admin', 'advertiser'];
        $role = $this->faker->randomElement($roles);
        return [
            'email' => fake()->unique()->safeEmail(),
            'name' => fake()->name(),
            'password' => fake()->password(),
            'phone'=> fake()->phoneNumber(),
            'address' => $adress,
            'role'=>$role,
        ];
    }
}
