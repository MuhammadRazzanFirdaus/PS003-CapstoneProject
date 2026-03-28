<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGoalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', 
            'category' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:1',
            'initial_amount' => 'nullable|numeric|min:0',
            'daily_target' => 'required|numeric|min:0',
            'target_date' => 'required|date|after_or_equal:today',
            'status' => 'nullable|string|in:active,completed,cancelled',
        ];
    }
}