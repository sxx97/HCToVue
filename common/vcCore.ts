// import Vue from 'vue';
// import VueResource from 'vue-resource';
const Vue = require('vue');
const VueResource = require('vue-resource');


const vc: any = {};

Vue.use(VueResource);

if (!vc.component) {
    vc.component = new Vue();
}

 //绑定跳转函数
 vc.jumpToPage = function (url) {
    
};
//保存菜单
vc.setCurrentMenu = function (_menuId) {
    
};
//获取菜单
vc.getCurrentMenu = function () {
    
};

//保存用户菜单
vc.setMenus = function (_menus) {
    
};
//获取用户菜单
vc.getMenus = function () {

};

//保存菜单状态
vc.setMenuState = function (_menuState) {

};
//获取菜单状态
vc.getMenuState = function () {
    
};

//保存用户菜单
vc.saveData = function (_key, _value) {
    
};
//获取用户菜单
vc.getData = function (_key) {
    return {
        apiUrl: ''
    }
    
};

//保存当前写字楼信息 _communityInfo : {"communityId":"123213","name":"测试写字楼"}
vc.setCurrentCommunity = function (_currentCommunityInfo) {
    
};

//获取当前写字楼信息
// @return   {"communityId":"123213","name":"测试写字楼"}
vc.getCurrentCommunity = function () {
    return {
        communityId: '',
        name: '',
    }
};

vc.getCurrentStaffInfo = function () {
    return {
        accountCreateTime: "2020-09-16T03:07:05.000+00:00",
        communityId: "8888",
        departmentId: 1005,
        levels: 1,
        orgId: "842020090421460005",
        orgLevel: "3",
        parentOrgId: "842020071395050140",
        positionName: "保洁主管",
        relCd: "8",
        staffId: "302020091636910031",
        storeId: "402020051157600001",
        storeName: "和平里物业有限公司",
        tel: "13366357549",
        userId: "302020091636910031",
    }
};

vc.prefixZero = function(num) {
    return num >= 10 ? num : `0${num}`;
}


vc.arrToString = (arr) => {
    return `[${arr.toString()}]`
}

//保存当前写字楼信息 _communityInfos : [{"communityId":"123213","name":"测试写字楼"}]
vc.setCommunitys = function (_communityInfos) {
    
};

//获取当前写字楼信息
// @return   {"communityId":"123213","name":"测试写字楼"}
vc.getCommunitys = function () {
    
};

//删除缓存数据
vc.clearCacheData = function () {
    const noNeedClearItems = ['mOrderCount', 'complaintCount'];
    for(let key in localStorage) {
        if (!noNeedClearItems.includes(key)) {
            localStorage.removeItem(key);
        }
    }
    
};

//将org 对象的属性值赋值给dst 属性名为一直的属性
vc.copyObject = function (org, dst) {
    //for(key in Object.getOwnPropertyNames(dst)){
    for (var key in dst) {
        if (dst.hasOwnProperty(key) && org.hasOwnProperty(key)) {
            dst[key] = org[key]
        }
    }
};
//扩展 现有的对象 没有的属性扩充上去
vc.extendObject = function (org, dst) {
    for (var key in dst) {
        if (!org.hasOwnProperty(key)) {
            dst[key] = org[key]
        }
    }
};
//获取url参数
vc.getParam = function (_key) {
    //返回当前 URL 的查询部分（问号 ? 之后的部分）。
    var urlParameters = location.search;
    //如果该求青中有请求的参数，则获取请求的参数，否则打印提示此请求没有请求的参数
    if (urlParameters.indexOf('?') != -1) {
        //获取请求参数的字符串
        var parameters = decodeURI(urlParameters.substr(1));
        //将请求的参数以&分割中字符串数组
        let parameterArray = parameters.split('&');
        //循环遍历，将请求的参数封装到请求参数的对象之中
        for (var i = 0; i < parameterArray.length; i++) {
            if (_key == parameterArray[i].split('=')[0]) {
                return parameterArray[i].split('=')[1];
            }
        }
    }

    return "";
};
//查询url
vc.getUrl = function () {
    //返回当前 URL 的查询部分（问号 ? 之后的部分）。
    var urlParameters = location.pathname;
    return urlParameters;
};
vc.getBack = function(){
    
}
//对象转get参数
vc.objToGetParam = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
};
//空判断 true 为非空 false 为空
vc.notNull = function (_paramObj) {
    if (_paramObj == null || _paramObj == undefined || _paramObj.trim() == '') {
        return false;
    }
    return true;
};
vc.isEmpty = function (_paramObj) {
    if (_paramObj == null || _paramObj == undefined ) {
        return true;
    }
    return false;
};
//设置debug 模式
vc.setDebug = function (_param) {
    vc.debug = _param;
};
//数据共享存放 主要为了组件间传递数据
vc.put = function (_key, _value) {
    vc.map[_key] = _value;
};
//数据共享 获取 主要为了组件间传递数据
vc.get = function (_key) {
    return vc.map[_key];
};

vc.getDict = function(_name,_type,_callFun){
    var param = {
        params: {
            name:_name,
            type:_type
        }
    };

    //发送get请求
    vc.http.get('core', 'list', param,
    function(json, res) {
        if(res.status == 200){
            var _dictInfo = JSON.parse(json);
            _callFun(_dictInfo);
            return ;
        }
    },
    function(errInfo, error) {
        console.log(errInfo, '请求失败处理', error);
    });
}


/**
 创建定时器
    **/
vc.createTimer = function (func, sec) {
    
};
//清理定时器
vc.clearTimer = function (timer) {
    clearInterval(timer);
}

function add0(m) {
    return m < 10 ? '0' + m : m
}

vc.dateFormat = function (shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(parseInt(shijianchuo));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}


vc.propTypes = {
    string: "string",//字符串类型
    array: "array",
    object: "object",
    number: "number",
}

vc.toast = function Toast(msg, duration) {
    duration = isNaN(duration) ? 3000 : duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText = "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 30%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
    document.body.appendChild(m);
    setTimeout(function () {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function () {
            document.body.removeChild(m)
        }, d * 1000);
    }, duration);
}

vc._this = {

};

vc.urlToBase64 = function urlToBase64(_url, _callFun) {
    var imgData;
    var reader = new FileReader();
    getImageBlob(_url, function (blob) {
        reader.readAsDataURL(blob);
    });
    reader.onload = function (e) {
        imgData = e.target.result;
        _callFun(imgData);
    };

    function getImageBlob(_url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", _url, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status == 200) {
                if (cb) cb(this.response);
            }
        };
        xhr.send();
    }
}

const constant = {
    REQUIRED_MSG:"不能为空",
    GET_CACHE_URL:["/nav/getUserInfo"]
}
vc.constant = constant;


/**
 事件监听
    **/
vc.on = function () {
    var _namespace = "";
    var _componentName = "";
    var _value = "";
    var _callback = undefined;
    if (arguments.length == 4) {
        _namespace = arguments[0];
        _componentName = arguments[1];
        _value = arguments[2];
        _callback = arguments[3];
    } else if (arguments.length == 3) {
        _componentName = arguments[0];
        _value = arguments[1];
        _callback = arguments[2];
    } else {
        console.error("执行on 异常，vc.on 参数只能是3个 或4个");
        return;
    }

    if (vc.notNull(_namespace)) {
        vc.component.$on(_namespace + "_" + _componentName + '_' + _value,
            function (param) {
                if (vc.debug) {
                    console.log("监听ON事件", _namespace, _componentName, _value, param);
                }
                _callback(param);
            }
        );
        return;
    }

    vc.component.$on(_componentName + '_' + _value,
        function (param) {
            if (vc.debug) {
                console.log("监听ON事件", _componentName, _value, param);
            }
            _callback(param);
        }
    );
};

/**
 事件触发
    **/
vc.emit = function () {
    var _namespace = "";
    var _componentName = "";
    var _value = "";
    var _param = undefined;
    if (arguments.length == 4) {
        _namespace = arguments[0];
        _componentName = arguments[1];
        _value = arguments[2];
        _param = arguments[3];
    } else if (arguments.length == 3) {
        _componentName = arguments[0];
        _value = arguments[1];
        _param = arguments[2];
    } else {
        console.error("执行on 异常，vc.on 参数只能是3个 或4个");
        return;
    }
    if (vc.debug) {
        console.log("监听emit事件", _namespace, _componentName, _value, _param);
    }
    if (vc.notNull(_namespace)) {
        vc.component.$emit(_namespace + "_" + _componentName + '_' + _value, _param);
        return;
    }
    vc.component.$emit(_componentName + '_' + _value, _param);
};

vc.loading = function() {};

vc.http = {
    post: function (componentCode, componentMethod, param, options, successCallback, errorCallback) {
        vc.loading('open');
        Vue.http.post('/callComponent/' + componentCode + "/" + componentMethod, param, options)
            .then(function (res) {
                try {
                    successCallback(res.bodyText, res);
                } catch (e) {
                    console.error(e);
                } finally {
                    vc.loading('close');
                }
            }, function (error) {
                try {
                    errorCallback(error.bodyText, error);
                } catch (e) {
                    console.error(e);
                } finally {
                    vc.loading('close');
                }
            });
    },
    get: function (componentCode, componentMethod, param, successCallback, errorCallback) {
        //加入缓存机制
        var _getPath = '/' + componentCode + '/' + componentMethod;
        if (vc.constant.GET_CACHE_URL.includes(_getPath)) {
            var _cacheData = vc.getData(_getPath);
            //浏览器缓存中能获取到
            if (_cacheData != null && _cacheData != undefined) {
                successCallback(JSON.stringify(_cacheData), {status: 200});
                return;
            }
        }
        vc.loading('open');
        Vue.http.get('/callComponent/' + componentCode + "/" + componentMethod, param)
            .then(function (res) {
                try {
                    successCallback(res.bodyText, res);
                    if (vc.constant.GET_CACHE_URL.includes(_getPath) && res.status == 200) {
                        vc.saveData(_getPath, JSON.parse(res.bodyText));
                    }
                } catch (e) {
                    console.error(e);
                } finally {
                    vc.loading('close');
                }
            }, function (error) {
                try {
                    errorCallback(error.bodyText, error);
                } catch (e) {
                    console.error(e);
                } finally {
                    vc.loading('close');
                }
            });
    },
    upload: function (componentCode, componentMethod, param, options, successCallback, errorCallback) {
        vc.loading('open');
        Vue.http.post('/callComponent/upload/' + componentCode + "/" + componentMethod, param, options)
            .then(function (res) {
                try {
                    successCallback(res.bodyText, res);
                } catch (e) {
                    console.error(e);
                } finally {
                    vc.loading('close');
                }
            }, function (error) {
                try {
                    errorCallback(error.bodyText, error);
                } catch (e) {
                    console.error(e);
                } finally {
                    vc.loading('close');
                }
            });

    },

};



const validate: any = {

    state:true,
    errInfo:'',

    setState:function(_state,_errInfo){
        this.state = _state;
        if(!this.state){
            this.errInfo = _errInfo
            throw "校验失败:"+_errInfo;
        }
    },

    /**
        校验手机号
    **/
    phone:function(text){
            var regPhone =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
            return regPhone.test(text);
    },
    /**
        校验邮箱
    **/
    email:function(text){
        var regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        return regEmail.test(text);
    },
    /**
     * 必填
     * @param {参数} text
     */
    required:function(text){
        if(text == undefined || text == null || text == "" ){
            return false;
        }

        return true;
    },
    /**
     * 校验长度
     * @param {校验文本} text
     * @param {最小长度} minLength
     * @param {最大长度} maxLength
     */
    maxin:function(text,minLength,maxLength){
        if(text.length <minLength || text.length > maxLength){
            return false;
        }

        return true;
    },
    /**
     * 校验长度
     * @param {校验文本} text
     * @param {最大长度} maxLength
     */
    maxLength:function(text,maxLength){
        if(text.length > maxLength){
            return false;
        }

        return true;
    },
    /**
     * 校验最小长度
     * @param {校验文本} text
     * @param {最小长度} minLength
     */
    minLength:function(text,minLength){
        if(text.length < minLength){
            return false;
        }
        return true;
    },
    /**
     * 全是数字
     * @param {校验文本} text
     */
    num:function(text){
        var regNum = /^[0-9][0-9]*$/;
        return regNum.test(text);
    },
    date:function(str) {
        var regDate = /^(\d{4})-(\d{2})-(\d{2})$/;
        return regDate.test(str);
    },
    dateTime:function(str){
        var reDateTime = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
        return reDateTime.test(str);
    },
    /**
        金额校验
    **/
    money:function(text){
        var regMoney = /^\d+\.?\d{0,2}$/;
        return regMoney.test(text);
    },
    idCard:function(num){
        num = num.toUpperCase();
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
            return false;
        }
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        //下面分别分析出生日期和校验位
        var len, re;
        len = num.length;
        if (len == 15) {
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            var arrSplit = num.match(re);

            //检查生日日期是否正确
            var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
            var bGoodDay;
            
            if (!bGoodDay) {
                return false;
            }
            else {
                //将15位身份证转成18位
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0, i;
                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                num += arrCh[nTemp % 11];
                return true;
            }
        }
        if (len == 18) {
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var arrSplit = num.match(re);

            //检查生日日期是否正确
            var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                // alert(dtmBirth.getYear());
                //  alert(arrSplit[2]);
                return false;
            }
            else {
                //检验18位身份证的校验码是否正确。
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var valnum;
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0, i;
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                valnum = arrCh[nTemp % 11];
                if (valnum != num.substr(17, 1)) {
                    return false;
                }
                return true;
            }
        }
        return false;
    }

};
validate.validate = function(dataObj,dataConfig){

    try{
        // 循环配置（每个字段）
        for(var key in dataConfig){
            //配置信息
            var tmpDataConfigValue = dataConfig[key];
            //对key进行处理
            var keys = key.split(".");
            console.log("keys :",keys);
            var tmpDataObj = dataObj;
            //根据配置获取 数据值
            keys.forEach(function(tmpKey){
                 console.log('tmpDataObj:',tmpDataObj);
                 tmpDataObj = tmpDataObj[tmpKey]
            });
//                for(var tmpKey in keys){
//                    console.log('tmpDataObj:',tmpDataObj);
//                    tmpDataObj = tmpDataObj[tmpKey]
//                }

            tmpDataConfigValue.forEach(function(configObj){
                if(configObj.limit == "required"){
                    validate.setState(validate.required(tmpDataObj),configObj.errInfo);
                }

                if(configObj.limit == 'phone'){
                    validate.setState(validate.phone(tmpDataObj),configObj.errInfo);
                }

                if(configObj.limit == 'email'){
                    validate.setState(validate.email(tmpDataObj),configObj.errInfo);
                }

                if(configObj.limit == 'maxin'){
                    var tmpParam = configObj.param.split(",")
                    validate.setState(validate.maxin(tmpDataObj,tmpParam[0],tmpParam[1]),configObj.errInfo);
                }

                if(configObj.limit == 'maxLength'){
                    validate.setState(validate.maxLength(tmpDataObj,configObj.param),configObj.errInfo);

                }

                if(configObj.limit == 'minLength'){
                    validate.setState(validate.minLength(tmpDataObj,configObj.param),configObj.errInfo);
7
                }

                if(configObj.limit == 'num'){
                    validate.setState(validate.num(tmpDataObj),configObj.errInfo);
                }

                if(configObj.limit == 'date'){
                    validate.setState(validate.date(tmpDataObj),configObj.errInfo);
                }
                if(configObj.limit == 'dateTime'){
                    validate.setState(validate.dateTime(tmpDataObj),configObj.errInfo);
                }

                if(configObj.limit == 'money'){
                    validate.setState(validate.money(tmpDataObj),configObj.errInfo);
                }

                if(configObj.limit == 'idCard'){
                    validate.setState(validate.idCard(tmpDataObj),configObj.errInfo);
                }
            });

        }
    }catch(error){
        console.log("数据校验失败",validate.state,validate.errInfo,error);
        return false;
    }

    return true;
}

vc.check = function(dataObj,dataConfig){
    return vc.validate.validate(dataObj, dataConfig);
}
vc.validate = validate;
export {
    vc
};