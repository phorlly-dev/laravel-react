<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of customers.
     */
    public function index(Request $request)
    {
        
        return   $this->api(
            model: Customer::class,
            sort_order: 'desc',
            search: $request->input('search'),
            search_fields: ['name', 'company', 'country.name', 'representative.name'],
            with: ['country', 'representative'],
            per_page: $request->input('per_page', 10) // make sure per_page works
        );
    }

    /**
     * Display the specified customer.
     */
    public function show(Customer $customer): CustomerResource
    {
        $customer->load(['country', 'representative']);

        return new CustomerResource($customer);
    }

    /**
     * Store a newly created customer.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'              => 'required|string|max:255',
            'country_id'        => 'required|exists:countries,id',
            'company'           => 'required|string|max:255',
            'date'              => 'required|date',
            'status'            => 'required|in:qualified,unqualified,new,negotiation,renewal,proposal',
            'verified'          => 'boolean',
            'activity'          => 'required|integer|min:1|max:100',
            'representative_id' => 'required|exists:representatives,id',
            'balance'           => 'required|numeric|min:0',
        ]);

        $customer = Customer::create($validated);
        $customer->load(['country', 'representative']);

        return response()->json([
            'message' => 'Customer created successfully',
            'data'    => new CustomerResource($customer),
        ], 201);
    }

    /**
     * Update the specified customer.
     */
    public function update(Request $request, Customer $customer): JsonResponse
    {
        $validated = $request->validate([
            'name'              => 'sometimes|string|max:255',
            'country_id'        => 'sometimes|exists:countries,id',
            'company'           => 'sometimes|string|max:255',
            'date'              => 'sometimes|date',
            'status'            => 'sometimes|in:qualified,unqualified,new,negotiation,renewal,proposal',
            'verified'          => 'sometimes|boolean',
            'activity'          => 'sometimes|integer|min:1|max:100',
            'representative_id' => 'sometimes|exists:representatives,id',
            'balance'           => 'sometimes|numeric|min:0',
        ]);

        $customer->update($validated);
        $customer->load(['country', 'representative']);

        return response()->json([
            'message' => 'Customer updated successfully',
            'data'    => new CustomerResource($customer),
        ]);
    }

    /**
     * Remove the specified customer.
     */
    public function destroy(Customer $customer): JsonResponse
    {
        $customer->delete();

        return response()->json([
            'message' => 'Customer deleted successfully',
        ], 204);
    }

    /**
     * Get customers statistics.
     */
    public function statistics(): JsonResponse
    {
        $stats = [
            'total_customers'      => Customer::count(),
            'verified_customers'   => Customer::where('verified', true)->count(),
            'unverified_customers' => Customer::where('verified', false)->count(),
            'by_status'            => Customer::select('status')
                ->selectRaw('count(*) as count')
                ->groupBy('status')
                ->get()
                ->pluck('count', 'status'),
            'total_balance'        => Customer::sum('balance'),
            'average_balance'      => Customer::avg('balance'),
            'top_representatives'  => Customer::with('representative')
                ->select('representative_id')
                ->selectRaw('count(*) as customer_count')
                ->groupBy('representative_id')
                ->orderByDesc('customer_count')
                ->limit(5)
                ->get()
                ->map(function ($item) {
                    return [
                        'representative' => $item->representative->name,
                        'customer_count' => $item->customer_count,
                    ];
                }),
        ];

        return response()->json([
            'message' => 'Customer statistics retrieved successfully',
            'data'    => $stats,
        ]);
    }
}
