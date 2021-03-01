// 判断是否已经登陆
let login = getCookie('login');
let header_content_3 = document.querySelector('.header .header_content_3');

function render_header() {
    if (login) {
        header_content_3.innerHTML = `
        <span class="glyphicon glyphicon-shopping-cart"></span>
        <span class="car"><a href="../html/car.html">购物车</a></span>
        <span class="shopping_number"></span> &nbsp;&nbsp;
        <div>| &nbsp;
        
        <!-- 已登录时 -->
        <a  class='hellow'>您好,${login}</a> &nbsp;
        | &nbsp;
        <a class='logout'>注销</a> 
        
        &nbsp; | &nbsp;
        <a >中国大陆(简体中文/￥CNY)</a></div>
    `
    } else {
        header_content_3.innerHTML = `
        <span class="glyphicon glyphicon-shopping-cart"></span>
        <span class="car"><a href="../html/car.html">购物车</a></span>
        <span class="shopping_number"></span> &nbsp;&nbsp;
        <span>| &nbsp;
        
        <!-- 未登录时 -->
        <a href="../login.html" class="header_login">登录</a> &nbsp;
        | &nbsp;
        <a href="../html/register.html"  class="header_register">注册</a> &nbsp;
        | &nbsp;
        
      
        <a href="">中国大陆(简体中文/￥CNY)</a></span>
    `
    }
}
render_header();

// 注销的功能
let logout = document.querySelector('.header .logout');
if (logout) {
    logout.onclick = function() {
        // 封装的cookie里面的删除cookie的功能
        delCookie('login');
        location.reload()
    }
}


// 获取网址上面的id
let id = location.search.substring(4) * 1;


// 渲染购物车商品的数量
async function carGoodsNum() {
    let res = await pAjax({
        url: '../php/carGoodsNum.php',
        type: 'post',
        data: {
            username: login
        }
    })
    let data = JSON.parse(res);
    // 获得购物车的商品的总数量goods_num
    let goods_num = data.reduce(function(pre, cur) {
        return pre + cur.goods_num * 1
    }, 0)

    // 渲染
    let shopping_number = document.querySelector('.header .shopping_number');
    shopping_number.innerHTML = goods_num;
}
carGoodsNum();


// 渲染数据
async function getData() {
    let res = await pAjax({
        url: '../php/detail.php',
        data: {
            id: id
        }
    })
    data = JSON.parse(res);
    console.log(data);

    let big_img_box = document.querySelector('.detail .big_img_box');
    big_img_box.innerHTML = `
    <img src="${data.detail_img1}" alt="">
    <img src="${data.detail_img2}" alt="">
    <img src="${data.detail_img3}" alt="">
    <img src="${data.detail_img4}" alt="">
    <img src="${data.detail_img5}" alt="">
    <img src="${data.detail_img6}" alt="">
    `
    let small_img_box = document.querySelector('.detail .small_img_box');
    small_img_box.innerHTML = `
    <img src="${data.detail_img1}" alt="" class="active">
    <img src="${data.detail_img2}" alt="">
    <img src="${data.detail_img3}" alt="">
    <img src="${data.detail_img4}" alt="">
    <img src="${data.detail_img5}" alt="">
    <img src="${data.detail_img6}" alt="">
    <span class="glyphicon glyphicon-play">产品介绍</span>
    <span class="glyphicon glyphicon-sound-dolby"> 3D</span>
    `
    let information_outbox = document.querySelector('.detail .information_outbox');
    information_outbox.innerHTML = `
    <p class="information_name">${data.name}</p>
                <p class="information_price">¥${data.price}</p>
                <p class="information_payway">低至 ¥${(data.price/3).toFixed(2)}/月 x 3 期免息，支持花呗分期、京东白条、掌上生活分期付款</p>
                <section class="information_describe">
                ${data.detail_describe}
                </section>
                <p class="information_concept "><a href="">产品概览</a>></p>

                <p class="information_expressage"><span class="glyphicon glyphicon-plane"></span>&nbsp;&nbsp;顺丰包邮</p>
                <p class="information_activity"><span class="glyphicon glyphicon-usd"></span>&nbsp;&nbsp;单笔订单可返还订单金额 1% DJI 币，用于支付下一次订单</p>
                <p class="information_return"><span class="glyphicon glyphicon-transfer"></span>&nbsp;&nbsp;支持 7 天无理由退换货</p>
    `
    let addCar_content_text = document.querySelector('.addCar .addCar_content_text ');
    addCar_content_text.innerHTML = `
        <p>
            <span>¥${data.price}</span>
            <span>或低至 ¥${(data.price/3).toFixed(2)}/月 × 3 期免息</span>
        </p>
        <p>订单付款后1个工作日发货。</p>
    `





    // 左边图片展示
    let bigImg = $('.big_img_box img');
    let smallImg = $('.small_img_box img');

    $(bigImg[0]).css('display', 'block')
    smallImg.click(function() {
        // 点击小图标显示大图片
        for (let i = 0; i < bigImg.length; i++) {
            $(bigImg[i]).css('display', 'none')
        }
        $(bigImg[$(this).index()]).fadeIn()

        // 点击小图片时候自己的样式
        for (let i = 0; i < smallImg.length; i++) {
            $(smallImg[i]).attr('class', '')
        }
        $(this).attr('class', 'active');
    })
}
getData();


// 添加到购物车
let addCar_content_button = document.querySelector('.addCar_content_button');
addCar_content_button.onclick = function() {

    // alert('添加购物车')
    // 把当前这个条商品的goods_id ，用户名 ，goods_num 添加到 购物车的表
    // goods_id = id
    // userName = getCookie('login)  如果没有登录的时候 不能添加数据，提示进行登录
    // goods_num  判断这个用户对应的这个goods_id 是否已经存在，如果存在 goods_num++，如果不存在操作添加商品到购物车，其中 goods_num = 1


    let login = getCookie('login');
    if (!login) {
        alert('没有登录请到登录页面进行登录');
        localStorage.setItem('url', location.href);
        location.href = '../login.html';
        return
    }

    // 发添加购物车的ajax请求
    pAjax({
        url: '../php/addCar.php',
        type: 'post',
        data: {
            'goods_id': id,
            'userName': login
        }
    }).then(function(res) {
        let data = JSON.parse(res)
            // console.log(data);
        if (data.msg == '添加成功') {
            let addOne = $('.addCar .addOne');
            // 添加成功后的动画
            addOne.fadeIn().animate({
                top: -60
            }).fadeOut().css('top', -39);

        }
        carGoodsNum();
    })

}


// 搜索功能跳转列表页
let homePage_search_input = document.querySelector('.search .search_content_3_input input');
let homePage_search_button = document.querySelector('.search .search_content_3_button .glyphicon-search');
homePage_search_button.onclick = function() {

    let homePage_search_input = document.querySelector('.search .search_content_3_input input');
    open(`../html/list.html?sh=${homePage_search_input.value}`, '_self')

    sentValue();

}


//点击登录的时候记录一下当前网页的地址
let header_login = document.querySelector('.header .header_login');
let header_register = document.querySelector('.header .header_register');

if (header_login) {
    header_login.onclick = function() {
        localStorage.setItem('url', location.href);
    }
}
if (header_register) {
    header_register.onclick = function() {
        localStorage.setItem('url', location.href);
    }
}