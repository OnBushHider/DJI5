<?php
$username=$_POST['username'];

$con = mysqli_connect('localhost','root','666666','dji');

$sql = "SELECT *  FROM `购物车` WHERE `username` = '$username' ";

$res = mysqli_query($con,$sql);
if(!$res){
    die('数据库链接错误' . mysqli_error($con));
}
$dataArr = array();
$row = mysqli_fetch_assoc($res);
while($row){
    array_push($dataArr,$row);
    $row = mysqli_fetch_assoc($res);
}

print_r(json_encode($dataArr))

?>