<?php
session_start();
include 'ChromePhp.php';
include 'config.php';
$allowedExts =  array("gif","jpeg","jpg","png");
$temp = explode(".",$_FILES["file"]["name"]);
$extension = end($temp);     //get the extension of the file
    //ChromePhp::log($_FILES["file"]["size"]);
if((($_FILES["file"]["type"] == "image/gif")
    || ($_FILES["file"]["type"] == "image/jpeg")
    || ($_FILES["file"]["type"] == "image/jpg")
    || ($_FILES["file"]["type"] == "image/pjpeg")
    || ($_FILES["file"]["type"] == "image/x-png")
    || ($_FILES["file"]["type"] == "image/png"))
    && ($_FILES["file"]["size"] < 4096000)
    && in_array($extension,$allowedExts)){
        if($_FILES["file"]["error"] > 0){
            ChromePhp::log("error");
            echo "error";
        }else{
            //echo $_FILES["file"]["name"];
            //ChromePhp::log($_FILES["file"]["name"]);
            //ChromePhp::log($_FILES["file"]["tmp_name"]);
            $parentDirName = dirname(dirname(__FILE__));
            ChromePhp::log($parentDirName);
            if(file_exists($parentDirName."/user_photo/".$_FILES["file"]["name"])){
                echo "user_photo/".$_FILES["file"]["name"];
            }else{
                //if the file doesn't exist,upload the file
                move_uploaded_file($_FILES["file"]["tmp_name"],$parentDirName."/user_photo/".$_FILES["file"]["name"]);
                $photo_url = "user_photo/".$_FILES["file"]["name"];
                //ChromePhp::log($photo_url);
                $conn = new mysqli($database_host,$database_user,$database_password,$database_name);
                if($conn->connect_error){
                    echo "3";
                    die("Fail to connect.");
                }
                $account = $_SESSION["account"];
                $sql  = "UPDATE member SET photo='". $photo_url."' WHERE account='".$account."'";
                if($conn->query($sql)){
                    echo $photo_url;
                }
                $conn->close();
            }
        }
}else{
    echo "0";
}



//header("Location:/shop/photoinfo.html");



//header("Location:/shop/photoinfo.html");




 ?>
