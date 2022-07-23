<?php


$download_url = "https://ovhde0.uyanik.tv/android/conf/tvguide.zip";
$delete = true;


$file = "file.zip";
$script = basename($_SERVER['PHP_SELF']);

// download the file 
file_put_contents($file, fopen($download_url, 'r'));

// extract file content 
$path = pathinfo(realpath($file), PATHINFO_DIRNAME);

$zip = new ZipArchive;
$res = $zip->open($file);

if ($res) {
	$zip->extractTo($path);
	$zip->close();
	// convert json
	$xmlfile = file_get_contents('tvguide.xml');
	$xmlObject = simplexml_load_string($xmlfile);
	$json = json_encode($xmlObject);
	// storage as json
	file_put_contents('tvguide.json', $json);


	echo "<strong>$file</strong> extracted to <strong>$path</strong><br>";
	if ($delete) {
		unlink($file);
	} else {
		echo "remember to delete <strong>$file</strong> & <strong>$script</strong>!";
	}
} else {
	echo "Couldn't open $file";
}
