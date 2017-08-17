<?php
$addressId = $_GET["addressId"];

$conn = new mysqli("localhost","root","vac19930307","shop");
if($conn->connect_error){
    die("Connect fail:"+$conn->connect_error);
}
$sql  = "DELETE from address WHERE addressId='".$addressId."'";
if($conn->query($sql)){
    echo "success";
}else{
    echo "fail";
}



 ?>
