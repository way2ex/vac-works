<?php
include 'ChromePhp.php';
// $a["hello"] = "hello";
// $a[] = "hello2";
// $a[] = "hello";
// $a[] = "red";
// $a["red"] = "red";
// $a[] = "green";
// $a["green"] = "green";
// $a["green2"] = "green";
//
// foreach($a as $aa){
// 	echo $aa."=>";
// }
// echo "</br>";
// $a2 = array_unique($a);
// foreach($a2 as $aa){
// 	echo $aa."=>";
// }
// echo "</br>";
// echo $a2["green"];
// echo "</br>";
// echo $a2["green2"];

// $he = myfunction("hello");
// echo $he;
// function myfunction($string){
// 		return $string;
// }
// $dom = new DomDocument("1.0","utf-8");
// $root = $dom->createElement("root");
// $dom->appendchild($root);
//
// createNode($dom,$root,"name","hello");
// header("Content-type:text/xml");
// echo $dom->saveXML();
// function createNode($dom,$root,$nodeName,$nodeValue){
//     $node = $dom->createElement($nodeName);
//     $nodeValue = $dom->createTextNode($nodeValue);
//     $node->appendchild($nodeValue);
//     $root->appendchild($node);
// }
// **********get the time*********
// echo date("Y-m-d h:m:s",localtime());
date_default_timezone_set('PRC'); //设置本地时区
echo date("Y-m-d H:m:s");
 ?>
