<?php
include 'ChromePhp.php';
include 'config.php';
$username = $_POST["username"];
$realname = $_POST["realname"];
$sex  = $_POST["sex"];
$year = $_POST["year"];
$month = $_POST["month"];
$day = $_POST["day"];
$account = $_POST["account"];
ChromePhp::log($username."-".$realname."-".$sex."-".$year."-".$month."-".$day);

$date = $year."-".$month."-".$day;

$conn =mysqli_connect($database_host,$database_user,$database_password,$database_name);
if(mysqli_connect_errno()){
    //die("Fail to connect:".mysqli_connect_error());
    ChromePhp::log("fail");
}
$sql = "UPDATE member SET username='".$username."',realname='".$realname."',
        sex='".$sex."',birthday='".$date."' WHERE account='".$account."'";
mysqli_query($conn,$sql);
ChromePhp::log($sql);
mysqli_close($conn);

?>
