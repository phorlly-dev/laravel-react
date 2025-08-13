<?php
namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class Homecontroller extends Controller
{
    public function userList(): Response
    {
        return Inertia::render('users/index');
    }

    public function customerList(): Response
    {
        return Inertia::render('customers/index');
    }
}
