<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class combusinesstype extends Model
{

    protected $fillable=['businesstype_id','campaign_id','campaign_name','type_name'];
    protected $table = 'com_businessType';
    protected $with = ['campaign','businessType',];
    use HasFactory;
    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
    public function businessType(){
        return $this->belongsTo(businessType::class);
    }
}
