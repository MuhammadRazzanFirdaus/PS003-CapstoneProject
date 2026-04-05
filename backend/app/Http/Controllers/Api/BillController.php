<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBillRequest;
use App\Http\Requests\UpdateBillStatusRequest;
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

    public function store(StoreBillRequest $request)
    {
        $validated = $request->validated();

        $bill = Bill::create($validated);
        return response()->json(['success' => true, 'data' => $bill], 201);
    }

    public function updateStatus(UpdateBillStatusRequest $request, $id)
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