<?php 

use App\Http\Controllers\Api\GoalController;
use App\Http\Controllers\Api\GoalSavingController;
use Illuminate\Support\Facades\Route;

//gols
Route::apiResource('goals', GoalController::class);

// goals saving
Route::get('savings/{id}', [GoalSavingController::class, 'show']);          
Route::post('goals/{goal}/savings', [GoalSavingController::class, 'store']); 
Route::put('savings/{id}', [GoalSavingController::class, 'update']);        
Route::delete('savings/{id}', [GoalSavingController::class, 'destroy']);     