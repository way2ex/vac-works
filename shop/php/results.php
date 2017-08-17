<?php
include 'ChromePhp.php';
//read the xml file into the $dom
$keyword = $_POST["keyword"];
$para_sort = $_POST["sort"];
$para_price = $_POST["price"];
$para_network = $_POST["network"];

//ChromePhp::log($keyword."-".$para_sort."-".$para_price."-".$para_network);
switch($para_price){
    case "全部":
      $minPrice=0;
      $maxPrice=100000;
      break;
    case "0-999":
      $minPrice=0;
      $maxPrice=999;
      break;
    case "1000-1499":
      $minPrice=1000;
      $maxPrice=1499;
      break;
    case "1500-1999":
      $minPrice=1500;
      $maxPrice=1999;
      break;
    case "2000-2999":
      $minPrice=2000;
      $maxPrice=2999;
      break;
    case "3000-4999":
      $minPrice=3000;
      $maxPrice=4999;
      break;
    case "5000+":
      $minPrice=5000;
      $maxPrice=99999;
      break;
}
//alter the sql_condition according to the string
if($para_network == "全部"){
  $network_condition = "";
}else{
  $network_condition = " and network='".$para_network."'";
}
if($para_sort == "全部"){
    $sort_condition = "";
}else{
    $sort_condition = " and sortName like '%".$para_sort."%'";
}
// according to the param to select the goods from database
//
//$keyword = "华为";
//create a xml file to transport to the front page
//<items></items>
$dom_items = new DomDocument("1.0","utf-8");
$node_items = $dom_items->createElement("items");
$dom_items->appendchild($node_items);

$conn = new mysqli("localhost","root","vac19930307","shop");
// $conn->
if($conn->connect_error){
  die("fail connect:".$conn->connect_error);
}

$sql = "SELECT goodsId,goodsPicture200x200,goodsPrice,goodsName,commenumber,network,
        color FROM goods where goodsName like '%".$keyword."%' and goodsPrice > ".$minPrice." and
        goodsPrice < ".$maxPrice.$network_condition.$sort_condition;
// ChromePhp::log($sql);
$result = $conn->query($sql);
if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $goodsId = $row["goodsId"];
        $goodsP200x200 = $row["goodsPicture200x200"];
        $goodsPrice = $row["goodsPrice"];
        $goodsName = $row["goodsName"];
        $commenumber = $row["commenumber"];
        $network = $row["network"];
        $color = $row["color"];

        $fullName = $goodsName." ".$network." ".$color;

        $node_item = $dom_items->createElement("item");

        $node_name = $dom_items->createElement("name");
        $node_nameText = $dom_items->createTextNode($fullName);
        $node_name->appendchild($node_nameText);
        $node_item->appendchild($node_name);

        $node_price = $dom_items->createElement("price");
        $node_priceText = $dom_items->createTextNode($goodsPrice);
        $node_price->appendchild($node_priceText);
        $node_item->appendchild($node_price);

        $node_commenumber = $dom_items->createElement("number");
        $node_commenumberText = $dom_items->createTextNode($commenumber);
        $node_commenumber->appendchild($node_commenumberText);
        $node_item->appendchild($node_commenumber);

        $node_p200 = $dom_items->createElement("p200");
        $node_p200Text = $dom_items->createTextNode($goodsP200x200);
        $node_p200->appendchild($node_p200Text);
        $node_item->appendchild($node_p200);

        $node_id = $dom_items->createElement("id");
        $node_idText = $dom_items->createTextNode($goodsId);
        $node_id->appendchild($node_idText);
        $node_item->appendchild($node_id);

        $node_items->appendchild($node_item);
    }
}

$conn->close();

header("Content-type:text/xml");
echo $dom_items->saveXML();
?>
