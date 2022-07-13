<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ChannelController extends Controller

{
    public function getAllChannels()
    {
        $channels = DB::select('select * from channels');
        return response($channels);
    }

    public function getSingleChannel(Request $request)
    {

        $channel = DB::select('select * from channels where id = ?', [$request->id]);
        return response($channel);
    }
}
