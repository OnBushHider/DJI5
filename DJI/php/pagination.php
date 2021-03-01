<?php
   
    # 链接数据库
    $con = mysqli_connect('localhost','root','666666','dji');

    // 请求第一页数据 传过来的start = 1 len = 30 请求的数据为0-29
    // 请求第二页数据 传过来的start = 2 len= 30  请求的数据为30-59 
    // 请求第三页数据 传过来的start = 3 len = 30  请求的额数据为 60 89  60
    $start = $_GET['start'];
    $len = $_GET['len'];
    $search = $_GET['search'];


    $s = ($start-1)*$len;
  
    # 设置SQL语句
    $sql = "SELECT * FROM `商品` WHERE `name` LIKE '%$search%' LIMIT $s,$len ";

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
    # $row 得到的是当前请求的20条数据



    # 计算数据的总数量 
    $sql1 = "SELECT * FROM `商品` WHERE `name` LIKE '%$search%'";
    $res1 = mysqli_query($con,$sql1);
    if(!$res1){
        die('error' . mysqli_error($con));
    }
    $dataArr1 = array();
    $row1 = mysqli_fetch_assoc($res1);
    while($row1){
        array_push($dataArr1,$row1);
        $row1 = mysqli_fetch_assoc($res1);
    }
    
    # 需要把商品数据 和总数量都返回 给前端


    echo json_encode(array(
      "total" =>count($dataArr1),
      "list" => $dataArr,
      "code" => 1,
      "message" => "获取列表数据成功"
    ));
?>