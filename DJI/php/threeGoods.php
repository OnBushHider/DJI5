<?php

$con = mysqli_connect('localhost','root','666666','dji');

# 设置SQL语句
$sql = "SELECT * FROM `中间三个商品` LIMIT 0,3";

 # 执行SQL语句
 $res = mysqli_query($con,$sql);

 if(!$res){
    die('error' . mysqli_error($con));
}

# 数据的处理
$dataArr = array();
$row = mysqli_fetch_assoc($res);
while($row){
    array_push($dataArr,$row);
    $row = mysqli_fetch_assoc($res);
}

print_r(json_encode($dataArr))
?>