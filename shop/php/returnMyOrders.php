<?php
session_start();
include 'ChromePhp.php';
// ChromePhp::log("enter the page");
$account=$_SESSION["account"];
// ChromePhp::log($account);
$conn = new mysqli("localhost","root","vac19930307","shop");
// ChromePhp::log("database connect created");
if($conn->connect_error){
    die("Fail connect:".$conn->connect_error);
}
// ChromePhp::log("connect success");
$sql = "SELECT orderTime,orderscode,goodsName,goodsCount,total,goodsId,realName,memberId
        from realorders where account='".$account."'";
// ChromePhp::log($sql);
$result = $conn->query($sql);
if($result->num_rows > 0){
    //<goods>
    //  <item>
    //      <orderscode>
    //      </orderscode>
    //  </item>
    //   <item>
    //      <orderscode>
    //      </orderscode>
    //  </item>
    //</goods>
    $dom = new DomDocument("1.0","utf-8");
    $root_goods = $dom->createElement("goods");
    $dom->appendchild($root_goods);
    while($row = $result->fetch_assoc()){
        $node_item = $dom->createElement("item");
        $root_goods->appendchild($node_item);
        createNode($dom,$node_item,"memberId",$row["memberId"]);
        createNode($dom,$node_item,"realName",$row["realName"]);
        createNode($dom,$node_item,"goodsId",$row["goodsId"]);
        createNode($dom,$node_item,"orderscode",$row["orderscode"]);
        createNode($dom,$node_item,"orderTime",$row["orderTime"]);
        createNode($dom,$node_item,"goodsName",$row["goodsName"]);
        createNode($dom,$node_item,"goodsCount",$row["goodsCount"]);
        createNode($dom,$node_item,"total",$row["total"]);
        $sql_goods = "SELECT goodsPicture200x200,network,color from goods where
                        goodsId='".$row["goodsId"]."'";
        // ChromePhp::log($sql_goods);
        $result_goods = $conn->query($sql_goods);
        if($result_goods->num_rows > 0){
            $row_goods = $result_goods->fetch_assoc();
            createNode($dom,$node_item,"network",$row_goods["network"]);
            createNode($dom,$node_item,"color",$row_goods["color"]);
            createNode($dom,$node_item,"p200",$row_goods["goodsPicture200x200"]);
        }
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
