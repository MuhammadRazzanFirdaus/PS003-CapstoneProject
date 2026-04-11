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

        $goals->each->syncStatus();

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

            $goal->syncStatus();

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

    public function show($id)
    {
        try {
            $goal = Goal::with('savings')->findOrFail($id);
            $goal->syncStatus();

            return response()->json([
                'success' => true,
                'data' => $goal
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Goal tidak ditemukan.'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data goal.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $goal = Goal::findOrFail($id);

            $data = $request->all();

            if ($request->hasFile('image')) {
                if ($goal->image) {
                    Storage::disk('public')->delete($goal->image);
                }
                $path = $request->file('image')->store('goals', 'public');
                $data['image'] = $path;
            }

            $goal->update($data);
            $goal->syncStatus();

            return response()->json([
                'success' => true,
                'message' => 'Goal berhasil diperbarui!',
                'data' => $goal
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Goal tidak ditemukan.'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui.',
                'error' => $e->getMessage()
            ], 500);
        }
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