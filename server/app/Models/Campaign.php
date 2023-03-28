<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;
    protected $fillable=['id', 'name', 'budget_max', 'begin_date', 'end_date', 'file', 'display_hours', 'status', 'url', 'advertiser_id'];

    public function trackings()
    {
    return $this->hasMany(Tracking::class);
    }
    public function isActive(): bool
{
    return $this->end_date >= now() && $this->start_date <= now();
}
}
