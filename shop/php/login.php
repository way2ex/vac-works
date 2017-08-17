<?php
include 'ChromePhp.php';
//start session
session_start();
$account = $_POST["account"];
$password = $_POST["password"];
$conn = new mysqli("localhost","root","vac19930307","shop");

//check the connection
if($conn->connect_error){
  echo "Connect error!Please try again.";
  die("Fail connect:".$conn->connect_error);
}
//save the state of login

$login_state;
//query the database ,use the account and password
$sql = "SELECT * FROM member WHERE account = '".$account."' and password = '".
        $password."'";
$result = $conn->query($sql);
if($result->num_rows > 0){
  if($row = $result->fetch_assoc()){
    $login_state = "success";
    //$user_account = $row["account"];
    //$user_username = $row["username"];
    //$user_photo = $row["photo"];
    $_SESSION["account"] = $row["account"];
    $_SESSION["username"] = $row["username"];
    $_SESSION["photo"] = $row["photo"];
  }
}else {
  $login_state = "fail";
}
$conn->close();

if($login_state == "fail"){
  echo "fail";
}else{
  echo "success";
}
//
// $dom = new DomDocument("1.0","utf-8");
// $user = $dom->createElement("user");
// $dom->appendchild($user);
//
// $state = $dom->createElement("state");
// $state_text = $dom->createTextNode($login_state);
// $state->appendchild($state_text);
// $user->appendchild($state);
//
// $xmluser_account = $dom->createElement("account");
// $account_text = $dom->createTextNode($user_account);
// $xmluser_account->appendchild($account_text);
// $user->appendchild($xmluser_account);
//
// $xmluser_name = $dom->createElement("name");
// $name_text = $dom->createTextNode($user_username);
// $xmluser_name->appendchild($name_text);
// $user->appendchild($xmluser_name);
//
// $xmluser_photo = $dom->createElement("photo");
// $photo_text = $dom->createTextNode($user_photo);
// $xmluser_photo->appendchild($photo_text);
// $user->appendchild($xmluser_photo);

//header("Content-type:text/xml");
//echo $dom->saveXML();
?>
