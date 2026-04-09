<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GoalSaving extends Model
{
    protected $fillable = ['goal_id', 'type', 'amount', 'note', 'date'];
    
    public function goal()
    {
        return $this->belongsTo(Goal::class);
    }
}
