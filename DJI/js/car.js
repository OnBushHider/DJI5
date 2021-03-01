// 如果login的值为空的时候就说明没有登录，就应该去登录页面
let login = getCookie('login');
if (!login) {
    // 没登陆的时候先用localStorage来存储当前的地址，然后再跳转到登录界面
    localStorage.setItem('url', location.href);
    location.href = '../login.html';
}

class Car {
    constructor(ele, userName) {
        this.ele = document.querySelector(ele);
        this.username = userName;
        // 设置全局变量数量，总价
        this.info = {
            number: 0,
            totalPrice: 0
        };

        this.init();
    }

    init() {
        // 获取元素
        this.body = this.ele.querySelector('.panel-body');
        this.species = this.ele.querySelector('.species');
        this.number = this.ele.querySelector('.number');
        // 总价格
        this.total = this.ele.querySelector('.total');
        // 全选按钮
        this.allChecked = this.ele.querySelector('.allChecked');
        this.getData();

        //事件委托形式的绑定点击事件
        this.ele.onclick = (e) => {
            let target = e.target;
            // 获取属性的属性值
            this.id = target.getAttribute('idx');
            if (target.classList.contains('checked')) {
                // 要把当前点击选择框的这个元素的is_select改为true
                this.data.forEach(item => {
                    if (item.id == this.id) {
                        // 这里每次点击都会自动识别是true还是false
                        item.is_select = target.checked;
                    }
                })
                this.calculation();
            }
            if (target.classList.contains('allChecked')) {
                // 如果是勾上的时候就 把勾去掉，下面所有商品的勾都要去掉，表示is_select = false
                // 如果没有白勾上，就把勾勾上，下面所有的商品都勾上 表示素有数据的is_select = true
                this.data.forEach(item => {
                    item.is_select = target.checked;
                })

                this.render();
            }

            if (target.classList.contains('reduce')) {
                // 当点击减号的时候，先判断当前值为多少，如果值为1不能在减
                // 如果值大于1 的时候
                // 发送ajax请求，更改数据中这条数据的数量
                // 当ajax请求修改成功之后 只需要再次修改一下this.data 中的数据即可

                // indexOf('数据') 
                // includes()判断数组中是否存在某个数据，存在就返回true,不存在就返回false
                // find() 去数组中找某个元素

                this.reduce();
            }

            if (target.classList.contains('add')) {
                this.add();
            }
            if (target.classList.contains('del')) {
                this.remove(this.id);
            }


            if (target.classList.contains('settlement')) {
                // 结算，把勾选的数据删除
                // 数据中is_select = true 这些数据被删除
                // 过滤is_select = true的这些数据，然后循环的去发送ajax请求

                // 把要删除的数据单独拿出来，统一循环请求数据库的car里面把他们删除
                let deleteData = this.data.filter(item => {
                    return item.is_select == true;
                })

                deleteData.forEach(item => {
                    this.remove(item.id)

                })
                alert('支付成功')
            }
        }
    }

    // 获取数据的函数
    async getData() {
        let data = await pAjax({
            url: '../php/getCarData.php',
            data: {
                userName: this.username
            }
        });
        // this.data为购物车里面属于自己用户名的的数据
        this.data = JSON.parse(data);
        // 因为获取的数据 默认 is_select = '0'
        // 先处理数据的is_select 的值变为 false
        this.data.forEach(item => {
            item.is_select = false;
        })
        this.render()
    }

    // 渲染结构的函数
    render() {
        this.calculation();
        let str = '';
        // 如果没有商品的时候就显示空空如也
        if (this.data == '') {
            this.body.innerHTML = `
            <div class="empty">空空如也! <a href="../index.html">去购物</a></div>
            `;
        } else {
            this.data.forEach(item => {
                // 这里的total为每一行的总价
                let total = item.goods_num * item.price;

                str += `
                <div class="media">
                    <div class="media-left">
                        <input type="checkbox" ${item.is_select ? "checked":''} class="checked" idx="${item.id}">
                        <img class="media-object" style="width: 100px;" src="${item.img1}" alt="...">
                    </div>
                    <div class="media-body">
                        <div class="media_body_left">
                            <h4 class="media-heading">${item.name}</h4>
                            <div class="sent">
                                <span>发货时间：订单付款后1个工作日。</span>
                            </div>
                        </div>
                        <div class="price">
                            价格￥${item.price}
                        </div>
                        <div class="media_body_center">
                            <div class="btn-group" role="group" aria-label="...">
                                <button type="button" class="btn btn-default reduce" idx="${item.id}" >-</button>
                                <button type="button" class="btn btn-default">${item.goods_num}</button>
                                <button type="button" class="btn btn-default add"  idx="${item.id}">+</button>
                            </div>
                        </div>
                        <div class="media_body_right">
                            <span class="item_total">小计:￥${item.price*item.goods_num}</span>
                            <span class="glyphicon glyphicon-remove del" idx="${item.id}"></span>
                        </div>
                    </div>
                </div>
                `
            });
            this.body.innerHTML = str;
        }

    }

    // 计算所选择的商品的总价格 和 数量
    calculation() {
        // 给每一个商品数据都添加一个is_select属性，当属性值为true的时候那么就说明这个商品被选择，如果is_select 的值为false那么就说明没有选择

        // 过滤出所选的所有商品
        this.selectData = this.data.filter(item => {
            return item.is_select == true;
        });

        // 计算所选商品的种类数量 
        this.info.number = this.selectData.reduce((pre, cur) => {
            return pre + cur.goods_num * 1;
        }, 0);
        // 计算所有商品的总价格
        this.info.totalPrice = this.selectData.reduce((pre, cur) => {
            return pre + cur.goods_num * cur.price
        }, 0)

        // 判断是否全选 当所有数据中的is_select = true 的时候表示所有的数据都勾上
        let res = this.data.every(item => {
            return item.is_select == true
        })


        // 把商品的种类 和所选商品的数量 和价格渲染到结构
        this.species.innerHTML = this.data.length;
        this.number.innerHTML = this.info.number;
        this.total.innerHTML = this.info.totalPrice.toFixed(2);
        this.allChecked.checked = res;
    }

    // 减数量的函数
    reduce() {
        let num = this.data.find(item => {
            return item.id == this.id;
        }).goods_num

        if (num <= 1) {
            alert('商品数量最小为1')
            return
        }
        //先修改数据库中数据，当数据库中的数据修改成功之后在修改 this.data中数据 
        pAjax({
            url: '../php/updateCar.php',
            data: {
                'goods_id': this.id,
                'goods_num': --num,
                'username': this.username
            }
        }).then(res => {
            res = JSON.parse(res);
            if (res.code) {
                this.data.forEach(item => {
                    if (item.id == this.id) {
                        item.goods_num = num;

                        this.render();
                    }
                })
            }
        })
    }

    // 加数量的函数
    add() {
        let num = this.data.find(item => {
            return item.id == this.id;
        }).goods_num;
        pAjax({
            url: '../php/updateCar.php',
            data: {
                'goods_id': this.id,
                'goods_num': ++num,
                'username': this.username
            }
        }).then(res => {
            res = JSON.parse(res);
            if (res.code) {
                this.data.forEach(item => {
                    if (item.id == this.id) {
                        item.goods_num = num;
                        this.render();
                    }
                })
            }
        })
    }

    // 删除的函数
    remove(id) {
        // 发送ajax请求 需要传递 用户和goods_id过去
        pAjax({
            url: '../php/deleteCar.php',
            data: {
                'username': this.username,
                'goods_id': id
            }
        }).then(res => {
            res = JSON.parse(res);
            if (res.code) {
                // 把this.data中的这条数据删除 然后在渲染 this.render();
                this.data = this.data.filter(item => {
                    return item.id != id;
                })
                this.render();
            }
        })
    }
}

new Car('.container', login);