<?php
namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;

abstract class Controller extends BaseController
{
    public function meta($paginator): array
    {
        return [
            'current_page' => $paginator->currentPage(),
            'last_page'    => $paginator->lastPage(),
            'per_page'     => $paginator->perPage(),
            'total'        => $paginator->total(),
        ];
    }

    public function links($paginator): array
    {
        return [
            'next' => $paginator->nextPageUrl(),
            'prev' => $paginator->previousPageUrl(),
        ];
    }

    public function api(
        $model,
        int $per_page = 10,
        array $filters = [],
        string $sort_by = 'id',
        string $sort_order = 'asc',
        $search = null,
        array $search_fields = [],
        array $with = []// 👈 NEW for relationships
    ) {
        // Start query with relationships if provided
        $query = $model::with($with);

        // Apply filters (exact matches)
        foreach ($filters as $field => $value) {
            if (! is_null($value)) {
                $query->where($field, $value);
            }
        }

        // Apply search across multiple fields
        if ($search && count($search_fields) > 0) {
            $query->where(function ($q) use ($search, $search_fields) {
                foreach ($search_fields as $field) {
                    $q->orWhere($field, 'LIKE', "%{$search}%");
                }
            });
        }

        // Apply sorting
        $query->orderBy($sort_by, $sort_order);

        // Return paginated results
        return $query->paginate($per_page);
    }
}
