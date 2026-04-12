<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'streak_count',
        'last_streak_activity',
    ];

    protected $appends = ['current_streak'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'last_streak_activity' => 'date',
        ];
    }

    /**
     * Increment streak count if active, reset if broken.
     */
    public function recordActivity()
    {
        $today = now()->startOfDay();
        $lastActivity = $this->last_streak_activity ? $this->last_streak_activity->startOfDay() : null;

        if (!$lastActivity) {
            $this->streak_count = 1;
        } else {
            $diff = $today->diffInDays($lastActivity, false);

            if (abs($diff) == 1) {
                $this->streak_count += 1;
            } elseif (abs($diff) > 1) {
                $this->streak_count = 1;
            }
        }

        $this->last_streak_activity = $today;
        $this->save();
    }

    /**
     * Get the current streak, returns 0 if gap is too long.
     */
    public function getCurrentStreakAttribute()
    {
        if (!$this->last_streak_activity) {
            return 0;
        }

        $today = now()->startOfDay();
        $lastActivity = $this->last_streak_activity->startOfDay();
        $diff = $today->diffInDays($lastActivity);

        if (abs($diff) > 1) {
            return 0;
        }

        return $this->streak_count;
    }
}
