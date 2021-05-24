<?php
$access_key='2b4db130b2c714459777e30a7ee98995';
$curl= curl_init();
$country=$_GET['country'];
curl_setopt($curl, CURLOPT_URL, "http://api.positionstack.com/v1/forward?access_key=".$access_key."&query=".$_GET['country']."&country_module=1");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$result= curl_exec($curl);
curl_close($curl);
echo $result;
?>
