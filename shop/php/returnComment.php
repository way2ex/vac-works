<?php
include 'ChromePhp.php';
include 'config.php';
$goodsId = $_GET["goodsId"];

$conn = new mysqli($database_host,$database_user,$database_password,$database_name);
if($conn->connect_error){
    die("Fail to connect:"+$conn->connect_error);
}

$sql = "SELECT username,commenttext,createTime,stargrade,membergrade FROM comments WHERE goodsId='".$goodsId."'";
$result = $conn->query($sql);

if($result->num_rows > 0){
    $dom = new DOMDocument("1.0","utf-8");
    $root = $dom->createElement("comments");
    $dom->appendchild($root);
    while ($row = $result->fetch_assoc()) {
        $commentNode = $dom->createElement("comment");
        createNode($dom,$commentNode,"username",$row["username"]);
        createNode($dom,$commentNode,"commenttext",$row["commenttext"]);
        createNode($dom,$commentNode,"createTime",$row["createTime"]);
        createNode($dom,$commentNode,"stargrade",$row["stargrade"]);
        createNode($dom,$commentNode,"membergrade",$row["membergrade"]);
        $root->appendchild($commentNode);
    }
}
$conn->close();
header("Content-type:text/xml");
echo $dom->saveXML();


//declare a function that can create the node with a proper value ,then
//append the node to the parent node
function createNode($dom,$parentNode,$nodeName,$nodeValue){
    $node = $dom->createElement($nodeName);
    $parentNode->appendchild($node);
    $nodeText = $dom->createTextNode($nodeValue);
    $node->appendchild($nodeText);
}
?>
