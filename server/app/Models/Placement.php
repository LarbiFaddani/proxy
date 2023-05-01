<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Placement extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'name', 'business_id'];
    // protected $with = [//'business',
    //         'tracking',
    //     ];
    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class ,'business_id' );
    }
    // public function tracking(): BelongsTo
    // {
    //     return $this->belongsTo(Tracking::class);
    // }

}
