<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Goal;
use App\Models\GoalSaving;
use Illuminate\Http\Request;

class GoalSavingController extends Controller
{

    public function store(Request $request, $goalId)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'note' => 'nullable|string',
            'date' => 'required|date',
        ]);

        try {
            $goal = Goal::findOrFail($goalId);
            $saving = $goal->savings()->create($validated);

            return response()->json(['success' => true, 'message' => 'Saving added.', 'data' => $saving], 201);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'Goal not found.'], 404);
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

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'note' => 'nullable|string',
            'date' => 'required|date',
        ]);

        try {
            $saving = GoalSaving::findOrFail($id);
            $saving->update($validated);

            return response()->json(['success' => true, 'message' => 'Saving updated.', 'data' => $saving], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'Saving not found.'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            $saving = GoalSaving::findOrFail($id);
            $saving->delete();

            return response()->json(['success' => true, 'message' => 'Saving deleted.'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'Saving not found.'], 404);
        }
    }
}