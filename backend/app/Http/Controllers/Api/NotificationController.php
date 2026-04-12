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
        $userId = auth()->id();

        $this->syncBillReminders($userId);

        $notifications = Notification::where('user_id', $userId)->latest()->get();

        return response()->json(['success' => true, 'data' => $notifications]);
    }

    private function syncBillReminders($userId)
    {
        $today = \Carbon\Carbon::today();
        $fiveDaysFromNow = \Carbon\Carbon::today()->addDays(5);

        $upcomingBills = \App\Models\Bill::where('user_id', $userId)
            ->where('is_paid', false)
            ->whereDate('due_date', '>=', $today)
            ->whereDate('due_date', '<=', $fiveDaysFromNow)
            ->get();

        foreach ($upcomingBills as $bill) {
            $dueDate = \Carbon\Carbon::parse($bill->due_date);
            $daysLeft = $today->diffInDays($dueDate);

            $exists = Notification::where('user_id', $userId)
                ->where('bill_id', $bill->id)
                ->where('type', 'reminder')
                ->whereMonth('created_at', $today->month)
                ->whereYear('created_at', $today->year)
                ->exists();

            if (!$exists) {
                $daysText = $daysLeft == 0 ? "hari ini" : ($daysLeft == 1 ? "besok" : "dalam " . $daysLeft . " hari");

                Notification::create([
                    'user_id' => $userId,
                    'title' => 'Reminder Tagihan',
                    'message' => "Tagihan {$bill->name} sebesar Rp" . number_format($bill->amount, 0, ',', '.') . " akan jatuh tempo {$daysText}.",
                    'type' => 'reminder',
                    'bill_id' => $bill->id,
                ]);
            }
        }
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