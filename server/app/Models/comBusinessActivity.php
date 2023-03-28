<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class comBusinessActivity extends Model
{
    protected $fillable=['businessActivity_id','campaign_id','campaign_name','activity_name'];
    protected $table = 'com_businessactivities';
    protected $with = ['campaign','businessActivity',];
    use HasFactory;
    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
    public function businessActivity(){
        return $this->belongsTo(businessActivity::class);
    }
}
