<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Goal;
use App\Models\GoalSaving;
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

            $saving = $goal->savings()->create($validated);

            $goal->syncStatus();

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

            return response()->json(['success' => true, 'message' => 'Saving deleted.'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'Saving not found.'], 404);
        }
    }
}