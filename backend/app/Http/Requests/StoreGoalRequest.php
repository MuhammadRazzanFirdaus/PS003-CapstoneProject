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
            
            'name'           => 'required|string|max:255',
            'image'          => 'nullable|image|mimes:jpeg,png,jpg|max:5120', 
            'category'       => 'required|string|max:255',
            'target_amount'  => 'required|numeric|min:1',
            'saving_amount'  => 'nullable|numeric|min:0',
            'saving_period'  => 'nullable|string|in:daily,weekly,monthly',
            'initial_amount' => 'nullable|numeric|min:0',
            'daily_target'   => 'nullable|numeric|min:0',
            'target_date'    => 'required|date|after_or_equal:today',
            'status'         => 'nullable|string|in:in_progress,completed,not_achieved',
        ];
    }

    public function messages(): array
    {
        return [
            'saving_period.in' => 'Periode tabungan harus berupa daily, weekly, atau monthly.',
            'status.in'        => 'Status tidak valid.',
            'image.max'        => 'Ukuran gambar tidak boleh lebih dari 5MB.',
        ];
    }
}