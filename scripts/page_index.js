
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
}


// 请求数据
function construct_update_servier_data () {
    var m_this = this;
    // *****************  define const ***************** //
    // define const
    var M_ERROR_CODE = "ERROR_CODE";
    var M_ERROR_CODE_VAL = "0x00000000";
    var M_CONST_INDEX = "INDEX";
    var M_CONST_NAME = "NAME";
    // module
    var M_CONST_ATTRS = "ATTRS";
    var M_CONST_DESCRIPT = "DESCRIPT";
    var M_CONST_CREATE_TIME = "CREATE_TIME";
    var M_CONST_EDIT_TIME = "EDIT_TIME";
    // version
    var M_CONST_MODULE = "MODULE";
    var M_CONST_VERSION = "VERSION";
    var M_CONST_LOG = "LOG";
    // file
    var M_CONST_COUNT = "COUNT";
    var M_CONST_VER = "VER";
    var M_CONST_MD5 = "MD5";
    var M_CONST_SIZE = "SIZE";

    // *****************  define const ***************** //

    // 请求对象
    var m_obj_req = new construct_update_req();

    // ********************************************************************* DATA ********************************************************************* //
    // 模块数据
    var m_module_data = {};
    console.log(m_module_data);
    // 版本数据
    var m_version_data = {};
    console.log(m_version_data);
    // ********************************************************************* DATA ********************************************************************* //


    // ******************** 保存页面数据 ******************** //
    // ---- 当前模块数据 ----- 
    var m_cur_module_idx = "";
    var m_cur_module_name = "";
    var m_cur_module_discript = "";
    // ---- 版本-----
    var m_cur_version_idx = "";
    var m_cur_version_name = "";
    var m_cur_version_log = "";
    // ******************** 保存页面数据 ******************** //

    // select data
    var m_arr_select_module = [];
    var m_arr_select_version = [];

    // 更新dom数据
    var m_obj_update_dom = new ui_update_dom_val();

    // 数据格式相关
    function module_itme () {
        this.module_name = "";
        this.discript = "";
        this.create_time = "";
        this.edit_time = "";

        this.update_base_info = function (obj_attrs) {
            if (typeof obj_attrs !== "object") {
                return;
            }

            if (this.check_val(obj_attrs.CREATE_TIME)) {
                this.create_time = obj_attrs.CREATE_TIME;
            }
            if (this.check_val(obj_attrs.EDIT_TIME)) {
                this.edit_time = obj_attrs.EDIT_TIME;
            }
            if (this.check_val(obj_attrs.DESCRIPT)) {
                this.discript = obj_attrs.DESCRIPT;
            }

            if (this.check_val(obj_attrs.NAME)) {
                this.module_name = obj_attrs.NAME;
            }
        };

        this.check_val = function (val) {
            if (typeof val === "string" && val.trim()) {
                return true;
            }

            return false;
        };
    }

    // 保存的版本项数据
    function version_item () {
        this.index = "";
        this.version = "";
        this.log = "";

        this.set_module_name = function (val) {
            if (this.check_val(val)) {
                this.module_name = val;
            }
        };

        this.update_version_info = function (obj_attrs) {
            if (this.check_val(obj_attrs.INDEX)) {
                this.index = obj_attrs.INDEX;
            }

            if (this.check_val(obj_attrs.VERSION)) {
                this.version = obj_attrs.VERSION;
            }

            if (this.check_val(obj_attrs.LOG)) {
                this.log = obj_attrs.LOG;
            }
        };
    }

    version_item.prototype = new module_itme();



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
            // ui_module_cnt = 8;
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
                    [idx]: "",
                    [M_CONST_ATTRS]: {
                        INDEX: idx
                    }
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
                    let attrs = item[M_CONST_ATTRS];
                    // 保存模块数据
                    m_module_data[index].update_base_info(attrs);
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
    function create_option_module (obj) {
        console.log(obj);
        if (typeof obj !== "object") {
            return;
        }

        var ui_len = Object.keys(obj).length;
        for (let idx = 0; idx < ui_len; idx++) {
            const item = obj[idx];
            if (item && item.module_name) {
                m_arr_select_module.push({
                    id: idx,
                    name: item.module_name
                });
            }
        }
        // 设置当前下拉列表选择项
        var obj_set_selected = get_first_opt(m_arr_select_module);
        update_select("module", m_arr_select_module, (obj_set_selected ? obj_set_selected.id : obj_set_selected));
        m_this.on_module_chg(obj_set_selected);
    }



    // ******************** 页面数据变动 模块 ******************** //
    // 模块描述改动
    this.on_module_disctipt_chg = function (val) {
        if (typeof val !== "string") {
            return false;
        }

        m_cur_module_discript = val;
    };


    // 模块选择框改变
    this.on_module_chg = function (obj_opt) {
        if (typeof obj_opt !== "object") {
            return;
        }

        if (typeof obj_opt.id !== "string") {
            obj_opt.id = obj_opt.id.toString();
        }

        m_cur_module_idx = obj_opt.id;
        m_cur_module_name = obj_opt.name;

        if (obj_opt.id !== "-1") {
            m_obj_update_dom.update_module_info(m_module_data[m_cur_module_idx].discript);
            construct_version_data(m_cur_module_name);
        } else {
            m_obj_update_dom.clear_data();
        }
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
                // ui_version_cnt = 10;

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
                    [m_str_module_name]: idx,
                    [M_CONST_ATTRS]: {
                        [M_CONST_MODULE]: m_str_module_name,
                        [M_CONST_INDEX]: idx + "",
                        [M_CONST_VERSION]: "",
                        [M_CONST_LOG]: "",
                        [M_CONST_CREATE_TIME]: "",
                        [M_CONST_EDIT_TIME]: ""
                    }
                });

                // 保存本版数据
                m_version_data[m_str_module_name][idx] = new version_item();
                m_version_data[m_str_module_name][idx].set_module_name(m_str_module_name);
            }

            m_obj_req.version_info(m_version_param, function (err, arr_version_info) {
                if (!err) {
                    var ui_len = arr_version_info.length;
                    var arr_opt_version = [];
                    for (let idx = 0; idx < ui_len; idx++) {
                        var item = arr_version_info[idx];
                        var obj_attr = item.ATTRS;

                        if (obj_attr) {
                            var str_version = obj_attr[M_CONST_VERSION];
                            if (typeof str_version === "undefined") {
                                continue;
                            }

                            var ui_index = item[m_str_module_name];
                            if (!(m_version_data[m_str_module_name][ui_index] instanceof version_item)) {
                                m_version_data[m_str_module_name][ui_index] = new version_item();
                            }

                            m_version_data[m_str_module_name][ui_index].update_base_info(obj_attr);
                            m_version_data[m_str_module_name][ui_index].update_version_info(obj_attr);
                        }
                    }
                }

                create_option_version(m_version_data[m_str_module_name]);
            });
        }

        // 创建版本选项字符串
        function create_option_version (arr_data) {
            m_arr_select_version = [];
            if (typeof arr_data !== "object") {
                return;
            }

            var ui_len = Object.keys(arr_data).length;
            for (let idx = 0; idx < ui_len; idx++) {
                const item = arr_data[idx];
                if (item && item.module_name && item.version) {
                    m_arr_select_version.push({
                        id: item.index || idx,
                        name: item.version
                    });
                }
            }

            // 设置当前下拉列表选择项
            var obj_set_selected = get_first_opt(m_arr_select_version);
            update_select("version", m_arr_select_version, (obj_set_selected ? obj_set_selected.id : obj_set_selected));
            m_this.on_version_chg(obj_set_selected);
        }
    }


    // 获取列表第一个选项
    function get_first_opt (arr_opt) {
        if (typeof arr_opt === "object" && typeof arr_opt[0] === "object") {
            return arr_opt[0];
        }

        return false;
    }


    // ******************** 页面数据变动 版本 ******************** //
    // 版本号修改选项
    this.on_version_chg = function (obj_opt) {
        if (typeof obj_opt !== "object") {
            return;
        }

        if (typeof obj_opt.id !== "string") {
            obj_opt.id = obj_opt.id.toString();
        }

        m_cur_version_idx = obj_opt.id;
        m_cur_version_name = obj_opt.name;

        if (obj_opt.id !== "-1") {
            try {
                var obj_version = m_version_data[m_cur_module_name][m_cur_version_idx];
                if (obj_version) {
                    m_obj_update_dom.udpate_version_time(obj_version.create_time, obj_version.edit_time, obj_version.log);
                }
            } catch (error) { }
        } else {
            m_obj_update_dom.udpate_version_time("", "", "");
        }

        // 获取文件
        construct_file_data(m_cur_module_name, m_cur_version_name);
    };

    // 模块描述改动
    this.on_version_disctipt_chg = function (val) {
        if (typeof val !== "string") {
            return false;
        }

        m_cur_version_log = val;
    };


    // ******************** 文件 ******************** //
    function construct_file_data (str_module, str_vesion) {
        if (typeof str_module !== "string" || typeof str_vesion !== "string") {
            return false;
        }

        m_obj_req.version_file_cnt([{ [str_module]: str_vesion }], function (err, res) {
            if (res && res[0] && res[0].ATTRS) {
                var ui_cnt = res[0].ATTRS.COUNT;
                if (ui_cnt) {
                    ui_cnt = 3;
                    get_file_info(ui_cnt);
                }
            }
        });


        function get_file_info (ui_cnt) {
            var arr_file_param = [];

            for (var idx = 0; idx < ui_cnt; idx++) {
                arr_file_param.push({
                    [str_module]: [str_vesion],
                    [M_CONST_ATTRS]: {
                        [M_CONST_MODULE]: str_module,
                        [M_CONST_VER]: str_vesion,
                        [M_CONST_INDEX]: idx + "",
                        [M_CONST_MD5]: "",
                        [M_CONST_SIZE]: "",
                        [M_CONST_NAME]: "",
                        [M_CONST_CREATE_TIME]: "",
                        [M_CONST_EDIT_TIME]: "",
                    }
                });
            }

            m_obj_req.version_file_info(arr_file_param, function (err, arr_file_res) {
                if (arr_file_res) {
                    var ui_file_len = arr_file_res.length;
                    for (let idx = 0; idx < ui_file_len; idx++) {
                        // 构造文件夹属性结构
                        construct_file_true(params.files);
                    }
                }
            });
        }


    }


    // 提交
    this.commit = function () {
        add_module();
        function add_module () {
            var module_data = [{
                "-1": m_cur_module_name,
                [M_CONST_ATTRS]: {
                    [M_CONST_INDEX]: "-1",
                    [M_CONST_NAME]: m_cur_module_name,
                    [M_CONST_DESCRIPT]: m_cur_module_discript || m_obj_update_dom.get_module_discript()
                }
            }];
            m_obj_req.moudlue_info(module_data, function (err, res) {
                console.log("[写入模块返回参数]", res);
                add_version();
            }, true);
        }

        function add_version () {
            var version_data = [{
                "-1": m_cur_version_name,
                [M_CONST_ATTRS]: {
                    [M_CONST_MODULE]: m_cur_module_name,
                    [M_CONST_INDEX]: m_cur_version_idx,
                    [M_CONST_VERSION]: m_cur_version_name,
                    [M_CONST_LOG]: m_cur_version_log,
                    [M_CONST_CREATE_TIME]: "",
                    [M_CONST_EDIT_TIME]: "",
                }
            }];
            m_obj_req.version_info(version_data, function (err, res) {
                console.log("[写入版本返回参数]", res);
                add_file();
            }, true);
        }

        function add_file () {
            var file_data = [];
            get_onload_file_data();
            m_obj_req.version_file_info(file_data, function (err, res) {
                console.log("[写入文件返回参数]", res);
            }, true);
        }

        function get_onload_file_data (params) {
            var obj_file_input = m_obj_update_dom.get_file_target();
            if (!obj_file_input) {
                return;
            }

            var arr_files = obj_file_input.files;
            var ui_file_cnt = arr_files.length;
            if (ui_file_cnt) {
                // 上传
                on_sel_dir(function () {
                    var arr_file_param = [];
                    for (var idx = 0; idx < ui_file_cnt; idx++) {
                        arr_file_param.push({
                            // [str_module]: [str_vesion],
                            // [M_CONST_ATTRS]: {
                            //     [M_CONST_MODULE]: str_module,
                            //     [M_CONST_VER]: str_vesion,
                            //     [M_CONST_INDEX]: idx + "",
                            //     [M_CONST_MD5]: "",
                            //     [M_CONST_SIZE]: "",
                            //     [M_CONST_NAME]: "",
                            //     [M_CONST_CREATE_TIME]: "",
                            //     [M_CONST_EDIT_TIME]: "",
                            // }
                        });
                    }

                    m_obj_req.version_file_info(arr_file_param, function (err, arr_file_res) {
                        if (arr_file_res) {
                            var ui_file_len = arr_file_res.length;
                            for (let idx = 0; idx < ui_file_len; idx++) {

                            }
                        }
                    }, true);
                });
            }
        }
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
    this.udpate_version_time = function (t_create, t_edit, log) {
        var obj_create = document.getElementById("version_create_time");
        var obj_edit = document.getElementById("version_edit_time");
        var obj_edit = document.getElementById("version_edit_time");

        if (obj_create && typeof t_create === "string") {
            obj_create.children[1].innerHTML = t_create;
        }

        if (obj_edit && typeof t_edit === "string") {
            obj_edit.children[1].innerHTML = t_edit;
        }

        var obj_log = document.getElementById("version_text");
        if (obj_log && typeof log === "string") {
            obj_log.innerHTML = log;
        }
    };

    // 更新模块信息
    this.update_module_info = function (discript) {
        var obj_log = document.getElementById("modlue_text");
        if (obj_log && typeof discript === "string") {
            obj_log.innerHTML = discript;
        }
    };

    // 更新版本日志
    this.update_version_log = function (discript) {
        var obj_log = document.getElementById("version_text");
        if (obj_log && typeof discript === "string") {
            obj_log.innerHTML = discript;
        }
    };

    // 清空数据; 除了模块选项数据
    this.clear_data = function (params) {
        this.update_module_info("");
        this.udpate_version_time("", "", "");
        update_select("version", []);
    };

    this.get_module_discript = function () {
        var obj_module_discript = document.getElementById("modlue_text");
        if (obj_module_discript) {
            return obj_module_discript.innerHTML;
        }
    };

    this.get_file_target = function () {
        return document.getElementById("upd_file_input");
    };

}


function on_sel_dir (callback) {
    let ary_files = event.target.files;
    let ui_file_idx = 0;

    function uploader_next_file () {
        if (ui_file_idx >= ary_files.length) {
            console.log("finished");
            if (typeof callback === "function") {
                callback();
            }
        } else {
            calculate_next_md5();
        }
    }

    function calculate_next_md5 () {
        let cla_file_obj = ary_files[ui_file_idx];
        let obj_blob_slice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        const ui_slice_size = 2097152; /* 2M */
        let ui_slice_cnt = Math.ceil(cla_file_obj.size / ui_slice_size);
        let ui_slice_idx = 0;
        let cla_md5_oper = new SparkMD5.ArrayBuffer();
        let cla_file_reader = new FileReader();

        cla_file_reader.onload = function (e) {
            cla_md5_oper.append(e.target.result);  // Append array buffer
            ui_slice_idx++;

            if (ui_slice_idx < ui_slice_cnt) {
                load_next_slice();
            } else {
                let str_hex_md5 = cla_md5_oper.end();

                // save md5 
                ary_files[ui_file_idx].MD5 = str_hex_md5;
                ui_file_idx++;

                uploader_next_file();
            }
        };

        function load_next_slice () {
            let ui_sta_pos = ui_slice_idx * ui_slice_size;
            let ui_end_pos = (ui_sta_pos + ui_slice_size > cla_file_obj.size) ? cla_file_obj.size : (ui_sta_pos + ui_slice_size);

            cla_file_reader.readAsArrayBuffer(obj_blob_slice.call(cla_file_obj, ui_sta_pos, ui_end_pos));
        }

        load_next_slice();
    }

    uploader_next_file();

    /////////////////////////////
    /*
    let ary_files = event.target.files;
    for (let idx_file = 0; idx_file < ary_files.length; idx_file++) {

        let str_name = ary_files[idx_file].webkitRelativePath;
        let str_md5 = "aabbccddeeffee_" + idx_file;
        let str_size = ary_files[idx_file].size;
        // let str_data = ;

        let obj_file = ary_files[idx_file];
        let file_reader = new FileReader();

        file_reader.onloadend = function () {
            if (file_reader.error) {
                // layer.alert("文件加载失败")
            } else {

                let str_data = arrayBufferToBase64(file_reader.result);
                let str_param_key = "File_" + idx_file;

                let obj_req_json = {
                    func: "VERSION_FILE_INFO",
                    cmd: "sET",
                    params: [
                        {
                            [str_param_key]: idx_file,
                            attrs: {
                                MODULE: "frame",
                                ver: "1.0.5",
                                index: "-1",
                                md5: str_md5,
                                name: str_name,
                                size: str_size,
                                data: str_data
                            }
                        }
                    ]
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
        };
        file_reader.readAsArrayBuffer(obj_file);
        
    }
    // dom_elem_file.value = "";
    */
}



function construct_file_true (params) {
    console.log(params);
}
