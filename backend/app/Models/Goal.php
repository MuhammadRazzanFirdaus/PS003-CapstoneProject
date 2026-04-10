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
        'target_date', 
        'status'
    ];

    protected $appends = ['current_savings', 'current_status', 'days_passed', 'image_url'];

    public function savings()
    {
        return $this->hasMany(GoalSaving::class);
    }

    /**
     * Get total savings (initial_amount + sum of all savings)
     */
    public function getCurrentSavingsAttribute()
    {
        $incomes = $this->savings()->where('type', 'income')->sum('amount');
        $expenses = $this->savings()->where('type', 'expense')->sum('amount');
        return (float)($this->initial_amount ?? 0) + (float)$incomes - (float)$expenses;
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

        if ($current >= $target) {
            return 'completed';
        }

        // Dynamic linear projection logic
        $createdAt = $this->created_at;
        $targetDate = \Carbon\Carbon::parse($this->target_date);
        
        // Total days available from creation to target
        $totalDays = max(1, $createdAt->diffInDays($targetDate));
        $daysPassed = (int)$this->days_passed;

        // How much SHOULD have been saved by now based on linear progress
        $expected = ($daysPassed / $totalDays) * $target;

        if ($current < $expected) {
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

    /**
     * Get full image URL
     */
    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }
}