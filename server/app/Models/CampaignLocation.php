<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignLocation extends Model
{
    protected $table ='campaign_locations';
    use HasFactory;
    protected $fillable = [ 'campaign_id', 'location_id','radius'];
    protected $with=['campaign','location',];
    protected $primaryKey = ['campaign_id', 'location_id'];
    use HasFactory;

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
