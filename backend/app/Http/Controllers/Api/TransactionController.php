<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;


class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->query('user_id');
        $transactions = Transaction::when($userId, function ($query) use ($userId) {
        return $query->where('user_id', $userId);
        })->get();

            return response()->json(['success' => true, 'data' => $transactions]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'type' => 'required|in:income,expense',
            'category' => 'required|string',
            'date' => 'required|date',
            'description' => 'nullable|string',
            'goal_id' => 'nullable|exists:goals,id'
        ]);

        $transaction = Transaction::create($validated);
    
        return response()->json(['success' => true, 'data' => $transaction], 201);
    }
}
