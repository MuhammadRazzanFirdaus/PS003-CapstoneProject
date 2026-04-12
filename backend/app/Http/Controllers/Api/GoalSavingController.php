<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Goal;
use App\Models\GoalSaving;
use App\Models\Transaction;
use App\Models\Notification;
use App\Http\Requests\StoreGoalSavingRequest;
use Illuminate\Http\Request;

class GoalSavingController extends Controller
{
    public function index($goalId)
    {
        try {
            $goal = Goal::findOrFail($goalId);
            $savings = $goal->savings()->latest()->get();

            return response()->json([
                'success' => true,
                'data' => $savings
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Goal not found.'
            ], 404);
        }
    }

    public function store(StoreGoalSavingRequest $request, $goalId)
    {
        try {
            $validated = $request->validated();

            $goal = Goal::findOrFail($goalId);

            if ($validated['type'] === 'income') {
                $remaining = (float)$goal->target_amount - (float)$goal->current_savings;
                if ((float)$validated['amount'] > $remaining) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Tabungan melebihi sisa target goal. Sisa yang dibutuhkan: Rp' . number_format($remaining, 0, ',', '.')
                    ], 422);
                }
            }

            $saving = $goal->savings()->create($validated);

            $oldStatus = $goal->status;
            $goal->syncStatus();
            $newStatus = $goal->status;

            Notification::create([
                'user_id' => $goal->user_id,
                'title' => 'Tabungan Berhasil',
                'message' => 'Tabungan sebesar Rp' . number_format($validated['amount'], 0, ',', '.') . ' berhasil ditambahkan ke goal ' . $goal->name,
                'type' => 'success',
                'goal_id' => $goal->id,
            ]);

            if ($oldStatus !== 'completed' && $newStatus === 'completed') {
                Notification::create([
                    'user_id' => $goal->user_id,
                    'title' => 'Goal Tercapai!',
                    'message' => 'Selamat! Target tabungan untuk goal ' . $goal->name . ' telah tercapai 100%.',
                    'type' => 'completed',
                    'goal_id' => $goal->id,
                ]);
            }

            auth()->user()->recordActivity();

            Transaction::create([
                'user_id' => $goal->user_id,
                'name' => 'Goal: ' . $goal->name,
                'amount' => $validated['amount'],
                'type' => $validated['type'] === 'income' ? 'expense' : 'income',
                'category' => 'Goal',
                'description' => 'Uang yang ditabung untuk goal: ' . $goal->name . ' (Ref: #' . $saving->id . ')',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Saving added.',
                'data' => $saving
            ], 201);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Goal not found.'
            ], 404);
        }
    }

    public function show($id)
    {
        $saving = GoalSaving::find($id);

        if (!$saving) {
            return response()->json(['success' => false, 'message' => 'Saving not found.'], 404);
        }

        return response()->json(['success' => true, 'data' => $saving], 200);
    }

    public function update(StoreGoalSavingRequest $request, $id)
    {
        try {
            $validated = $request->validated();

            $saving = GoalSaving::findOrFail($id);
            $saving->update($validated);

            $saving->goal->syncStatus();

            $transaction = Transaction::where('description', 'like', '%(Ref: #' . $id . ')')->first();
            if ($transaction) {
                $transaction->update([
                    'amount' => $validated['amount'],
                    'type' => $validated['type'] === 'income' ? 'expense' : 'income',
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Saving updated.',
                'data' => $saving
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'Saving not found.'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            $saving = GoalSaving::findOrFail($id);
            $goal = $saving->goal;
            $saving->delete();

            $goal->syncStatus();

            Transaction::where('description', 'like', '%(Ref: #' . $id . ')')->delete();

            return response()->json(['success' => true, 'message' => 'Saving deleted.'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'Saving not found.'], 404);
        }
    }
}