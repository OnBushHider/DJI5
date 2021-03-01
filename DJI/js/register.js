//  ==========================轮播图JS=====================================================

var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    effect: 'fade', //切换的方式
    loop: true, //是否可以轮回

    pagination: { //分页器的设置
        el: '.swiper-pagination',
        clickable: true, //是否可以点击
    },
    navigation: { //左右按钮的设置，颜色大小在style里改
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 3000, //延迟
        stopOnLastSlide: false, //展示最后一张图片之后是否停止
        disableOnInteraction: false, //鼠标操作之后是否停止
    }
});

// 设置鼠标移入暂停自动轮播事件
swiper.el.onmouseover = function() {
    swiper.autoplay.stop();
}

//鼠标离开开始自动切换
swiper.el.onmouseout = function() {
    swiper.autoplay.start();
}


// ==========================注册JS=====================================================

let register_content_tel = $('.register_content_tel');
let register_content_tel_2 = $('.register_content_tel_2');
let register_content_Email = $('.register_content_Email');
let btn_tel = $('.register_type_tel');
let btn_Email = $('.register_type_Email');


// 点击事件切换电话注册或者邮箱注册,按钮的样式
btn_tel.click(function() {
    register_content_Email.css('display', 'none')
    register_content_tel.css('display', 'block')
    register_content_tel_2.css('display', 'none')
    btn_Email.css({
        'color': '#333333',
        'border-bottom': '1px solid #EEEEEE'
    })
    $(this).css({
        'color': '#44A8F2',
        'border-bottom': ' 1px solid #44A8F2'
    })
});
btn_Email.click(function() {
    register_content_tel.css('display', 'none')
    register_content_Email.css('display', 'block')
    register_content_tel_2.css('display', 'none')
    btn_tel.css({
        'color': '#333333',
        'border-bottom': '1px solid #EEEEEE'
    })
    $(this).css({
        'color': '#44A8F2',
        'border-bottom': ' 1px solid #44A8F2'
    })
})

// ------------------------手机注册模块1 --------------------------------------------------------------------
// 滑块滑动事件
let slide_over1 = $('.register_content_tel .slide_over');
let slide1 = $('.register_content_tel .slide');
let slide_below1 = $('.register_content_tel .slide_below');
let mask1 = $('.register_content_tel .mask')
let text1 = $('.register_content_tel .text')
let tick1 = $('.register_content_tel .tick')



// 滑块效果
slide_over1.mousedown(function() {
    $(window).mousemove(function(e) {
        let left1 = e.clientX - slide1.offset().left - parseInt(slide_over1.width() + 1) / 2;
        if (left1 <= 0) {
            left1 = 0
        }
        if (left1 >= parseInt(slide_below1.width()) - parseInt(slide_over1.width())) {
            left1 = parseInt(slide_below1.width()) - parseInt(slide_over1.width())
        }
        slide_over1.css({
            left: left1
        })
        mask1.css('width', left1)
            // 验证通过后
        if (left1 == parseInt(slide_below1.width()) - parseInt(slide_over1.width())) {
            text1.html('验证通过');
            text1.css('color', 'white');
            slide_over1.off('mousedown');
            slide_over1.css('cursor', 'auto')
            tick1.fadeIn();
        }
        if (text1.html() == '验证通过') {
            $(window).mouseup();
        }
    })
})
$(window).mouseup(function() {
        $(window).off('mousemove') //取消鼠标移动事件
    })
    // 实时判断滑块是否已经滑到最右边
$(window).mouseup(function() {
    if (text1.html() == '验证通过') {
        slide_alert1.css('display', 'none')

    }
    if (parseInt(slide_over1.css('left')) < parseInt(slide_below1.width()) - parseInt(slide_over1.width())) {
        slide_over1.animate({ left: 0 },
            350
        );
        mask1.animate({ width: 0 },
            350
        );
    }
})

// 手机号码与密码的正则
// 添加正则表达式
// 验证手机号码的正则
jQuery.validator.addMethod('testTel', function(value) {
    let reg = /^1[3|4|5|7|8][0-9]{9}$/;
    if (reg.test(value)) {
        return true
    }
    return false
})

// 验证密码的正则
jQuery.validator.addMethod('testPassword', function(value) {
    let reg = /^[0-9A-Za-z]{8,20}$/;
    if (reg.test(value)) {
        return true
    }
    return false
})

// 发送验证码
let code_text = $('.register_content_tel .code_text')
let code_num;
code_text.click(function() {
    let a = parseInt(Math.random() * 10);
    let b = parseInt(Math.random() * 10);
    let c = parseInt(Math.random() * 10);
    let d = parseInt(Math.random() * 10);
    code_num = '' + a + b + c + d;
    alert('验证码为' + code_num);
    console.log(code_num);
})

// 验证验证码的正则
let code_input = document.querySelector('.register_content_tel .code_input')
jQuery.validator.addMethod('testCode', function(value) {
    if (code_input.value == code_num) {
        return true
    }
    return false
})

// 正则
let register_tel1 = $('#register_tel1');
let slide_alert1 = $('.register_content_tel .slide_alert');
register_tel1.validate({
    rules: {
        telNumber: {
            required: true,
            testTel: true
        },
        code: {
            required: true,
            testCode: true
        }
    },
    messages: {
        telNumber: {
            required: '手机号不能为空',
            testTel: '手机号格式有误'
        },
        code: {
            required: '短信验证码必填',
            testCode: '验证码错误'
        }
    },
    submitHandler: function() {
        if (text1.html() == '验证通过') {
            register_content_tel_2.css('display', 'block')
            register_content_tel.css('display', 'none')
            register_content_Email.css('display', 'none')
        } else {
            slide_alert1.css('display', 'block')
        }
    }
})


// ------------------------手机注册模块2 --------------------------------------------------------------------
// 添加正则表达式
jQuery.validator.addMethod('testPassword', function(value) {
    let reg = /^[0-9A-Za-z]{8,20}$/;
    if (reg.test(value)) {
        return true
    }
    return false
})

let tel_number = document.querySelector('.register_content_tel .tel_number');
let tel_password = document.querySelector('.register_content_tel_2 .password2');
// 异步请求的函数，把注册成功的账号密码传到数据库
async function sentId2() {
    let res = await pAjax({
        url: '../php/register.php',
        type: 'post',
        data: {
            username: tel_number.value,
            password: tel_password.value
        }
    })
    alert(res);
}

// 手机2正则
let register_tel_2 = $('.register_content_tel_2 .register_tel_2');
register_tel_2.validate({
    rules: {
        password: {
            required: true,
            testPassword: true,
        },
        re_password: {
            required: true,
            equalTo: ' .password2'
        }

    },
    messages: {
        password: {
            required: '密码不能为空',
            testPassword: '密码需要8-20个字符，且包含字母和数字。'
        },
        re_password: {
            required: '确认密码不能为空',
            equalTo: '确认密码与新密码不一致，请重新输入'
        }

    },
    submitHandler: function() {
        sentId2()
    }
})



// 协议书必须打勾同意，否则按钮将会封锁
let tel_2_agreement = document.querySelector('.register_content_tel_2 .agreement');
let tel_2_submit = document.querySelector('.register_content_tel_2 .submit');
tel_2_submit.disabled = true;
tel_2_agreement.onclick = function() {
    if (tel_2_agreement.checked == true) {
        tel_2_submit.disabled = false;
        tel_2_submit.style.backgroundColor = '#44A8F2';
        tel_2_submit.style.borderColor = '#44A8F2';
        tel_2_submit.style.cursor = 'pointer'
    } else {
        tel_2_submit.disabled = true;
        tel_2_submit.style.backgroundColor = '#8FCBF7';
        tel_2_submit.style.borderColor = '#8FCBF7';
        tel_2_submit.style.cursor = 'auto'
    }
}




///* --------------------------------------------------------------------------------------------- */

// 邮箱注册模块 滑块滑动事件
let slide_over2 = $('.register_content_Email .slide_over');
let slide2 = $('.register_content_Email .slide');
let slide_below2 = $('.register_content_Email .slide_below');
let mask2 = $('.register_content_Email .mask')
let text2 = $('.register_content_Email .text')
let tick2 = $('.register_content_Email .tick')
let Email = document.querySelector('.register_content_Email .Email');
let Email_password = document.querySelector('.register_content_Email .password');
slide_over2.mousedown(function(a) {
    $(window).mousemove(function(e) {
        let left1 = e.clientX - slide2.offset().left - parseInt(slide_over2.width() + 1) / 2;
        if (left1 <= 0) {
            left1 = 0
        }
        if (left1 >= parseInt(slide_below2.width()) - parseInt(slide_over2.width())) {
            left1 = parseInt(slide_below2.width()) - parseInt(slide_over2.width())
        }
        slide_over2.css({
            left: left1
        })
        mask2.css('width', left1)
            // 验证通过后
        if (left1 == parseInt(slide_below2.width()) - parseInt(slide_over2.width())) {
            text2.html('验证通过');
            text2.css('color', 'white');
            slide_over2.off('mousedown');
            slide_over2.css('cursor', 'auto');
            tick2.fadeIn();
        }
        if (text2.html() == '验证通过') {
            $(window).mouseup();
        }
    })
})
$(window).mouseup(function() {
    $(window).off('mousemove') //取消鼠标移动事件
})

// 异步请求的函数，把注册成功的账号密码传到数据库
async function sentId() {
    let res = await pAjax({
        url: '../php/register.php',
        type: 'post',
        data: {
            username: Email.value,
            password: Email_password.value
        }
    })
    alert(res);
}

// 添加正则表达式
jQuery.validator.addMethod('testEmail', function(value) {
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (reg.test(value)) {
        return true
    }
    return false
})

jQuery.validator.addMethod('testPassword', function(value) {
        let reg = /^[0-9A-Za-z]{8,20}$/;
        if (reg.test(value)) {
            return true
        }
        return false
    })
    // 邮箱正则
let register_Email = $('#register_Email');
let slide_alert2 = $('.register_content_Email .slide_alert')
let Email_form = document.querySelector('.register_content_Email form');
register_Email.validate({
        rules: {
            Email: {
                required: true,
                testEmail: true
            },
            password: {
                required: true,
                testPassword: true,
            },
            re_password: {
                required: true,
                equalTo: ' .password'
            }

        },
        messages: {
            Email: {
                required: '邮箱地址不能为空',
                testEmail: '邮箱格式有误'
            },
            password: {
                required: '密码不能为空',
                testPassword: '密码需要8-20个字符，且包含字母和数字。'
            },
            re_password: {
                required: '确认密码不能为空',
                equalTo: '确认密码与新密码不一致，请重新输入'
            }

        },
        submitHandler: function() {
            if (text2.html() == '验证通过') {
                // 异步请求
                sentId();
            } else {
                slide_alert2.css('display', 'block')
            }
        }
    })
    // 协议书必须打勾同意，否则按钮将会封锁
let Email_agreement = document.querySelector('.register_content_Email .agreement');
let submit = document.querySelector('.register_content_Email .submit');
submit.disabled = true;
Email_agreement.onclick = function() {
        if (Email_agreement.checked == true) {
            submit.disabled = false;
            submit.style.backgroundColor = '#44A8F2';
            submit.style.borderColor = '#44A8F2';
            submit.style.cursor = 'pointer'
        } else {
            submit.disabled = true;
            submit.style.backgroundColor = '#8FCBF7';
            submit.style.borderColor = '#8FCBF7';
            submit.style.cursor = 'auto'
        }
    }
    // 实时判断滑块是否已经滑到最右边
$(window).mouseup(function() {
    if (text2.html() == '验证通过') {
        slide_alert2.css('display', 'none')
    }
    if (parseInt(slide_over2.css('left')) < parseInt(slide_below2.width()) - parseInt(slide_over2.width())) {
        slide_over2.animate({ left: 0 },
            350
        );
        mask2.animate({ width: 0 },
            350
        );
    }
})