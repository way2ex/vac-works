<?php
include 'ChromePhp.php';

$conn = new mysqli("localhost","root","vac19930307","shop");

//check the connect state
if($conn->connect_error){
  echo "Connect error!Please try again";
  die("Fail connect:".$conn->connect_error);
}

// 用于存储数据库查询的结果
//$goods = Array();
//直接生成xml文件
$dom = new DomDocument("1.0","utf-8");
$node_goods = $dom->createElement("goods");
$dom->appendchild($node_goods);

$sql = "SELECT goodsId,goodsName,network,color,goodsPicture200x200,goodsPrice FROM goods";
$result = $conn->query($sql);
if($result->num_rows > 0){
  while($row = $result->fetch_assoc()){
    // $goods[]["goodsId"] = $row["goodsId"];
    // $goods[]["goodsName"] = $row["goodsName"];
    // $goods[]["network"] = $row["network"];
    // $goods[]["color"] = $row["color"];
    //
    $node_good = $dom->createElement("good");
    $node_goods->appendchild($node_good);
    //
     $node_goodsId = $dom->createElement("id");
     $node_goodsIdValue = $dom->createTextNode($row["goodsId"]);
     $node_goodsId->appendchild($node_goodsIdValue);
     $node_good->appendchild($node_goodsId);
    //
    $node_goodsName = $dom->createElement("name");
    $node_goodsNameValue = $dom->createTextNode($row["goodsName"]);
    $node_goodsName->appendchild($node_goodsNameValue);
    $node_good->appendchild($node_goodsName);
    //
    $node_network = $dom->createElement("network");
    $node_networkValue = $dom->createTextNode($row["network"]);
    $node_network->appendchild($node_networkValue);
    $node_good->appendchild($node_network);
    //
    $node_color =  $dom->createElement("color");
    $node_colorValue = $dom->createTextNode($row["color"]);
    $node_color->appendchild($node_colorValue);
    $node_good->appendchild($node_color);

     $node_photo200x200 = $dom->createElement("photo200x200");
     $node_photo200x200Value = $dom->createTextNode($row["goodsPicture200x200"]);
    $node_photo200x200->appendchild($node_photo200x200Value);
    $node_good->appendchild($node_photo200x200);
    //
     $node_price = $dom->createElement("price");
     $node_priceValue = $dom->createTextNode($row["goodsPrice"]);
     $node_price->appendchild($node_priceValue);
     $node_good->appendchild($node_price);

  }
}
$conn->close();
header("Content-type:text/xml");
echo $dom->saveXML();
?>
