<?php
include 'ChromePhp.php';
$state = "fail";
$orderscode = $_GET["orderscode"];
// if($orderscode){
//     echo "success";
// }
$conn = new mysqli("localhost","root","vac19930307","shop");
if($conn->connect_error){
    die("Fail to connect:".$conn->connect_error);
}
$sql = "DELETE FROM orders WHERE orderscode='".$orderscode."'";
if($conn->query($sql)){
    $state = "success";
}
$conn->close();
echo $state;
?>
