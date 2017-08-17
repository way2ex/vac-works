<?php
session_start();
include 'ChromePhp.php';
$queryStr = $_POST["query"];
// ChromePhp::log($_SESSION["account"]);
 switch ($queryStr) {
  case 'query_loginstate':
    if(isset($_SESSION["account"])){
      //echo "string";
      $loginState = "login";
      $account = $_SESSION["account"];
      $username =$_SESSION["username"];
      $photo = $_SESSION["photo"];
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

      $user_username = $dom->createElement("name");
      $user_usernameText = $dom->createTextNode($username);
      $user_username->appendchild($user_usernameText);
      $user->appendchild($user_username);

      $user_photo = $dom->createElement("photo");
      $user_photoText = $dom->createTextNode($photo);
      $user_photo->appendchild($user_photoText);
      $user->appendchild($user_photo);
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
