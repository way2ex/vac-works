<?php
session_start();
include 'ChromePhp.php';
$queryStr = $_POST["query"];

 switch ($queryStr) {
  case 'query_loginstate':
    if(isset($_SESSION["account"])){
      //echo "string";
      $loginState = "login";
      $account = $_SESSION["account"];
      //$username =$_SESSION["username"];
      //$photo = $_SESSION["photo"];
      //ChromePhp::log("get session");
      $dom = new DomDocument("1.0","utf-8");
      $user = $dom->createElement("user");
      $dom->appendchild($user);

      $user_loginState = $dom->createElement("state");
      $user_loginStateText = $dom->createTextNode($loginState);
      $user_loginState->appendchild($user_loginStateText);
      $user->appendchild($user_loginState);

      $user_account = $dom->createElement("account");
      $user_accountText = $dom->createTextNode($account);
      $user_account->appendchild($user_accountText);
      $user->appendchild($user_account);


      //ChromePhp::log($photo);
      $conn = new mysqli("localhost","root","vac19930307","shop");
      if($conn->connect_error){
          die("Connect fail:"+$conn->connect_error);
      }
      $sql  = "SELECT membergrade,realname,sex,username,photo from member WHERE account='".$account."'";
      $result = $conn->query($sql);
      if($result->num_rows > 0){
         $row = $result->fetch_assoc();
         $membergrade = $row["membergrade"];
         $user_membergrade = $dom->createElement("membergrade");
         $user_membergradeText = $dom->createTextNode($membergrade);
         $user_membergrade->appendchild($user_membergradeText);
         $user->appendchild($user_membergrade);

         $realname = $row["realname"];
         $user_realname = $dom->createElement("realname");
         $user_realnameText = $dom->createTextNode($realname);
         $user_realname->appendchild($user_realnameText);
         $user->appendchild($user_realname);

         $sex = $row["sex"];
         $user_sex = $dom->createElement("sex");
         $user_sexText = $dom->createTextNode($sex);
         $user_sex->appendchild($user_sexText);
         $user->appendchild($user_sex);

         $username=$row["username"];
         $user_username = $dom->createElement("name");
         $user_usernameText = $dom->createTextNode($username);
         $user_username->appendchild($user_usernameText);
         $user->appendchild($user_username);

         $photo=$row["photo"];
         $user_photo = $dom->createElement("photo");
         $user_photoText = $dom->createTextNode($photo);
         $user_photo->appendchild($user_photoText);
         $user->appendchild($user_photo);
      }

    }else{
      $loginState ="nologin";
      $dom = new DomDocument("1.0","utf-8");
      $user = $dom->createElement("user");
      $dom->appendchild($user);

      $user_loginState = $dom->createElement("state");
      $user_loginStateText = $dom->createTextNode($loginState);
      $user_loginState->appendchild($user_loginStateText);
      $user->appendchild($user_loginState);
    }
    header("Content-type:text/xml");
    echo $dom->saveXML();
    break;
  default:
    # code...
    break;
 }
?>
