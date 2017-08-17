<?php
session_start();
include 'ChromePhp.php';
$account = $_SESSION["account"];
$province = $_POST["province"];
$city = $_POST["city"];
$dist = $_POST["dist"];
$town = $_POST["town"];
$street = $_POST["street"];
$realname = $_POST["realName"];
$phone = $_POST["phone"];
$defaultAddress = "false";

$conn = new mysqli("localhost","root","vac19930307","shop");
if($conn->connect_error){
    die("Connect fail:"+$conn->connect_error);
}
$sql  = "INSERT INTO address(account,province,city,dist,town,street,realName,
        phone,defaultAddress) VALUES('".$account."','".$province."',
        '".$city."','".$dist."','".$town."','".$street."','".$realname."',
        '".$phone."','".$defaultAddress."')";
if($conn->query($sql)){
    echo "success";
}else{
    echo "fail";
}
 ?>
