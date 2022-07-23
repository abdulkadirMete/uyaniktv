<?php

namespace App\Http\Controllers;

use Error;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    // user channel list 
    public function getUserChannelList()
    {
        $user = Auth::user();
        $favoriteChannels = DB::select('select * from channels where id in ?', $user['channelList']);
        return response($favoriteChannels);
    }

    public function addUserChannelList()
    {
        return response([
            'success' => true
        ]);
    }

    public function getStreamList(Request $request)
    {

        $guideArray = prepareChannelGuide();

        if ($guideArray) {
            foreach ($guideArray['Channels']['Channel'] as $channel) {
                if ($channel['Name'] === $request->listKey) {
                    return response($channel);
                }
            }
        }

        return response(['success' => false]);
    }
}
