<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

abstract class Controller
{
    // added 7/24/2026 to allow my controller to use authorization methods
    use AuthorizesRequests;
}
