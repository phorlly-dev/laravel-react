<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RepresentativeResource;
use App\Models\Representative;
use Illuminate\Http\JsonResponse;

class RepresentativeController extends Controller
{
    /**
     * Display a listing of representatives.
     */
    public function index(): JsonResponse
    {
        $representatives = Representative::all();

        return response()->json([
            'message' => 'Representatives retrieved successfully',
            'data'    => RepresentativeResource::collection($representatives),
        ]);
    }

    /**
     * Display the specified representative.
     */
    public function show(Representative $representative): JsonResponse
    {
        return response()->json([
            'message' => 'Representative retrieved successfully',
            'data'    => new RepresentativeResource($representative),
        ]);
    }

    /**
     * Get customers for a specific representative.
     */
    public function customers(Representative $representative): JsonResponse
    {
        $customers = $representative->customers()->with(['country'])->get();

        return response()->json([
            'message' => 'Representative customers retrieved successfully',
            'data'    => [
                'representative' => new RepresentativeResource($representative),
                'customers'      => $customers,
            ],
        ]);
    }
}
