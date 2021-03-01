<?php

$con = mysqli_connect('localhost','root','666666','dji');

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM `注册名` WHERE `username`='$username' AND `password`='$password'";

  $res = mysqli_query($con,$sql);

  if (!$res) {
    die('error for mysql: ' . mysqli_error($con));
  }

  $row = mysqli_fetch_assoc($res);

  if (!$row) {
    // 没有匹配的数据 登录失败
    print_r('账号或密码错误');
  } else {
    // 有匹配的数据 登录成功
   print_r('登陆成功');
  }

?>
