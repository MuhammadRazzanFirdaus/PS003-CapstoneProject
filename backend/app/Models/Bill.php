<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $fillable = ['user_id', 'name', 'amount', 'due_date', 'category', 'is_paid'];
}
