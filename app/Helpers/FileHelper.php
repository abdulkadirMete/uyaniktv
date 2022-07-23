<?php

function prepareChannelGuide()

{
    if (file_exists(public_path('/data/tvguide.json'))) {
        $json = file_get_contents(public_path('/data/tvguide.json'));
        return json_decode($json, true);
    }
}
