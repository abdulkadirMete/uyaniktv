<?php

function prepareChannelGuide()

{
    if (file_exists(public_path('/data/tvguide.json'))) {
        $json = file_get_contents(public_path('/data/tvguide.json'));
        error_log('work1');
        return json_decode($json, true);
    } else {
        error_log('work2');
        $xmlfile = file_get_contents(public_path('/data/tvguide.xml'));
        $xmlObject = simplexml_load_string($xmlfile);
        $json = json_encode($xmlObject);
        // storage as json
        file_put_contents(public_path('/data/tvguide.json'), $json);
        return json_decode($json, true);
    }
}
