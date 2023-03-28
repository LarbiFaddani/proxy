<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Advertiser extends User
{
    use Child;

    protected $fillable = ['id','user_id','act_id','act_name'];
    protected $table="advertisers";
    protected $with=['user', 'business_activities'];

    public function business_activities(){
        return $this->belongsTo(BusinessActivities::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

   
}
?>