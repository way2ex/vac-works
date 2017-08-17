<?php
include 'ChromePhp.php';
$goodsId = $_GET["query"];

$conn = new mysqli("localhost","root","vac19930307","shop");
if($conn->connect_error){
    die("fail connect:".$conn->connect_error);
}

$sql = "SELECT goodsName,goodsPrice,goodsDescript,goodsPicture50x50i1,goodsPicture50x50i2,
        goodsPicture50x50i3,goodsPicture50x50i4,goodsPicture50x50i5,goodsPicture360x360i1,
        goodsPicture360x360i2,goodsPicture360x360i3,goodsPicture360x360i4,goodsPicture360x360i5,
        commenumber,color,network FROM goods where goodsId = '".$goodsId."'";
$result = $conn->query($sql);
if($result->num_rows == 1){
    $row = $result->fetch_assoc();
    $goodsName = $row["goodsName"];
    $goodsPrice = $row["goodsPrice"];
    $goodsDescript = $row["goodsDescript"];
    $goodsPicture50x50i1 = $row["goodsPicture50x50i1"];
    $goodsPicture50x50i2 = $row["goodsPicture50x50i2"];
    $goodsPicture50x50i3 = $row["goodsPicture50x50i3"];
    $goodsPicture50x50i4 = $row["goodsPicture50x50i4"];
    $goodsPicture50x50i5 = $row["goodsPicture50x50i5"];
    $goodsPicture360x360i1 = $row["goodsPicture360x360i1"];
    $goodsPicture360x360i2 = $row["goodsPicture360x360i2"];
    $goodsPicture360x360i3 = $row["goodsPicture360x360i3"];
    $goodsPicture360x360i4 = $row["goodsPicture360x360i4"];
    $goodsPicture360x360i5 = $row["goodsPicture360x360i5"];
    $commenumber = $row["commenumber"];
    $color = $row["color"];
    $network = $row["network"];
}

//query all the colors and the networks according to the goodsName
$sql2 = "SELECT color,network from goods where goodsName = '".$goodsName."'";
$result2 = $conn->query($sql2);
if($result2->num_rows > 0){
    while($row2 = $result2->fetch_assoc()){
        $colors[] = $row2["color"];
        $networks[] = $row2["network"];
    }
    $colors = array_unique($colors);
    $networks = array_unique($networks);
}

$conn->close();
// <goodsdetail>
//    <name></name>
//    <price></price>
//    <descript></descript>
//    <p50i1><p50i1>
//    ...
//    <p360i1><p360i1>
//    ...
//    <commenumber></commenumber>
//    <color></color>
//    <netword></network>
//    <color_array></color_array>
//    ...
//    <network_array></network_array>
//    ...
// </goodsdetail>
$dom = new DomDocument("1.0","utf-8");
$root = $dom->createElement("goodsdetail");
$dom->appendchild($root);

createNode($dom,$root,"name",$goodsName);
createNode($dom,$root,"price",$goodsPrice);
createNode($dom,$root,"descript",$goodsDescript);
createNode($dom,$root,"p50",$goodsPicture50x50i1);
createNode($dom,$root,"p50",$goodsPicture50x50i2);
createNode($dom,$root,"p50",$goodsPicture50x50i3);
createNode($dom,$root,"p50",$goodsPicture50x50i4);
createNode($dom,$root,"p50",$goodsPicture50x50i5);
createNode($dom,$root,"p50",$goodsPicture50x50i1);
createNode($dom,$root,"p50",$goodsPicture50x50i2);
createNode($dom,$root,"p50",$goodsPicture50x50i3);
createNode($dom,$root,"p360",$goodsPicture360x360i1);
createNode($dom,$root,"p360",$goodsPicture360x360i2);
createNode($dom,$root,"p360",$goodsPicture360x360i3);
createNode($dom,$root,"p360",$goodsPicture360x360i4);
createNode($dom,$root,"p360",$goodsPicture360x360i5);
createNode($dom,$root,"p360",$goodsPicture360x360i1);
createNode($dom,$root,"p360",$goodsPicture360x360i2);
createNode($dom,$root,"p360",$goodsPicture360x360i3);
createNode($dom,$root,"commenumber",$commenumber);
createNode($dom,$root,"color",$color);
createNode($dom,$root,"network",$network);
foreach($colors as $color){
    createNode($dom,$root,"color_array",$color);
}
foreach($networks as $network){
    createNode($dom,$root,"network_array",$network);
}
//ChromePhp::log($goodsId);
header("Content-type:text/xml");
echo $dom->saveXML();
//declare a function that can create the node with a proper value ,then
//append the node to the parent node
function createNode($dom,$rootNode,$nodeName,$nodeValue){
    $node = $dom->createElement($nodeName);
    $nodeValue = $dom->createTextNode($nodeValue);
    $node->appendchild($nodeValue);
    $rootNode->appendchild($node);
}
?>
