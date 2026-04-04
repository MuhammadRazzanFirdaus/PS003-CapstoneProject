<?php

use App\Http\Controllers\Api\GoalController;
use App\Http\Controllers\Api\GoalSavingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BillController;
use App\Http\Controllers\Api\NotificationController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Illuminate\Http\Request $request) {
        return response()->json([
            'status' => 'success',
            'data' => $request->user()
        ]);
    });

    //gols
    Route::apiResource('goals', GoalController::class);

    // goals saving
    Route::get('savings/{id}', [GoalSavingController::class, 'show']);
    Route::post('goals/{goal}/savings', [GoalSavingController::class, 'store']);
    Route::put('savings/{id}', [GoalSavingController::class, 'update']);
    Route::delete('savings/{id}', [GoalSavingController::class, 'destroy']);

    // TRANSACTIONS
    Route::get('transactions', [TransactionController::class, 'index']);
    Route::post('transactions', [TransactionController::class, 'store']);

    // BILLS & PAYMENTS 
    Route::get('bills', [BillController::class, 'index']);
    Route::post('bills', [BillController::class, 'store']);
    Route::patch('bills/{id}/status', [BillController::class, 'updateStatus']);

    // NOTIFICATIONS 
    Route::get('notifications', [NotificationController::class, 'index']);
    Route::post('notifications', [NotificationController::class, 'store']);
    Route::patch('notifications/{id}/read', [NotificationController::class, 'markAsRead']);

    Route::post('/logout', [AuthController::class, 'logout']);

});