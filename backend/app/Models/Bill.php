<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Bill extends Model
{
    protected $fillable = ['user_id', 'name', 'amount', 'due_date', 'category', 'is_paid', 'status', 'paid_at'];

    protected $appends = ['status'];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($bill) {

            $bill->setAttribute('status', $bill->status);
        });
    }

    public function getStatusAttribute()
    {
        if ($this->is_paid) {
            return 'paid';
        }

        $today = Carbon::today();
        $dueDate = Carbon::parse($this->due_date)->startOfDay();

        if ($today->lt($dueDate)) {

            $diffInDays = $today->diffInDays($dueDate);
            if ($diffInDays <= 5) {
                return 'upcoming';
            }
        }

        return 'unpaid';
    }
}
