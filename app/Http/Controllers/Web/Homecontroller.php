<?php

namespace App\Http\Controllers\Web;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class Homecontroller extends Controller
{
    function userList(): Response
    {
        $query = User::query()->latest();
        $search = request('search');

        if ($search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        }

        $paginator = $query->paginate(9)->withQueryString();

        return Inertia::render('user', [
            'initial' => [
                'data' => UserResource::collection($paginator)->resolve(), // items
                'meta' => [
                    'current_page' => $paginator->currentPage(),
                    'last_page'    => $paginator->lastPage(),
                    'per_page'     => $paginator->perPage(),
                    'total'        => $paginator->total(),
                ],
                'links' => [
                    'next' => $paginator->nextPageUrl(),
                    'prev' => $paginator->previousPageUrl(),
                ],
                'search' => $search ?? '',
            ],
            'currentUserId' => Auth::id(),
        ]);
    }
}
