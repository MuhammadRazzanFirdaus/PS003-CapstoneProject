<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{

    public function register(RegisterRequest $request): JsonResponse
    {

        $validated = $request->validated();

        $user = User::create([

            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),

        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([

            'status' => 'success',
            'message' => 'Registrasi berhasil',
            'data' => [
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {

        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response()->json([

                'status' => 'error',
                'message' => 'Email atau password salah',
            ], 401);
        }

        $user = User::where('email', $credentials['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([

            'status' => 'success',
            'message' => 'Login berhasil',
            'data' => [
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]
        ], 200);
    }

    public function logout(Request $request): JsonResponse
    {

        $request->user()->currentAccessToken()->delete();

        return response()->json([

            'status' => 'success',
            'message' => 'Logout berhasil'
        ], 200);
    }
}