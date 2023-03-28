<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

trait Child
{
    use HasFactory;

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $user = auth()->user();
            if ($user) {
                $model->user_id = $user->id;
            }
        });

        static::addGlobalScope('user_id', function ($builder) {
            $user = auth()->user();
            if ($user) {
                $builder->where('user_id', $user->id);
            }
        });
    }
}
