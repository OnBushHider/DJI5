// 判断是否已经登陆
let login = getCookie('login');
console.log(login);
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
        <a href="../login.html" class='header_login'>登录</a> &nbsp;
        | &nbsp;
        <a href="../html/register.html"  class='header_register'>注册</a> &nbsp;
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


// 搜索栏的处理
let search_value = document.querySelector('.search .search_content_3_input input');
let search_button = document.querySelector('.search .search_content_3_button span');

let goods_container = document.querySelector('.goods .goods_container');
let defaultInfo = {
    len: 20,
    num: 1
}

// 点击搜索按钮时
search_button.onclick = function() {
    // 以下为分页栏的处理
    let page = document.querySelector('.page');
    pAjax({
        url: '../php/pagination.php',
        data: {
            start: defaultInfo.num,
            len: defaultInfo.len,
            search: search_value.value
        }
    }).then((res) => {
        res = JSON.parse(res);
        // 以下是功能
        new Pagination(page, {
            pageInfo: {
                pagenum: 1,
                pagesize: defaultInfo.len,
                total: res.total,
                totalpage: Math.ceil(res.total / defaultInfo.len)
            },
            textInfo: {
                first: '首页',
                prev: '上一页',
                list: '',
                next: '下一页',
                last: '最后一页'
            },
            change: function(num) {
                defaultInfo.num = num;
                getData()
                    // scrollTo(0, 0)
            }
        });
    })
}

// 数据渲染
async function getData() {
    let res = await pAjax({
        url: '../php/pagination.php',
        data: {
            start: defaultInfo.num,
            len: defaultInfo.len,
            search: search_value.value
        }
    });

    data = JSON.parse(res)
    console.log(data);
    goods_container.innerHTML = '';
    data.list.forEach(function(item, i) {
        goods_container.innerHTML += `
        
    <a href="../html/detail.html?id=${item.id}">
    <section>
        <div>
            <img src="${item.img1}" alt="">
        </div>
        <p>${item.name}</p>
    </section>
    </a>
    `
    });
}
// 获取网址上面传过来的搜索文字
let search_data = location.search.substring(4);
search_value.value = decodeURI(search_data);
search_button.click();


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