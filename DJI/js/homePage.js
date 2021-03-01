// 判断是否已经登陆
let login = getCookie('login');
let header_content_3 = document.querySelector('.header .header_content_3');

function render_header() {
    if (login) {
        header_content_3.innerHTML = `
        <span class="glyphicon glyphicon-shopping-cart"></span>
        <span class="car"><a href="./html/car.html">购物车</a></span>
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
        <span class="car"><a href="./html/car.html">购物车</a></span>
        <span class="shopping_number"></span> &nbsp;&nbsp;
        <span>| &nbsp;
        
        <!-- 未登录时 -->
        <a href="./login.html">登录</a> &nbsp;
        | &nbsp;
        <a href="./html/register.html">注册</a> &nbsp;
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



// 渲染购物车商品的数量
async function carGoodsNum() {
    let res = await pAjax({
        url: './php/carGoodsNum.php',
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



// 中间三个商品
let three_goods_content = document.querySelector('.three_goods .three_goods_content');

async function three_goods_write() {
    let res = await pAjax({
            url: './php/threeGoods.php'
        })
        // 获取到的数据data
    let data = JSON.parse(res);

    data.forEach(function(item, i) {
        three_goods_content.innerHTML += `
        <div class="three_goods_content_1">
                <div class="three_goods_content_top">
                    <img class="img_top" src="${data[i].background_img_1}" alt="">
                    <img class="img_bottom" src="${data[i].background_img_2}" alt="">
                </div>
                <div class="three_goods_content_top_hover">
                    <img src="${data[i].hover_img}" alt="">
                </div>
                <div class="three_goods_content_bottom">
                    <p>${data[i].text1}</p>
                    <p>${data[i].text2}</p>
                    <p>${data[i].text3}</p>
                    <p>${data[i].text4}</p>
                    <p>${data[i].price}</p>
                </div>
            </div>
        `
    })


}
three_goods_write();

// 商品
let goods_container = document.querySelector('.goods .goods_container');

async function goods_write() {
    let res = await pAjax({
            url: './php/goods.php'
        })
        // 获取到的数据data
    let data = JSON.parse(res);
    // 每个模块的渲染
    let goods_list = '';
    for (let i = 1; i < 9; i++) {
        goods_list += `
        <a href="./html/detail.html?id=${data[i].id}">
            <div>
                <section>
                    <img src="${data[i].img1}" alt="">
                </section>
                <div class="hover">
                    <img src="${data[i].img2}" alt="">
                    <div class="hover_text">
                    ${data[i].description}
                    </div>
                </div>
                <div class="text">
                    <p>${data[i].payable}</p>
                    <p>${data[i].name}</p>
                    <p>¥${data[i].price}</p>
                </div>
            </div>
        </a>
        `
    }
    // 五大模块
    for (let i = 0; i < 5; i++) {
        goods_container.innerHTML += `
        <div class="goods_content_1">
        <div class="title">
            <span>御 Mavic</span>
            <span><a href="">更多 ></a></span>
        </div>
        <div class="content">
            <div class="content_top">
                <a href="./html/detail.html?id=${data[0].id}">
                    <div class="content_top_left">
                        <div>
                            <img src="${data[0].img1}" alt="">
                        </div>
                        <div>
                            <div>
                                <p>${data[0].payable}</p>
                                <p>${data[0].name}</p>
                                <p>${data[0].description}</p>
                                <p>¥${data[0].price}</p>
                            </div>
                        </div>
                    </div>
                </a>
                <a>
                <div class="content_top_right">
                    <video height="100%" loop="" autoplay="" muted="" src="https://stormsend1.djicdn.com/stormsend/uploads/bdeb2840ffcc01384f79787b8ab113e3.mp4" poster="//stormsend1.djicdn.com/stormsend/uploads/dea08c26be64fd58d54c71c647206001.jpg"></video>
                </div>
                </a>
            </div>
            <!-- 下面的8件商品 -->
            <div class="content_bottom">
           ${goods_list}
            </div>
        </div>
    </div>
        `
    }

}
goods_write();

// 搜索功能跳转列表页
let homePage_search_input = document.querySelector('.search .search_content_3_input input');
let homePage_search_button = document.querySelector('.search .search_content_3_button .glyphicon-search');

homePage_search_button.onclick = function() {

    let homePage_search_input = document.querySelector('.search .search_content_3_input input');
    open(`./html/list.html?sh=${homePage_search_input.value}`, '_self')

    sentValue();

}