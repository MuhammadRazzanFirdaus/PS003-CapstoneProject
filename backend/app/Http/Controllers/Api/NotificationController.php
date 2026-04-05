<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNotificationRequest;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->query('user_id');
        $notifications = Notification::when($userId, function ($query) use ($userId) {
            return $query->where('user_id', $userId);
        })->latest()->get();

        return response()->json(['success' => true, 'data' => $notifications]);
    }

    public function store(StoreNotificationRequest $request)
    {
        $validated = $request->validated();

        $notification = Notification::create($validated);
        return response()->json(['success' => true, 'data' => $notification], 201);
    }

    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->update([
            'is_read' => true,
            'read_at' => now()
        ]);

        return response()->json(['success' => true, 'message' => 'Notifikasi dibaca.']);
    }
}