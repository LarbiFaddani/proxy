<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{
    use HasFactory;
    protected $fillable = ['id','opening_hour', 'closing_hour', 'day', 'business_id'];
    protected $with = ['business'];
    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }
}
