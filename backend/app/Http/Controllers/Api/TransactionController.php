<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTransactionRequest;
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

    public function store(StoreTransactionRequest $request)
    {
        $validated = $request->validated();

        $transaction = Transaction::create($validated);
    
        return response()->json(['success' => true, 'data' => $transaction], 201);
    }
}
