<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignPlacement extends Model
{
    use HasFactory;
    protected $fillable = ['campaign_id', 'placement_id', 'tracking_id'];
    protected $with=['Tracking','campaign','placement',];
    public function Campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
    public function Placement()
    {
        return $this->belongsTo(Placement::class);
    }
    public function Tracking()
    {
        return $this->belongsTo(Tracking::class);
    }
}
