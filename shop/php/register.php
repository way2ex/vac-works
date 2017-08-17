<?php
include 'ChromePhp.php';
 $account = $_POST["account"];
 $password = $_POST["password"];
$username = '游客';
//ChromePhp::log("1");


$servername = "localhost";
$mysql_username = "root";
$mysql_password = "vac19930307" ;
$mysql_dbname = "shop";

//create the connection
$conn = new mysqli($servername,$mysql_username,$mysql_password,$mysql_dbname);
//check the connection
if($conn->connect_error){
  echo "Connect error!Please try again.";
  die("Fail connnect：".$conn->connect_error);
}
//创建一个xml文件，用于返回数据
$register_state;

$sql2 = "SELECT * FROM member WHERE account='".$account."'";
$result = $conn->query($sql2);
if($result->num_rows > 0){
    $register_state = "repeat";
}else{
    //向数据库中插入用户信息，
    //用户名：geust
    //hasPhoto : 0;
    //photo：
    //membergrade : 青铜会员
    $sql = "INSERT INTO member(account,password,username,tel,address,photo,".
            "realname,sex,birthday,membergrade,hasphoto) values('".
            $account."','".$password."','".$username."','null','null','user_photo/user_default.jpg',".
            "null,'secret','2016-01-01','英勇黄铜',1".
            ")";
    if($conn->query($sql) === TRUE){
      $register_state = "success";
      //echo "success";
    }else{
      $register_state = "fail";
    }
}

$conn->close();
$dom = new DomDocument('1.0','utf-8');
$register = $dom->createElement("register");
$dom->appendchild($register);
$state = $dom->createTextNode($register_state);
$register->appendchild($state);
header("Content-type:text/xml");
echo $dom->saveXML();
?>
