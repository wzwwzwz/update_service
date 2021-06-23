
/* exported  obj_req_sdk */
/* exported  construct_update_req */
/* exported  construct_update_servier_data */


/* global $ */
/* global mc_sdk_req_mgr */
/* global mc_sdk_param */


function construct_update_req () {
    // pakeage new json
    function new_req_json (cmd, func) {
        var json = new construct_req_json();
        json.set_cmd(cmd);
        json.set_func(func);
        return json;
    }

    // MODULE_CNT
    this.module_cnt = function (callback) {
        return this.request("MODULE_CNT", [{ "MODULE_CNT": "" }], callback);
    };

    // MODULE_INFO
    this.moudlue_info = function (arr_param, callback, b_io) {
        return this.request("MODULE_INFO", arr_param, callback, b_io);
    };

    // VERSION_CNT
    this.version_cnt = function (arr_param, callback) {
        return this.request("VERSION_CNT", arr_param, callback);
    };

    // VERSION_INFO
    this.version_info = function (arr_param, callback, b_io) {
        return this.request("VERSION_INFO", arr_param, callback, b_io);
    };

    // VERSION_FILE_CNT
    this.version_file_cnt = function (arr_param, callback) {
        return this.request("VERSION_FILE_CNT", arr_param, callback);
    };

    // VERSION_FILE_INFO
    this.version_file_info = function (arr_param, callback, b_io) {
        return this.request("VERSION_FILE_INFO", arr_param, callback, b_io);
    };

    // VERSION_FILE_EXIST
    this.version_file_exist = function (arr_param, callback, b_io) {
        return this.request("VERSION_FILE_EXIST", arr_param, callback, b_io);
    };

    // VERSION_FILE_DATA
    this.version_file_data = function (arr_param, callback, b_io) {
        return this.request("VERSION_FILE_DATA", arr_param, callback, b_io);
    };

    // ajax
    this.request = function (str_fun, arr_param, callback, b_io) {
        if ("string" !== typeof str_fun || "object" !== typeof arr_param || "function" !== typeof callback) {
            return false;
        }

        // b_io === true(写) || 其他 === 读
        var str_cmd = "GET";
        if (b_io === true) {
            str_cmd = "SET";
        }

        var param_json = new construct_req_json();
        param_json.set_cmd(str_cmd);
        param_json.set_func(str_fun.toLocaleUpperCase());
        param_json.set_params(arr_param);
        var obj_req_json = param_json.get_json();

        $.ajax({
            url: "Api",
            data: JSON.stringify({ id: "456481686", param: JSON.stringify(obj_req_json), code: 2 }),
            type: "post",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                if (res && res.param) {
                    var param = JSON.parse(res.param);
                    console.log(param);
                    callback(false, param.PARAMS);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("failed msg : " + xhr.responseText);
                callback(true);
            }
        });

        return true;
    };

    function module_test_set () {
        let obj_req_json = {
            func: "module_info",
            cmd: "set_param",
            params: [{
                NAME_ID: -1,
                VALUE: "HAL",
                ATTRIBUTE: [{
                    ATTR_NAME: "DESCRIPT",
                    ATTR_VALUE: "社会主义好\n共产主义好"
                }]
            }]
        };

        $.ajax({
            url: "Api",
            data: JSON.stringify({ id: "456481686", param: JSON.stringify(obj_req_json), code: 2 }),
            type: "post",
            contentType: "application/json",
            dataType: "json",
            success: function (obj_srv_dat) {

            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("failed msg : " + xhr.responseText);
            }
        });
    }
}


// 请求数据
function construct_update_servier_data () {
    var m_obj_req = new construct_update_req();

    // 模块数据
    var m_module_data = {};
    console.log(m_module_data);
    // 版本数据
    var m_version_data = {};
    console.log(m_version_data);

    // 保存当前的模块名称
    var m_cur_module_name = "";
    // 当前选中的模块索引
    var m_cur_module_idx = "";

    // define const
    var M_ERROR_CODE = "ERROR_CODE";
    var M_ERROR_CODE_VAL = "0x00000000";
    // param 
    var M_CONST_ATTRS = "ATTRS";
    var M_CONST_DESCRIPT = "DESCRIPT";
    var M_CONST_CREATE_TIME = "CREATE_TIME";
    var M_CONST_EDIT_TIME = "EDIT_TIME";

    // select data
    var m_arr_select_module = [];
    var m_arr_select_version = [];

    // 数据格式相关
    function module_itme () {
        this.module_name = "";
        this.discript = "";
        this.create_time = "";
        this.edit_time = "";

        this.update_info = function (obj_attrs) {
            if (typeof obj_attrs !== "object") {
                return;
            }

            if (check_val(obj_attrs.CREATE_TIME)) {
                this.create_time = obj_attrs.CREATE_TIME;
            }
            if (check_val(obj_attrs.EDIT_TIME)) {
                this.edit_time = obj_attrs.EDIT_TIME;
            }
            if (check_val(obj_attrs.DESCRIPT)) {
                this.discript = obj_attrs.DESCRIPT;
            }

        };

        this.update_name = function (name) {
            if (check_val(name)) {
                this.module_name = name;
            }
        };

        function check_val (val) {
            if (typeof val === "string" && val.trim()) {
                return true;
            }

            return false;
        }
    }

    // init
    m_obj_req.module_cnt(callback_get_module_cnt);

    function callback_get_module_cnt (err, arr_params) {
        let ui_module_cnt = 0;
        // 循环请求次数
        let ui_loop_cnt = 0;
        // 单次请求数据长度
        let ui_single_num = 5;
        // 请求下标
        let ui_req_idx = 0;

        if (err) {
            return;
        }

        if (arr_params && arr_params[0]) {
            // MODULE_CNT
            ui_module_cnt = Number(arr_params[0].MODULE_CNT);
            // 测试
            ui_module_cnt = 8;
            ui_loop_cnt = Math.ceil(ui_module_cnt / ui_single_num);

            if (0 === ui_module_cnt) {
                return;
            }

            // 请求模块信息
            loop_create_param_module_info(ui_req_idx);
        }


        // 分块请求模块信息
        function loop_create_param_module_info (ui_start_i, fn_create_param) {
            if (typeof ui_start_i !== "number") {
                return;
            }

            fn_create_param = fn_create_param || function () { };

            // 请求模块信息
            var arr_module_option = [];
            var ui_start = ui_single_num * ui_start_i;
            var ui_len = ui_start + ui_single_num;

            let idx = ui_start;
            while (idx < ui_len && idx < ui_module_cnt) {
                arr_module_option.push({
                    [idx]: ""
                });

                m_module_data[idx] = new module_itme();
                idx++;
            }

            if (arr_module_option.length) {
                m_obj_req.moudlue_info(arr_module_option, callback_get_module_data);
            }
        }

        function callback_get_module_data (err, arr_params) {
            if (!err) {
                var ui_len = arr_params.length;
                for (let idx = 0; idx < ui_len; idx++) {
                    const item = arr_params[idx];
                    if (!item) {
                        continue;
                    }

                    let index = Object.keys(item)[0];
                    console.log(index);
                    let str_module_name = item[index];
                    let attrs = item.ATTRS;

                    if (!attrs || attrs[M_ERROR_CODE] !== M_ERROR_CODE_VAL) {
                        continue;
                    }

                    // 保存模块数据
                    m_module_data[index].update_name(str_module_name);
                    m_module_data[index].update_info(attrs);
                }
            }

            ui_req_idx++;
            if (ui_req_idx < ui_loop_cnt) {
                loop_create_param_module_info(ui_req_idx);
            } else {
                // create option array
                create_option_module(m_module_data);
                console.log(m_module_data);
            }
        }
    }

    // 更新版本下拉框选项
    function create_option_module (arr) {
        console.log(arr);
        if (typeof arr !== "object") {
            return;
        }

        m_arr_select_module.push({
            id: 0,
            name: "12"
        });

        m_arr_select_module.push({
            id: 1,
            name: "123"
        });

        for (let idx = 0; idx < arr.length; idx++) {
            const item = arr[idx];
            if (item && item.module_name) {
                m_arr_select_module.push({
                    id: idx,
                    name: item.module_name
                });
            }
        }

        update_select("module", m_arr_select_module);

        // construct_version_data();
    }


    // 模块选择框改变
    this.on_module_chg = function (obj_opt) {
        if (typeof obj_opt !== "object") {
            return;
        }

        m_cur_module_idx = obj_opt.id;
        m_cur_module_name = obj_opt.name;
        new ui_update_dom_val().update_module_info(m_module_data[m_cur_module_idx]);
        construct_version_data(m_cur_module_name);
    };



    // ********************************************************************* 版本 ********************************************************************* //
    function construct_version_data (str_name) {
        if (typeof str_name !== "string") {
            return;
        }

        // 保存当前模块名称
        let m_str_module_name = str_name;
        // 当前版本数量
        let ui_version_cnt = 0;

        // version_cnt
        m_obj_req.version_cnt([{ [str_name]: "" }], function (err, arr_version_cnt) {
            if (!err) {
                ui_version_cnt = Number(arr_version_cnt[0][m_str_module_name]);
                // 测试
                ui_version_cnt = 10;

                if (ui_version_cnt) {
                    get_version_info();
                }

            }
        });

        m_version_data[m_str_module_name] = [];
        function get_version_info () {
            var m_version_param = [];
            for (let idx = 0; idx < ui_version_cnt; idx++) {
                m_version_param.push({
                    [m_str_module_name]: idx
                });

                // 保存本版数据
                m_version_data[m_str_module_name][idx] = {};
            }

            m_obj_req.version_info(m_version_param, function (err, arr_version_info) {
                if (!err) {
                    var ui_len = arr_version_info.length;
                    for (let idx = 0; idx < ui_len; idx++) {
                        var item = arr_version_info[idx];
                        var obj_attr = item.ATTRS;

                        let str_name = item[m_str_module_name];

                        obj_attr;
                    }
                }
            });
        }
    }


    // 版本号修改选项
    this.on_version_chg = function (str_val) {
    };

}







function construct_req_json () {
    var m_json = {
        CMD: "",
        FUNC: "",
        PARAMS: [],
    };
    this.set_cmd = function (val) {
        if (typeof val !== "string" || !val.trim()) {
            return false;
        }

        m_json.CMD = val;
        return true;
    };
    this.set_func = function (val) {
        if (typeof val !== "string" || !val.trim()) {
            return false;
        }

        m_json.FUNC = val;
        return true;
    };
    this.set_params = function (arr) {
        if (Object.prototype.toString.call(arr).toLocaleUpperCase() !== "[OBJECT ARRAY]") {
            return false;
        }
        m_json.PARAMS = arr;
    };
    this.get_json = function () {
        return m_json;
    };
}




// ui 更新数据相关
function ui_update_dom_val () {
    // 更新版本数据
    this.udpate_version_time = function name (t_create, t_edit, log) {
        var obj_create = document.getElementById("version_create_time");
        var obj_edit = document.getElementById("version_edit_time");
        var obj_edit = document.getElementById("version_edit_time");

        if (obj_create && typeof t_create === "string") {
            obj_create.children().innerHTML = t_create;
        }

        if (obj_edit && typeof t_edit === "string") {
            obj_edit.children().innerHTML = t_edit;
        }

        var obj_log = document.getElementById("version_text");
        if (obj_log && typeof log === "string") {
            obj_log.innerHTML = log;
        }
    };

    this.update_module_info = function (discript) {
        var obj_log = document.getElementById("modlue_text");
        if (obj_log && typeof discript === "string") {
            obj_log.innerHTML = discript;
        }
    };
}


var obj_data_response = function () {
    this.modlue_info = {
        "CMD": "",
        "FUNC": "",
        "PARAMS": [
            {
                "0": "模块1",
                "ATTRS": {
                    "VERSION": "1.0",
                    "LOG": "日志记录",
                    "CREATE_TIME": "10.25",
                    "EDIT_TIME": "11.25",
                },
                "1": "模块2",
                "ATTRS": {
                    "VERSION": "1.2",
                    "LOG": "日志记录2",
                    "CREATE_TIME": "06.25",
                    "EDIT_TIME": "3.25",
                }
            }
        ]
    };

    this.version_info = {
        "CMD": "",
        "FUNC": "",
        "PARAMS": [
            {
                "模块1": "0",
                "ATTRS": {
                    "VERSION": "1.0",
                    "LOG": "日志记录",
                    "CREATE_TIME": "10.25",
                    "EDIT_TIME": "11.25",
                },
                "模块2": "1",
                "ATTRS": {
                    "VERSION": "1.2",
                    "LOG": "日志记录2",
                    "CREATE_TIME": "06.25",
                    "EDIT_TIME": "3.25",
                }
            }
        ]
    };
};





