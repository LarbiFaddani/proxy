<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Business extends User
{
    use Child;

    protected $table = 'businesses';

    protected $with = [
        'location',
    'user',
    //'placement',
    'business_type',
    'business_activity'
 ];
    protected $fillable = ['id','user_id', 'email', 'password', 'status', 'name', 'phone', 'address', 'location_id','role', 'longitude', 'altitude', 'business_type_id', 'business_activity_id'];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function business_type()
    {
        return $this->belongsTo(BusinessType::class);
    }
    public function business_activity()
    {
        return $this->belongsTo(BusinessActivity::class);
    }
    // public function placement()
    // {
    //     return $this->hasMany(Placement::class);
    // }
}

