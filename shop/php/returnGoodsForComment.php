<?php
include 'ChromePhp.php';
$goodsId = $_GET["query"];

$conn = new mysqli("localhost","root","vac19930307","shop");
if($conn->connect_error){
    die("fail connect:".$conn->connect_error);
}

$sql = "SELECT goodsName,goodsPrice,goodsDescript,goodsPicture200x200,
        color,network FROM goods where goodsId = '".$goodsId."'";
$result = $conn->query($sql);
if($result->num_rows == 1){
    $row = $result->fetch_assoc();
    $goodsName = $row["goodsName"];
    $goodsPrice = $row["goodsPrice"];
    $goodsDescript = $row["goodsDescript"];
    $p200 = $row["goodsPicture200x200"];
    $commenumber = $row["commenumber"];
    $color = $row["color"];
    $network = $row["network"];
}

$conn->close();
// <goodsdetail>
//    <name></name>
//    <price></price>
//    <descript></descript>
//    <p50i1><p50i1>
//    ...

//    ...
//    <commenumber></commenumber>
//    <color></color>
//    <netword></network>
//    ...
// </goodsdetail>
$dom = new DomDocument("1.0","utf-8");
$root = $dom->createElement("goodsdetail");
$dom->appendchild($root);

createNode($dom,$root,"name",$goodsName);
createNode($dom,$root,"price",$goodsPrice);
createNode($dom,$root,"descript",$goodsDescript);
createNode($dom,$root,"p200",$p200);
createNode($dom,$root,"color",$color);
createNode($dom,$root,"network",$network);

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
