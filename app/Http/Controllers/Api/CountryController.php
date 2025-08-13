<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CountryResource;
use App\Models\Country;
use Illuminate\Http\JsonResponse;

class CountryController extends Controller
{
    /**
     * Display a listing of countries.
     */
    public function index(): JsonResponse
    {
        $countries = Country::all();

        return response()->json([
            'message' => 'Countries retrieved successfully',
            'data'    => CountryResource::collection($countries),
        ]);
    }

    /**
     * Display the specified country.
     */
    public function show(Country $country): JsonResponse
    {
        return response()->json([
            'message' => 'Country retrieved successfully',
            'data'    => new CountryResource($country),
        ]);
    }
}
