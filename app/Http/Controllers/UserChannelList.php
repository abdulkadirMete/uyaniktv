<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;



class UserChannelList extends Controller
{
    public function getUserChannelList(Request $request)
    {
        // $user = Auth::user();
        // $favoriteChannels = DB::select('select * from channels where id in ?', $user['channelList']);
        // return response($favoriteChannels);
    }

    public function addFavorite(Request $request)
    {
    }
}
