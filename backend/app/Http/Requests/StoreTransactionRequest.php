<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreTransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'type' => 'required|in:income,expense',
            'category' => 'required|string',
            'date' => 'required|date',
            'description' => 'nullable|string',
            'goal_id' => 'nullable|exists:goals,id'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => 'error',
            'message' => 'Data transaksi tidak valid',
            'errors' => $validator->errors()
        ], 422));
    }
}
