<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;

class User extends Model implements Authenticatable
{
    use HasFactory;

    protected $table = 'users';
    protected $fillable = ['email', 'password'];
    protected $hidden = [
        'password',
    ];

    // Implement Authenticatable interface methods

}

