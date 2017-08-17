<?php
session_start();
include 'ChromePhp.php';
ChromePhp::log("enter");
include 'config.php';
$account = $_SESSION["account"];
if($account != null){
ChromePhp::log($account);
$addressId = $_POST["addressId"];
$province = $_POST["province"];
$city = $_POST["city"];
$dist = $_POST["dist"];
$town = $_POST["town"];
$street = $_POST["street"];
$realName = $_POST["realName"];
$phone = $_POST["phone"];

ChromePhp::log($addressId);
$conn = new mysqli($database_host,$database_user,$database_password,$database_name);
if($conn->connect_error){
    die("Fail to connect:".$conn->connect_error);
}

$sql = "UPDATE address SET province='".$province."',city='".$city."',dist='".$dist."',town='".$town."'
        ,street='".$street."',realName='".$realName."',phone='".$phone."' WHERE addressId='".$addressId."'";

if($conn->query($sql)){
    $state = "success";

}else {
    $state = "fail";
}
$conn->close();
echo $state;
}else{

}
?>
