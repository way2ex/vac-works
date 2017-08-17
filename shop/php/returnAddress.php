<?php
session_start();
include 'ChromePhp.php';
$account = $_SESSION["account"];
$username = $_SESSION["username"];
//ChromePhp::log($username);

$dom = new DomDocument("1.0","utf-8");
$root_address = $dom->createElement("address");
$dom->appendchild($root_address);
// ChromePhp::log("dom");
$conn = new mysqli("localhost","root","vac19930307","shop");
if($conn->connect_error){ChromePhp::log("error");
    die("Fail to connect:".$conn->connect_error);
}
$sql = "SELECT * FROM address where account = '".$account."'";

$result = $conn->query($sql);
if($result->num_rows > 0){
    while ($row = $result->fetch_assoc()) {
        $node_item = $dom->createElement("item");
        $root_address->appendchild($node_item);
        createNode($dom,$node_item,"addressId",$row["addressId"]);
        createNode($dom,$node_item,"realName",$row["realName"]);
        createNode($dom,$node_item,"province",$row["province"]);
        createNode($dom,$node_item,"city",$row["city"]);
        createNode($dom,$node_item,"dist",$row["dist"]);
        createNode($dom,$node_item,"town",$row["town"]);
        createNode($dom,$node_item,"street",$row["street"]);
        createNode($dom,$node_item,"phone",$row["phone"]);
        createNode($dom,$node_item,"username",$username);
        createNode($dom,$node_item,"defaultAddress",$row["defaultAddress"]);
    }
    header("Content-type:text/xml");
    echo $dom->saveXML();
}else{
    echo $dom->saveXML();
}
$conn->close();


//declare a function that can create the node with a proper value ,then
//append the node to the parent node
function createNode($dom,$parentNode,$nodeName,$nodeValue){
    $node = $dom->createElement($nodeName);
    $parentNode->appendchild($node);
    $nodeText = $dom->createTextNode($nodeValue);
    $node->appendchild($nodeText);
}

?>
