<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTransactionRequest;
use App\Models\Transaction;
use App\Models\GoalSaving;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $transactions = Transaction::where('user_id', auth()->id())->get();

            return response()->json(['success' => true, 'data' => $transactions]);
    }

    public function store(StoreTransactionRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $transaction = Transaction::create($validated);

        return response()->json(['success' => true, 'data' => $transaction], 201);
    }

    public function show($id)
    {
        $transaction = Transaction::where('id', $id)->where('user_id', auth()->id())->firstOrFail();

        return response()->json(['success' => true, 'data' => $transaction]);
    }

    public function update(Request $request, $id)
    {
        $transaction = Transaction::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        $transaction->update($request->all());

        return response()->json(['success' => true, 'data' => $transaction]);
    }

    public function destroy($id)
    {
        $transaction = Transaction::where('id', $id)->where('user_id', auth()->id())->firstOrFail();

        if (preg_match('/\(Ref: #(\d+)\)/', $transaction->description, $matches)) {
            $savingId = $matches[1];
            $saving = GoalSaving::find($savingId);
            
            if ($saving) {
                $goal = $saving->goal;
                $saving->delete();
                
                if ($goal) {
                    $goal->syncStatus();
                }
            }
        }

        $transaction->delete();
        
        return response()->json(['success' => true, 'message' => 'Transaksi dihapus']);
    }
}