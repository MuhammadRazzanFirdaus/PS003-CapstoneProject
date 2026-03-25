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
   
            $data = $request->validated();

            $data['user_id'] = $request->user_id;

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