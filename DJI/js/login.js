let form1 = $('.box_right form')
let username = document.querySelector('.username');
let password = document.querySelector('.password');
form1.validate({
    rules: {
        username: {
            required: true,
        },
        password: {
            required: true,
        }
    },
    messages: {
        username: {
            required: '账号不能为空',
        },
        password: {
            required: '密码不能为空',
        }
    },
    submitHandler: function() {
        checkId()
    }
})

// 异步请求的函数，跟注册表的数据进行一一对比
async function checkId() {
    let res = await pAjax({
        url: './php/login.php',
        type: 'post',
        data: {
            username: username.value,
            password: password.value
        }
    })
    alert(res);
    if (res == '登陆成功') {
        // 登录成功存储 登录的状态
        setCookie('login', username.value, 600);

        // 跳转页面 如果从购物车过来的时候登录成功去购物车页面
        // 否则就去到首页
        let url = localStorage.getItem('url');
        if (url) {
            location.href = url;
            // 登录成功的时候把url的这个localstorage值清除
            localStorage.removeItem('url');
        } else {
            location.href = './index.html';
        }
    }
}