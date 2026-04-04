<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{

    protected $fillable = [
        'user_id', 
        'name', 
        'image', 
        'category', 
        'target_amount', 
        'saving_amount', 
        'saving_period', 
        'initial_amount', 
        'daily_target', 
        'target_date', 
        'status'
    ];

    public function savings()
    {
        return $this->hasMany(GoalSaving::class);
    }
}