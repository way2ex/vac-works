<?php
include 'config.php';
include 'ChromePhp.php';
$state = "fail";
$goodsId = $_POST["goodsId"];
$memberId = $_POST["memberId"];
$starGrade = $_POST["starGrade"];
$comment = $_POST["comment"];
// ChromePhp::log($comment);
//
$conn = new mysqli($database_host,$database_user,$database_password,$database_name);
if($conn->connect_error){
    die("Connect fail "+connect_error);
}
$sql = "SELECT account,username,membergrade FROM member where memberId='".$memberId."'";
$result = $conn->query($sql);
if($result->num_rows>0){
    if($row = $result->fetch_assoc()){
        $account = $row["account"];
        $username = $row["username"];
        $membergrade = $row["membergrade"];
        // ChromePhp::log($username);
        $currentTime = date("Y-m-d H:m:s");
        $sql_insert = "INSERT INTO comments(goodsId,memberId,account,username,commenttext,createTime,
            stargrade,membergrade) VALUES ('".$goodsId."','".$memberId."','".$account."','".$username."',
            '".$comment."','".$currentTime."','".$starGrade."','".$membergrade."')";
        if($conn->query($sql_insert)){
            $state = "success";
        }
    }
}
echo $state;

?>
