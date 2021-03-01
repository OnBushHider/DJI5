<?php
$search = $_GET['search'];

$con = mysqli_connect('localhost','root','666666','dji');

# 设置SQL语句
// $sql = "SELECT * FROM `商品`  LIMIT 0,20";
$sql = "SELECT * FROM `商品` WHERE `name` LIKE '%$search%' LIMIT 0,20 ";

 # 执行SQL语句
 $res = mysqli_query($con,$sql);

 if(!$res){
    die('数据库链接错误' . mysqli_error($con));
}

# 数据的处理
$dataArr = array();
$row = mysqli_fetch_assoc($res);
while($row){
    array_push($dataArr,$row);
    $row = mysqli_fetch_assoc($res);
}

print_r(json_encode($dataArr));
?>