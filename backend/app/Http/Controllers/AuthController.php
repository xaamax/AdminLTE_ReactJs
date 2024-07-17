<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;


class AuthController extends Controller
{
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function register(Request $request){
        try {
            $request->validate($this->user->rules(), $this->user->feedback());
            $user = $this->user->create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password,
            ]);
            return response()->json($user, 201);
        } catch (\Exception $e) {
            return response()->json(['Message' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(["error" => "E-mail/Senha inválidos."], 401);
        }
        return $this->respondWithToken($token, auth('api')->user());
    }

    protected function respondWithToken($token, $user)
    {
        if ($user) {
            $response['token'] = $token;
            foreach (json_decode($user) as $key => $val) {
                $response[$key] = $val;
            }
        } else {
            $response = [
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth('api')->factory()->getTTL() * 1440
            ];
        }
        return response()->json($response);
    }

    public function validateToken(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if (!$user) {
                return response()->json(['status' => 'Token is invalid'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['status' => 'Token is invalid', 'error' => $e->getMessage()], 401);
        }

        return response()->json(['status' => 'Token is valid'], 200);
    }

    public function me()
    {
        return response()->json(auth('api')->user());
    }

    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'Successfully logged out.']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh(), null);
    }
}
