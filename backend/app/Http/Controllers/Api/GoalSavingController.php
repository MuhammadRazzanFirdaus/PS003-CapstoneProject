<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Goal;
<<<<<<< HEAD
=======
use App\Models\GoalSaving;
use App\Http\Requests\StoreGoalSavingRequest;
>>>>>>> 3bb73034eb25296b8e17326ad0028cff2e9a9ee0
use Illuminate\Http\Request;
use App\Http\Requests\StoreGoalRequest;
use Illuminate\Support\Facades\Storage;

class GoalController extends Controller
{
<<<<<<< HEAD
    public function index(Request $request)
    {
        $userId = $request->query('user_id');
=======
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
>>>>>>> 3bb73034eb25296b8e17326ad0028cff2e9a9ee0

        $goals = Goal::withSum('savings', 'amount')
            ->when($userId, function ($query) use ($userId) {
                return $query->where('user_id', $userId);
            })
            ->get();

        return response()->json(['success' => true, 'data' => $goals]);
    }

    public function store(StoreGoalRequest $request)
    {
        try {

<<<<<<< HEAD
            $data = $request->validated();
            $data['user_id'] = $request->user_id;

            $data['initial_amount'] = $data['initial_amount'] ?? 0;

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('goals', 'public');
                $data['image'] = $path;
            }

            $goal = Goal::create($data);

            if ($goal->image) {
                $goal->image_url = asset('storage/' . $goal->image);
            }

            return response()->json([
                'success' => true,
                'message' => 'Goal berhasil dibuat!',
                'data' => $goal
=======
            $validated = $request->validated();

            $goal = Goal::findOrFail($goalId);

            // Relasi otomatis akan mengisi goal_id
            $saving = $goal->savings()->create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Saving added.',
                'data' => $saving
>>>>>>> 3bb73034eb25296b8e17326ad0028cff2e9a9ee0
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
<<<<<<< HEAD
                'message' => 'Gagal menyimpan.',
                'error' => $e->getMessage()
            ], 500);
=======
                'message' => 'Goal not found.'
            ], 404);
>>>>>>> 3bb73034eb25296b8e17326ad0028cff2e9a9ee0
        }
    }

    public function update(Request $request, $id)
    {
<<<<<<< HEAD
        $goal = Goal::findOrFail($id);
=======
        $saving = GoalSaving::find($id);

        if (!$saving) {
            return response()->json(['success' => false, 'message' => 'Saving not found.'], 404);
        }

        return response()->json(['success' => true, 'data' => $saving], 200);
    }
>>>>>>> 3bb73034eb25296b8e17326ad0028cff2e9a9ee0

        $goal->update($request->all());

<<<<<<< HEAD
        return response()->json(['success' => true, 'data' => $goal]);
=======
            $saving = GoalSaving::findOrFail($id);
            $saving->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Saving updated.',
                'data' => $saving
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'Saving not found.'], 404);
        }
>>>>>>> 3bb73034eb25296b8e17326ad0028cff2e9a9ee0
    }

    public function destroy($id)
    {
        try {
            $goal = Goal::findOrFail($id);

            if ($goal->image) {
                Storage::disk('public')->delete($goal->image);
            }

            $goal->delete();

            return response()->json([
                'success' => true,
                'message' => 'Goal dan file gambar berhasil dihapus!'
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan.'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}