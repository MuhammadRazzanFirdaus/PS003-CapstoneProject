<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBillRequest;
use App\Http\Requests\UpdateBillRequest;
use App\Http\Requests\UpdateBillStatusRequest;
use App\Models\Bill;
use Illuminate\Http\Request;

class BillController extends Controller
{
    public function index(Request $request)
    {
        $bills = Bill::where('user_id', auth()->id())->get();

        return response()->json(['success' => true, 'data' => $bills]);
    }

    public function store(StoreBillRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        $bill = Bill::create($validated);
        return response()->json(['success' => true, 'data' => $bill], 201);
    }

    public function updateStatus(UpdateBillStatusRequest $request, $id)
    {
        $bill = Bill::where('user_id', auth()->id())->findOrFail($id);
        $bill->update([
            'is_paid' => $request->is_paid,
            'paid_at' => $request->is_paid ? now() : null,
        ]);

        return response()->json(['success' => true, 'data' => $bill]);
    }

    public function update(UpdateBillRequest $request, $id)
    {
        $bill = Bill::where('user_id', auth()->id())->findOrFail($id);
        $bill->update($request->validated());

        return response()->json(['success' => true, 'data' => $bill]);
    }

    public function destroy($id)
    {
        $bill = Bill::where('user_id', auth()->id())->findOrFail($id);
        $bill->delete();

        return response()->json([
            'success' => true,
            'message' => 'Tagihan berhasil dihapus'
        ]);
    }
}