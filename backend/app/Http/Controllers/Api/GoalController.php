<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Goal;
use Illuminate\Http\Request;
use App\Http\Requests\StoreGoalRequest;
use Illuminate\Support\Facades\Storage;

class GoalController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->query('user_id');
        $statusFilter = $request->query('status');

        $goals = Goal::withSum('savings', 'amount')
            ->when($userId, function ($query) use ($userId) {
                return $query->where('user_id', $userId);
            })
            ->get();
        
        // Sync each goal status in DB if it's stale
        $goals->each->syncStatus();

        // Filter by dynamic status if requested
        if ($statusFilter) {
            $goals = $goals->filter(function ($goal) use ($statusFilter) {
                return $goal->current_status === $statusFilter;
            })->values();
        }

        return response()->json(['success' => true, 'data' => $goals]);
    }

    public function store(StoreGoalRequest $request)
    {
        try {

            $data = $request->validated();
            $data['user_id'] = $request->user_id;

            $data['initial_amount'] = $data['initial_amount'] ?? 0;

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('goals', 'public');
                $data['image'] = $path;
            }

            $goal = Goal::create($data);

            // Sync status immediately after creation
            $goal->syncStatus();

            if ($goal->image) {
                $goal->image_url = asset('storage/' . $goal->image);
            }

            return response()->json([
                'success' => true,
                'message' => 'Goal berhasil dibuat!',
                'data' => $goal
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $goal = Goal::findOrFail($id);

        $goal->update($request->all());

        // Sync status after update
        $goal->syncStatus();

        return response()->json(['success' => true, 'data' => $goal]);
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