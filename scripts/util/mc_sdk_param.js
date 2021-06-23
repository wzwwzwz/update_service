/************************************************************************************************
 *   深圳市摩西尔电子有限公司 @版本所有@
 *
 *   此文件用于前后端通信参数构造
 *
 * 修改:
 *   1. 类型 : 创建
 *      作者 : 陈小荟
 *      时间 : 2019.10.23
 *      内容 : 所有代码
 *************************************************************************************************/

/* exported mc_sdk_param */

function mc_sdk_param() {
    var CSTR_KEY_CMD = "COMMAND";
    var CSTR_KEY_FUNC = "FUNCTION";
    var CSTR_KEY_PARA = "PARAMS";
    var CSTR_KEY_ID = "NAME_ID";
    var CSTR_KEY_VAL = "VALUE";
    var CSTR_KEY_ATTR = "ATTRIBUTE";
    var CSTR_KEY_ATTR_NAME = "ATTR_NAME";
    var CSTR_KEY_ATTR_VAL = "ATTR_VALUE";

    // 定义参数值对象
    function param_val() {
        this.str_value = "";
        this.map_attributes = new mc_js_map();
    }
    var map_params = new mc_js_map();
    var str_func = "";
    var str_cmd = "";

    /************************************************************************************************
    * 类型:
    *    函数
    * 功能:
    *    设置一个数据交换对象中的功能名称
    * 参数:
         @param { Promise<String> } func 功能名称
    * 返回：
    *    @return { Promise<Boolean> }
    *     true 设置成功
    *     false 参数类型错误
    * 修改:
    *   1. 类型 : 创建
    *      作者 : 陈小荟
    *      时间 : 2019.10.23
    *      内容 : 所有代码
    ************************************************************************************************/
    this.set_func = function (func) {
        if ("[object String]" !== Object.prototype.toString.call(func)) {
            return false;
        }

        str_func = func;
        return true;
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    取得数据交换对象中的功能名称
   * 参数:
   *    无
   * 返回：
   *    @return { Promise<String> } 功能名称
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.get_func = function () {
        return str_func;
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    设置一个数据交换对象中的命令
   * 参数:
   *    @param { Promise<String> } cmd 命令字，不能为空
   * 返回：
   *    @return { Promise<Boolean> }
   *      true 设置成功
   *      false 参数类型错误
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.set_cmd = function (cmd) {
        if ("[object String]" !== Object.prototype.toString.call(cmd)) {
            return false;
        }
        str_cmd = cmd;
        return true;
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    取得数据交换对象中的命令字
   * 参数:
   *    无
   * 返回：
   *    @return { Promise<String> } 命令字
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.get_cmd = function () {
        return str_cmd;
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    设置一个数据交换对象中的指定参数值
   * 参数:
   *    @param { Promise<String> } str_param_name 参数名称，用于对象中唯一识别码, 不能为空
   *    @param { Promise<String> } str_param_value 参数值，如果存在旧值，将更新为指定的新值
   * 返回：
   *    @return { Promise<Boolean> }
   *      true 设置成功
   *      false 参数类型错误 或 参数名称为空
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.set_param_value = function (str_param_name, str_param_value) {
        if ("[object String]" !== Object.prototype.toString.call(str_param_name) || 0 === str_param_name.length) {
            return false;
        }
        if ("[object String]" !== Object.prototype.toString.call(str_param_value)) {
            return false;
        }

        var key_u = str_param_name.toUpperCase();
        var old_val = map_params.get(key_u);

        // 判断是否已经存在这个key
        if ("undefined" === typeof old_val) {
            old_val = new param_val();
        }
        // 存在直接替换value
        old_val.str_value = str_param_value;
        map_params.set(key_u, old_val);
        return true;
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    取得数据交换对象中的参数个数
   * 参数:
   *    无
   * 返回：
   *    @returns { Promise<Number> } 参数个数
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.get_param_cnt = function () {
        return map_params.length();
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    按参数索引，取得数据交换对象中的参数名
   * 参数:
   *    @param { Promise<Number> } ui_param_idx 参数索引
   * 返回：
   *    @return { Promise<String> }
   *      参数名称
   *      null 参数类型错误
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.get_param_name = function (ui_param_idx) {
        if ("[object Number]" !== Object.prototype.toString.call(ui_param_idx) || isNaN(ui_param_idx)) {
            return null;
        }
        return map_params.get_key(ui_param_idx);
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    按参数名称，取得数据交换对象中的参数值
   * 参数:
   *    @param { Promise<String> } str_param_name 参数名称
   * 返回：
   *    @return { Promise<String> }
   *      参数值字串
   *      null 参数类型错误 或 名称不存在
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.get_param_value = function (str_param_name) {
        if ("[object String]" !== Object.prototype.toString.call(str_param_name) || 0 === str_param_name.length) {
            return null;
        }

        var key_u = str_param_name.toUpperCase();
        var old_val = map_params.get(key_u);

        if ("undefined" === typeof old_val) {
            return null;
        }
        return old_val.str_value;
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    设置一个数据交换对象中的指定参数的属性值
   * 参数:
   *    @param { Promise<String> } str_param_name 参数名称，用于对象中唯一识别码, 不能为空
   *    @param { Promise<String> } str_attr_name 属性名称，同一参数下，用于对象中唯一识别码, 不能为空
   *    @param { Promise<String> } str_attr_value 属性值，如果存在旧值，将更新为指定的新值
   * 返回：
   *    @return { Promise<Boolean> }
   *     true 设置成功
   *     false 参数不符合条件
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.set_attr_val = function (str_param_name, str_attr_name, str_attr_value) {
        if ("[object String]" !== Object.prototype.toString.call(str_param_name) || 0 === str_param_name.length) {
            return false;
        }
        if ("[object String]" !== Object.prototype.toString.call(str_attr_name) || 0 === str_attr_name.length) {
            return false;
        }
        if ("[object String]" !== Object.prototype.toString.call(str_attr_value)) {
            return false;
        }

        var key_u = str_param_name.toUpperCase();
        var key_attr_u = str_attr_name.toUpperCase();
        var old_val = map_params.get(key_u);

        if ("[object Undefined]" === Object.prototype.toString.call(old_val)) {
            old_val = new param_val();
        }

        old_val.map_attributes.set(key_attr_u, str_attr_value);
        map_params.set(key_u, old_val);
        return true;
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    按参数名称，取得数据交换对象中的属性个数
   * 参数:
   *    @param { Promise<String> } str_param_name 参数名称，不能为空
   * 返回：
   *    @return { Promise<Number> }
   *      属性个数
   *      0 参数类型错误 或 参数名称不存在
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.get_attr_cnt = function (str_param_name) {
        if ("[object String]" !== Object.prototype.toString.call(str_param_name) || 0 === str_param_name.length) {
            return 0;
        }

        var key_u = str_param_name.toUpperCase();
        var old_val = map_params.get(key_u);

        if ("[object Undefined]" === Object.prototype.toString.call(old_val)) {
            return 0;
        }

        return old_val.map_attributes.length();
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    按参数名称以及属性名称，取得数据交换对象中的属性值
   * 参数:
   *    @param { Promise<String> } str_param_name 参数名称，不能为空
   *    @param { Promise<String> } str_attr_name 属性名称，不能为空
   * 返回：
   *    @returns { Promise<String> }
   *      属性值字串
   *      null 参数类型错误 或 参数不存在
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.get_attr_val = function (str_param_name, str_attr_name) {
        if ("[object String]" !== Object.prototype.toString.call(str_param_name) || 0 === str_param_name.length) {
            return null;
        }
        if ("[object String]" !== Object.prototype.toString.call(str_attr_name) || 0 === str_attr_name.length) {
            return null;
        }
        var key_u = str_param_name.toUpperCase();
        var old_val = map_params.get(key_u);

        if ("[object Undefined]" === Object.prototype.toString.call(old_val)) {
            return null;
        }
        return old_val.map_attributes.get(str_attr_name);
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    按参数名称以及属性名称索引，取得数据交换对象中的属性名称
   * 参数:
   *    @param { Promise<String> } str_param_name 参数名称，不能为空
   *    @param { Promise<Number> } ui_idx 参数索引，不能为空
   * 返回：
   *    @return { Promise<String> }
   *     null 参数类型错误 或 参数不存在
   *     属性值字串
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.get_attr_name = function (str_param_name, ui_idx) {
        if ("[object String]" !== Object.prototype.toString.call(str_param_name) || 0 === str_param_name.length) {
            return null;
        }
        if ("[object Number]" !== Object.prototype.toString.call(ui_idx) || isNaN(ui_idx)) {
            return null;
        }
        var key_u = str_param_name.toUpperCase();
        var old_val = map_params.get(key_u);

        if ("[object Undefined]" === Object.prototype.toString.call(old_val)) {
            return null;
        }
        return old_val.map_attributes.get_key(ui_idx);
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    清空数据交换对象
   * 参数:
   *    无
   * 返回：
   *    @return { Promise<String> } true 设置成功
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.set_param_clear = function () {
        map_params = new mc_js_map();
        return true;
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    清空数据交换对象中指定参数下的所有属性
   * 参数:
   *    @param { Promise<String> } str_param_name 参数名称
   * 返回：
   *    @return { Promise<Boolean> }
   *      true 设置成功
   *      false 参数类型错误 或 参数名称不存在
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.set_param_attr_clear = function (str_param_name) {
        if ("string" !== typeof str_param_name) {
            return false;
        }

        var key_u = str_param_name.toUpperCase();
        var old_val = map_params.get(key_u);

        if ("undefined" === typeof old_val) {
            return false;
        }
        old_val.map_attributes = new mc_js_map();
        return true;
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    将JSON字串转为数据交换对象之前的清空操作
   * 参数:
   *    无
   * 返回：
   *    无
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.reset = function () {
        map_params = new mc_js_map();
        str_func = "";
        str_cmd = "";
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    设置map_attributes
   * 参数:
   *    @param { Promise<Object> } ary_attr_pairs attributes对象
   *    @param { Promise<Object> } map_res_attribute 设置attributes对象方法
   * 返回：
   *    无
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.11.22
   *      内容 : 所有代码
   ************************************************************************************************/
    function decode_attrs(ary_attr_pairs, map_res_attribute) {
        if ("object" === typeof ary_attr_pairs && 0 < ary_attr_pairs.length) {
            for (var idx_attr = 0; idx_attr < ary_attr_pairs.length; idx_attr++) {
                var obj_param_attr = ary_attr_pairs[idx_attr];

                if ("object" !== typeof obj_param_attr || "string" !== typeof obj_param_attr[CSTR_KEY_ATTR_NAME] || 0 === obj_param_attr[CSTR_KEY_ATTR_NAME].length) {
                    continue;
                }

                var str_attr_key = obj_param_attr[CSTR_KEY_ATTR_NAME].toUpperCase();
                var str_attr_val = "";

                if ("string" === typeof obj_param_attr[CSTR_KEY_ATTR_VAL] && 0 !== obj_param_attr[CSTR_KEY_ATTR_VAL].length) {
                    str_attr_val = obj_param_attr[CSTR_KEY_ATTR_VAL];
                }

                map_res_attribute.set(str_attr_key, str_attr_val);
            }
        }
    }

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    将Json字串转为数据交换对象
   * 参数:
   *    @param { Promise<String> } str_json 参数名称
   * 返回：
   *    @return { Promise<Boolean> }
   *      true 设置成功
   *      false 参数类型错误 或 为空
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.set_json = function (str_json) {
        if ("[object String]" !== Object.prototype.toString.call(str_json) || 0 === str_json.length) {
            return false;
        }
        this.reset();

        // 转化成json对象
        var json_obj = JSON.parse(mc_remove_json_comments(str_json));

        if ("object" !== typeof json_obj) {
            return false;
        }

        if ("string" === typeof json_obj[CSTR_KEY_CMD]) {
            str_cmd = json_obj[CSTR_KEY_CMD];
        }

        if ("string" === typeof json_obj[CSTR_KEY_FUNC]) {
            str_func = json_obj[CSTR_KEY_FUNC];
        }

        var ary_params = json_obj[CSTR_KEY_PARA];

        if ("object" !== typeof ary_params || 0 === ary_params.length) {
            return true;
        }

        for (var idx_param = 0; idx_param < ary_params.length; idx_param++) {
            var obj_param = ary_params[idx_param];

            if ("object" !== typeof obj_param || "string" !== typeof obj_param[CSTR_KEY_ID] || 0 === obj_param[CSTR_KEY_ID].length) {
                continue;
            }

            var str_param_key = obj_param[CSTR_KEY_ID].toUpperCase();
            var str_param_val = "";

            if ("string" === typeof obj_param[CSTR_KEY_VAL] && 0 !== obj_param[CSTR_KEY_VAL].length) {
                str_param_val = obj_param[CSTR_KEY_VAL];
            }

            var obj_old_val = map_params.get(str_param_key);

            if ("object" !== typeof obj_old_val) {
                obj_old_val = new param_val();
            }
            obj_old_val.str_value = str_param_val;


            decode_attrs(obj_param[CSTR_KEY_ATTR], obj_old_val.map_attributes);


            map_params.set(str_param_key, obj_old_val);
        }
        return true;
    };

    /************************************************************************************************
   * 类型:
   *    函数
   * 功能:
   *    将数据交换对象转换为Json字串
   * 参数:
   *    无
   * 返回：
   *    @return { Promise<String> } json字串指针
   * 修改:
   *   1. 类型 : 创建
   *      作者 : 陈小荟
   *      时间 : 2019.10.23
   *      内容 : 所有代码
   ************************************************************************************************/
    this.get_json = function () {
        var obj_json = {};

        obj_json[CSTR_KEY_CMD] = str_cmd;
        obj_json[CSTR_KEY_FUNC] = str_func;

        // 创建空数组放置PARAMS
        var ary_param = [];

        for (var idx_param = 0; idx_param < map_params.length(); idx_param++) {
            var str_key = map_params.get_key(idx_param);

            // 不符合 跳过本次
            if ("string" !== typeof str_key || 0 === str_key.length) {
                continue;
            }
            // 创建空对象放置PARAMS子对象
            ary_param[idx_param] = {};
            // 设置NAME_ID
            ary_param[idx_param][CSTR_KEY_ID] = str_key;

            var obj_param_val = map_params.get(str_key);

            // 设置VALUE
            ary_param[idx_param][CSTR_KEY_VAL] = obj_param_val.str_value;

            // 创建空数组放置ATTRIBUTE
            var ary_attr = [];

            for (
                var idx_attr = 0;
                idx_attr < obj_param_val.map_attributes.length();
                idx_attr++
            ) {
                var str_attr_key = obj_param_val.map_attributes.get_key(idx_attr);

                if ("string" !== typeof str_attr_key || 0 === str_attr_key.length) {
                    continue;
                }
                // 创建空对象放置ATTRIBUTE子对象
                ary_attr[idx_attr] = {};
                ary_attr[idx_attr][CSTR_KEY_ATTR_NAME] = str_attr_key;
                ary_attr[idx_attr][
                    CSTR_KEY_ATTR_VAL
                ] = obj_param_val.map_attributes.get(str_attr_key);
            }
            ary_param[idx_param][CSTR_KEY_ATTR] = ary_attr;
        }
        obj_json[CSTR_KEY_PARA] = ary_param;
        return JSON.stringify(obj_json);
    };
}


/************************************************************************************************
 * 类型:
 *    map对象
 * 功能:
 *    解决IE10下不支持MAP数据对象问题
 * 参数:
 *    NA
 * 返回：
 *    NA
 * 例子：
 *    NA
 * 备注：
 *    使用方法与MAP一致
 * 修改:
 *   1. 类型 : 创建
 *      作者 : 张启丰
 *      时间 : 2019.10.23
 *      内容 : 所有代码
 ************************************************************************************************/
function mc_js_map() {
    var ary_keys = [];
    var obj_data = {};

    this.set = function (key, value) {
        if (0 > ary_keys.indexOf(key)) {
            ary_keys.push(key);
        }
        obj_data[key] = value;
    };
    this.get = function (key) {
        return obj_data[key];
    };
    this.get_key = function (idx) {
        if ("number" !== typeof idx) {
            return null;
        }
        if (ary_keys.length <= idx) {
            return null;
        }
        return ary_keys[idx];
    };
    this.length = function () {
        if (null === ary_keys) {
            return 0;
        }
        return ary_keys.length;
    };
}


/************************************************************************************************
 * 类型:
 *    函数
 * 功能:
 *    删除json字串中的C语言样式注释
 * 参数:
 *    @param {promises<string>} str_json_txt 带注释的json字串
 * 返回：
 *    @returns {promises<string>} 删除了C语言样式注释的json字串
 * 例子：
 *    NA
 * 备注：
 *    NA
 * 修改:
 *   1. 类型 : 创建
 *      作者 : 张启丰
 *      时间 : 2019.10.23
 *      内容 : 所有代码
 ************************************************************************************************/
function mc_remove_json_comments(str_json_txt) {
    if ("string" !== typeof str_json_txt || 0 === str_json_txt.length) {
        return "";
    }

    var str_ret_txt = "";
    var i_find_idx = 0;
    var i_line_end = 0;

    while (0 < str_json_txt.length) {
        i_find_idx = str_json_txt.indexOf("/*");
        if (0 > i_find_idx) {
            str_ret_txt += str_json_txt;
            break;
        }
        if (0 < i_find_idx) {
            str_ret_txt += str_json_txt.substring(0, i_find_idx);
        }

        i_find_idx = str_json_txt.indexOf("*/", i_find_idx + 2);
        if (0 > i_find_idx) {
            break;
        }

        str_json_txt = str_json_txt.substring(i_find_idx + 2);
    }

    str_json_txt = str_ret_txt;
    str_ret_txt = "";
    while (0 < str_json_txt.length) {
        i_find_idx = str_json_txt.indexOf("//");
        if (0 > i_find_idx) {
            str_ret_txt += str_json_txt;
            break;
        }
        if (0 < i_find_idx) {
            str_ret_txt += str_json_txt.substring(0, i_find_idx);
        }

        i_line_end = str_json_txt.indexOf("\r", i_find_idx + 2);
        if (0 > i_line_end) {
            i_line_end = str_json_txt.indexOf("\n", i_find_idx + 2);
            if (0 > i_line_end) {
                break;
            }
        }

        str_json_txt = str_json_txt.substring(i_line_end);
    }

    return str_ret_txt;
}
