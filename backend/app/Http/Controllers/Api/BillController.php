<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use Illuminate\Http\Request;

class BillController extends Controller
{
        public function index(Request $request)
        {
            $userId = $request->query('user_id');
            $bills = Bill::when($userId, function ($query) use ($userId) {
                return $query->where('user_id', $userId);
            })->get();

            return response()->json(['success' => true, 'data' => $bills]);
        }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'due_date' => 'required|date',
            'category' => 'required|string',
            'is_paid' => 'boolean'
        ]);

        $bill = Bill::create($validated);
        return response()->json(['success' => true, 'data' => $bill], 201);
    }

    public function updateStatus(Request $request, $id)
    {
            $bill = Bill::findOrFail($id);
            $bill->update([
                'is_paid' => $request->is_paid,
                'status' => $request->is_paid ? 'paid' : 'unpaid',
                'paid_at' => $request->is_paid ? now() : null
            ]);

            return response()->json(['success' => true, 'data' => $bill]);
    }
}