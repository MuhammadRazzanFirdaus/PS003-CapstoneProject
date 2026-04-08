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

    protected $appends = ['current_savings', 'current_status', 'days_passed'];

    public function savings()
    {
        return $this->hasMany(GoalSaving::class);
    }

    /**
     * Get total savings (initial_amount + sum of all savings)
     */
    public function getCurrentSavingsAttribute()
    {
        // Use pre-aggregated sum if available (optimized for index)
        $sum = $this->savings_sum_amount ?? $this->savings()->sum('amount');
        return (float)($this->initial_amount ?? 0) + (float)$sum;
    }

    /**
     * Get number of days passed since goal creation (Day 1 logic)
     */
    public function getDaysPassedAttribute()
    {
        return max(1, now()->diffInDays($this->created_at) + 1);
    }

    /**
     * Calculate dynamic status based on progress vs schedule
     */
    public function getCurrentStatusAttribute()
    {
        $current = (float)$this->current_savings;
        $target = (float)$this->target_amount;
        $daily = (float)($this->daily_target ?? 0);
        $daysPassed = (int)$this->days_passed;

        if ($current >= $target) {
            return 'completed';
        }

        $expected = $daysPassed * $daily;

        if ($daily > 0 && $current < $expected) {
            return 'not_achieved';
        }

        return 'in_progress';
    }

    /**
     * Sync the status column in DB based on current progress
     */
    public function syncStatus()
    {
        $newStatus = $this->current_status;

        if ($this->status !== $newStatus) {
            $this->status = $newStatus;
            $this->saveQuietly();
        }

        return $this;
    }
}