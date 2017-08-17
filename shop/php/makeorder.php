<?php
session_start();
$state = "fail";
include 'ChromePhp.php';

include 'config.php';
$account = $_SESSION["account"];ChromePhp::log($account);
if($account){
    $orderscodeArray = array();
    $orderTimeArray = array();
    $accountArray = array();
    $memberIdArray = array();
    $realNameArray = array();
    $addressArray = array();
    $telArray = array();
    $goodsIdArray = array();
    $goodsNameArray = array();
    $goodsPriceArray = array();
    $goodsCountArray = array();
    $totalArray = array();
    $stateArray = array();
    $conn = new mysqli($database_host,$database_user,$database_password,$database_name);

    if($conn->connect_error){
        die("Fail to connect database:".$conn->connect_error);
    }
    $sql = "SELECT * FROM orders where account='".$account."'";
    ChromePhp::log($sql);
    $result_select = $conn->query($sql);
    if($result_select->num_rows > 0){
        while($row=$result_select->fetch_assoc()){
            $orderscodeArray[] = $row["orderscode"];
            $orderTimeArray[] = $row["orderTime"];
            $accountArray[] = $row["account"];
            $memberIdArray[] = $row["memberId"];
            $realNameArray[] = $row["realName"];
            $addressArray[] = $row["address"];
            $telArray[] = $row["tel"];
            $goodsIdArray[] = $row["goodsId"];
            $goodsNameArray[] = $row["goodsName"];
            $goodsPriceArray[] = $row["goodsPrice"];
            $goodsCountArray[] = $row["goodscount"];
            $totalArray[] = $row["total"];
            $stateArray[] = $row["state"];
        }
        $length = count($orderscodeArray);
        $sql_insert = "";
        for($i=0;$i<$length;$i++){
            $sql_insert.="INSERT INTO realorders(account,realName,address,tel,orderTime,
                    goodsId,memberId,goodsName,goodsPrice,goodscount,total,state,orderscode)
                    VALUES ('".$accountArray[$i]."','".$realNameArray[$i]."','".$addressArray[$i]."','".$telArray[$i]."',
                    '".$orderTimeArray[$i]."','".$goodsIdArray[$i]."','".$memberIdArray[$i]."','".$goodsNameArray[$i]."',
                    '".$goodsPriceArray[$i]."','".$goodsCountArray[$i]."','".$totalArray[$i]."','".$stateArray[$i]."',
                    '".$orderscodeArray[$i]."');";
        }
        // ChromePhp::log($sql_insert);
        if($conn->multi_query($sql_insert) === TRUE){
            while($conn->more_results())
            {
                $conn->next_result();
                if($res = $conn->store_result())
                {
                    $res->free();
                }
            }
            //  ChromePhp::log("success");
            $sql_delete = "DELETE FROM orders WHERE account='".$account."'";
            // ChromePhp::log($sql_delete);
            if($conn->multi_query($sql_delete) === TRUE){
                $state = "success";
            }else{
                ChromePhp::log("Error: " . $sql_delete . "<br>" . $conn->error);
            }
        }
    }
    $conn->close();

}else{

}

echo $state;
?>
