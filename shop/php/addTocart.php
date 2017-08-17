<?php
session_start();
include 'ChromePhp.php';
// ChromePhp::log("enter the page");
date_default_timezone_set('PRC'); //设置本地时区
$currentTime = date("Y-m-d H:m:s");
// ChromePhp::log("now is ".$currentTime);
//进入该页面，默认已经登陆，若没有登陆，返回响应的xml
$goodsName = $_POST["name"];
$color = $_POST["color"];
$network = $_POST["network"];
$goodsCount = $_POST["count"];
$loginState = "";
$error = "";
// ChromePhp::log("get the data ".$goodsName);
//when you want to add a record into the table orders,you should provide these parameters:
//orderId:this is the auto_increment char
//orderscode: this is generated with time+memberId+goodsId
//memberId,user_account,username
//realName,address,tel:which can be null in this page,but you should complete these when you
// make a order
// goodsId,goodsName,goodsPrice,goodsCount,total,and state
if(isset($_SESSION["account"])){
     $loginState = "login";
    //  ChromePhp::log("now the account is ".$_SESSION["account"]);
    $account = $_SESSION["account"];
//
    $conn = new mysqli("localhost","root","vac19930307","shop");
    if($conn->connect_error){
        die("Fail connect:".$conn->connect_error);
    }
    //  ChromePhp::log("now create the connection with the database");
// //
    $sql_user = "SELECT memberId,username,realname,address,tel FROM member
                where account = '".$account."'";

    $result_user = $conn->query($sql_user);

    $sql_goods = "SELECT goodsId,goodsPrice from goods where goodsName='".$goodsName."' and
                 network = '".$network."' and color='".$color."'";
    $result_goods = $conn->query($sql_goods);
    $rows_goods = $result_goods->num_rows;
    $rows_user = $result_user->num_rows;
    // ChromePhp::log("goods rows is ".$rows_goods);
    // ChromePhp::log("user rows is ".$rows_user);

    if($rows_goods>0 && $rows_user>0){
//
        //    ChromePhp::log("now get the rows from the database");
        $row_user = $result_user->fetch_assoc();
        $memberId = $row_user["memberId"];
        $username = $row_user["username"];
        $realname = $row_user["realname"];
        $address = $row_user["address"];
        $tel = $row_user["tel"];

        $row_goods = $result_goods->fetch_assoc();
        $goodsId = $row_goods["goodsId"];
        $goodsPrice = $row_goods["goodsPrice"];
        //now get the user information,then generate the orderscode
        $orderscode = time().$memberId.$goodsId;
        $total = $goodsCount * $goodsPrice;
        $state = "已下单";
        $sql_insertToorder = "INSERT INTO orders(orderscode,orderTime,account,
                            memberId,realName,address,tel,goodsId,goodsName,goodsPrice,
                        goodscount,total,state) VALUES ('".$orderscode."','".$currentTime."',
                        '".$account."','".$memberId."','".$$realname."','".$$address."',
                        '".$tel."','".$goodsId."','".$goodsName."','".$goodsPrice."','".$goodsCount."',
                        '".$total."','".$state."')";
        if($conn->query($sql_insertToorder) === true){
            $resultOfadd = "成功加入购物车";
        }else{
            $resultOfadd = "加入购物车失败，请稍后再试！";
        }
    }else{
        $error = "Failed to find the user or the goods";
    }
// //
     $conn->close();
}else{
     $loginState = "nologin";
}

$dom = new DomDocument("1.0","utf-8");
$root_result = $dom->createElement("result");
$dom->appendchild($root_result);

createNode($dom,$root_result,"login_state",$loginState);
createNode($dom,$root_result,"error",$error);
createNode($dom,$root_result,"resultOfadd",$resultOfadd);

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
