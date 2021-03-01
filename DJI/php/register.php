<?php
    $username = $_POST['username'];
    $password = $_POST['password'];

    $con = mysqli_connect('localhost','root','666666','dji');

    // 查询注册的账号是否存在 
    $sql = "SELECT *  FROM `注册名` WHERE `username` = '$username'   ";
   
    $res = mysqli_query($con,$sql);

    $arr = array();
    $row = mysqli_fetch_assoc($res);

    while($row){
        array_push($arr,$row);
        $row = mysqli_fetch_assoc($res);
    }

    // 如果没有查询到值 $arr 为空数组
    if($arr){
        print_r('账号已存在');
    }else{
        //代码开始执行 
    $sql = "INSERT INTO `注册名` (`username`,`password`) VALUES('$username','$password')";
   
    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }
   
    print_r('注册成功');
    }
    
?>