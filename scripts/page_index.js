
/* exported  obj_req_sdk */
/* exported  construct_update_req */
/* exported  construct_update_servier_data */


/* global $ */
/* global mc_sdk_req_mgr */
/* global mc_sdk_param */




function construct_update_req () {
    // UPGRADE_MODULE_CNT
    this.module_cnt = function (callback) {
        return this.request("UPGRADE_MODULE_CNT", [{ "UPGRADE_MODULE_CNT": "" }], callback);
    };

    // UPGRADE_MODULE_INFO
    this.moudlue_info = function (arr_param, callback, b_io) {
        return this.request("UPGRADE_MODULE_INFO", arr_param, callback, b_io);
    };

    // UPGRADE_VERSION_CNT
    this.version_cnt = function (arr_param, callback) {
        return this.request("UPGRADE_VERSION_CNT", arr_param, callback);
    };

    // UPGRADE_VERSION_INFO
    this.version_info = function (arr_param, callback, b_io) {
        return this.request("UPGRADE_VERSION_INFO", arr_param, callback, b_io);
    };

    // UPGRADE_FILE_CNT
    this.file_cnt = function (arr_param, callback) {
        return this.request("UPGRADE_FILE_CNT", arr_param, callback);
    };

    // UPGRADE_FILE_INFO
    this.file_info = function (arr_param, callback, b_io) {
        return this.request("UPGRADE_FILE_INFO", arr_param, callback, b_io);
    };

    // UPGRADE_FILE_EXIST
    this.file_exist = function (arr_param, callback, b_io) {
        return this.request("UPGRADE_FILE_EXIST", arr_param, callback, b_io);
    };

    // UPGRADE_FILE_DATA
    this.file_data = function (arr_param, callback, b_io) {
        return this.request("UPGRADE_FILE_DATA", arr_param, callback, b_io);
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
            data: JSON.stringify(obj_req_json),
            type: "post",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                if (res && res.PARAMS) {
                    console.log(res);
                    callback(false, res.PARAMS);
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
    var M_CONST_DATA = "DATA";
    // *****************  define const ***************** //

    // 请求对象
    var m_obj_req = new construct_update_req();
    // 定义单词请求数据长度
    var m_ui_each_req_len = 5;

    // ********************************************************************* DATA ********************************************************************* //
    // 模块数据
    var m_module_data = {};
    console.log("[模块数据]", m_module_data);
    // 版本数据
    var m_version_data = {};
    console.log("[版本数据]", m_version_data);
    var m_file_data = {};
    console.log("[文件数据]", m_file_data);
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
    // 文件
    var m_cur_file_idx = "";
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

    function file_item () {
        // m_file_data
        this.index = "";
        this.md5 = "";
        this.name = "";
        // file_path === name 仅仅用与页面数据保存
        this.file_path = "";
        this.size = "";
        this.data = "";

        this.update_file_info = function (obj_attrs) {
            if (this.check_val(obj_attrs.INDEX)) {
                this.index = obj_attrs.INDEX;
            }

            if (this.check_val(obj_attrs.MD5)) {
                this.md5 = obj_attrs.MD5;
            }

            if (this.check_val(obj_attrs.NAME)) {
                this.name = obj_attrs.NAME;
                this.file_path = obj_attrs.NAME;
            }

            if (this.check_val(obj_attrs.SIZE)) {
                this.size = obj_attrs.SIZE;
            }

            if (this.check_val(obj_attrs.DATA)) {
                this.data = obj_attrs.DATA;
            }
        };
    }

    // 继承
    version_item.prototype = new module_itme();
    file_item.prototype = new module_itme();


    // 清空版本数据（本地保存的）
    this.clear_version_data = function () {
        m_cur_version_idx = "";
        m_cur_version_name = "";
        m_cur_version_log = "";
        m_arr_select_version = [];
    };

    // 提交之后刷新
    this.update = function () {
        m_obj_req.module_cnt(callback_get_module_cnt);
    };

    // init
    m_obj_req.module_cnt(callback_get_module_cnt);

    // ******************** 模块 ******************** //
    function callback_get_module_cnt (err, arr_params) {
        let ui_module_cnt = 0;
        // 循环请求次数
        let ui_loop_cnt = 0;
        // 单次请求数据长度
        let ui_single_num = 5;
        // 请求下标
        let ui_req_idx = 0;
        let str_req_prefix = "MODULE_";

        if (arr_params && arr_params[0]) {
            ui_module_cnt = Number(arr_params[0].UPGRADE_MODULE_CNT);
            ui_loop_cnt = Math.ceil(ui_module_cnt / ui_single_num);

            if (0 === ui_module_cnt) {
                return;
            }

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
                    [str_req_prefix + idx]: idx,
                    [M_CONST_ATTRS]: {
                        [M_CONST_INDEX]: idx
                    }
                });
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

                    let attrs = item[M_CONST_ATTRS];
                    if (attrs && attrs.NAME) {
                        // 保存模块数据
                        let index = Object.keys(item)[0].split(str_req_prefix)[1];
                        m_module_data[index] = new module_itme();
                        m_module_data[index].update_base_info(attrs);
                    }
                }
            }

            ui_req_idx++;

            if (ui_req_idx < ui_loop_cnt) {
                loop_create_param_module_info(ui_req_idx);
            } else {
                create_option_module(m_module_data);
            }
        }
    }

    // 创建版本下拉框选项
    function create_option_module (obj) {
        console.log(obj);

        if (typeof obj === "object") {
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
        }

        // 设置当前下拉列表选择项
        var obj_set_selected = get_first_opt(m_arr_select_module);
        update_select("module", m_arr_select_module, (obj_set_selected ? obj_set_selected.id : obj_set_selected));
        m_this.on_module_chg(obj_set_selected);
    }


    // ******************** 数据切换  ******************** //
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
            // 新创建模块
            m_obj_update_dom.update_module_info("");
            this.on_version_chg(false);
        }
    };

    // 模块描述改动
    this.on_module_disctipt_chg = function (val) {
        if (typeof val !== "string") {
            return false;
        }

        m_cur_module_discript = val;
    };

    // 版本号修改选项; false === 没有版本数据需要清空; 下拉框数据变动
    this.on_version_chg = function (obj_opt) {
        if (typeof obj_opt === "object") {
            if (typeof obj_opt.id !== "string") {
                obj_opt.id = obj_opt.id.toString();
            }

            m_cur_version_idx = obj_opt.id;
            m_cur_version_name = obj_opt.name;

            if (obj_opt.id !== "-1") {
                // 版本选项切换
                try {
                    var obj_version = m_version_data[m_cur_module_name][m_cur_version_idx];
                    if (obj_version) {
                        m_obj_update_dom.udpate_version_time_log(obj_version.create_time, obj_version.edit_time, obj_version.log);
                    }
                } catch (error) { }
                // 获取文件
                construct_file_data(m_cur_module_name, m_cur_version_name);
            } else {
                // 新建版本
                m_obj_update_dom.udpate_version_time_log("", "", "");
                add_menu_tree([]);
            }
        }

        if (obj_opt === false) {
            // 当前没有版本数据
            m_obj_update_dom.clear_version_data();
            this.clear_version_data();
            return;
        }
    };

    // 模块描述改动
    this.on_version_disctipt_chg = function (val) {
        if (typeof val !== "string") {
            return false;
        }

        m_cur_version_log = val;
    };
    // ******************** 数据切换 ******************** //


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
            if (!err && arr_version_cnt) {
                ui_version_cnt = Number(arr_version_cnt[0][m_str_module_name]);
                if (ui_version_cnt) {
                    get_version_info();
                } else {
                    m_this.on_version_chg(false);
                }
            }
        });

        m_version_data[m_str_module_name] = [];
        function get_version_info () {
            var m_version_param = [];
            var str_prefix = "VERSION_";
            for (let idx = 0; idx < ui_version_cnt; idx++) {
                m_version_param.push({
                    [str_prefix + idx]: idx,
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

                            var ui_index = item[str_prefix + idx];
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
            console.log(arr_data);
            m_arr_select_version = [];
            if (typeof arr_data !== "object") {
                return;
            }

            var ui_len = Object.keys(arr_data).length;
            for (let idx = 0; idx < ui_len; idx++) {
                const item = arr_data[idx];
                if (item && item.module_name && item.version) {
                    m_arr_select_version.push({
                        id: item.index || idx + "",
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

    // ******************** 文件 ******************** //
    // str_module === 模块名称; str_vesion === 版本名称
    function construct_file_data (str_module, str_vesion) {
        if (typeof str_module !== "string" || typeof str_vesion !== "string") {
            return false;
        }

        var str_key = str_module + "_" + str_vesion;
        m_file_data[str_key] = [];

        m_obj_req.file_cnt([{ [str_module]: str_vesion }], function (err, res) {
            if (res && res[0] && res[0].ATTRS) {
                get_file_info(Number(res[0].ATTRS.COUNT));
            }
        });

        var obj_menu = new construct_file_menu();

        // 获取文件结束
        function get_file_data_done () {
            // 渲染文件目录
            obj_menu.set_file(m_file_data[str_key]);
            add_menu_tree(obj_menu.get_data());
        }

        function get_file_info (ui_cnt) {
            if (!ui_cnt) {
                get_file_data_done();
                return;
            }

            var ui_file_cnt = ui_cnt;
            var ui_each_cnt = m_ui_each_req_len;
            // 请求次数
            var ui_loop_cnt = Math.ceil(ui_file_cnt / ui_each_cnt);
            var ui_loop_idx = 0;
            m_file_data[str_key] = [];

            loop_create_param_file_info(ui_loop_idx);

            // 下一个分块
            function loop_file_next () {
                get_file_data_done();
                ui_loop_idx++;
                if (ui_loop_idx < ui_loop_cnt) {
                    loop_create_param_file_info(ui_loop_idx);
                } else {
                    get_file_data_done();
                }
            }

            // 分块请求文件信息
            function loop_create_param_file_info (start_idx) {
                let ui_idx_start = start_idx * ui_each_cnt;
                let ui_idx_end = ((ui_idx_start + ui_each_cnt) >= ui_file_cnt) ? ui_file_cnt : (ui_idx_start + ui_each_cnt);

                let arr_file_param = [];
                let ui_idx = ui_idx_start;
                while (ui_idx < ui_idx_end) {
                    arr_file_param.push({
                        ["file_" + ui_idx]: ui_idx + "",
                        [M_CONST_ATTRS]: {
                            [M_CONST_MODULE]: str_module,
                            [M_CONST_VER]: str_vesion,
                            [M_CONST_INDEX]: ui_idx + "",
                            [M_CONST_MD5]: "",
                            [M_CONST_SIZE]: "",
                            [M_CONST_NAME]: "",
                            [M_CONST_CREATE_TIME]: "",
                            [M_CONST_EDIT_TIME]: "",
                            [M_CONST_DATA]: ""
                        }
                    });
                    ui_idx++;
                }

                m_obj_req.file_info(arr_file_param, function (err, arr_file_res) {
                    if (arr_file_res) {
                        var ui_file_len = arr_file_res.length;
                        var ui_file_data_idx = ui_loop_idx * ui_each_cnt;
                        for (let idx = 0; idx < ui_file_len; idx++) {
                            var obj_attr = arr_file_res[idx].ATTRS;
                            m_file_data[str_key][ui_file_data_idx] = new file_item();
                            m_file_data[str_key][ui_file_data_idx].update_base_info(obj_attr);
                            m_file_data[str_key][ui_file_data_idx].update_file_info(obj_attr);
                            ui_file_data_idx++;
                        }
                    }

                    loop_file_next();
                });
            }
        }
    }

    // ********************************************************************* 提交 ********************************************************************* //
    this.commit = function () {
        m_obj_update_dom.is_commit(true);

        // 添加模块
        add_module();
        function add_module () {
            if (!check_module()) {
                return;
            }

            var module_data = [{
                "-1": m_cur_module_name,
                [M_CONST_ATTRS]: {
                    [M_CONST_INDEX]: "-1",
                    [M_CONST_NAME]: m_cur_module_name,
                    [M_CONST_DESCRIPT]: m_obj_update_dom.get_module_discript()
                }
            }];
            m_obj_req.moudlue_info(module_data, function (err, res) {
                console.log("[写入模块返回参数]", res);
                add_version();
            }, true);

            function check_module () {
                if (!m_cur_module_name || !m_obj_update_dom.get_module_discript()) {
                    // 模块描述
                    alert("必须填写模块描述");
                    m_obj_update_dom.is_commit(false);
                    return false;
                }

                return true;
            }
        }

        // 添加版本
        function add_version () {
            if (!check_version()) {
                return;
            }

            var version_data = [{
                "-1": m_cur_version_name,
                [M_CONST_ATTRS]: {
                    [M_CONST_MODULE]: m_cur_module_name,
                    [M_CONST_INDEX]: m_cur_version_idx,
                    [M_CONST_VERSION]: m_cur_version_name,
                    [M_CONST_LOG]: m_obj_update_dom.get_version_log(),
                    [M_CONST_CREATE_TIME]: "",
                    [M_CONST_EDIT_TIME]: "",
                }
            }];

            m_obj_req.version_info(version_data, function (err, res) {
                console.log("[写入版本返回参数]", res);
                get_onload_file_data();
            }, true);


            function check_version () {
                if (typeof m_cur_version_idx === "undefined" || !m_cur_version_name) {
                    m_this.update();
                    m_obj_update_dom.is_commit(false);
                    return false;
                }

                if (!m_obj_update_dom.get_version_log()) {
                    m_obj_update_dom.is_commit(false);
                    alert("必须填写版本日志");
                    return false;
                }

                return true;
            }
        }

        // 添加文件
        function get_onload_file_data () {
            var obj_file_input = m_obj_update_dom.get_file_target();
            if (!obj_file_input) {
                m_this.update();
                m_obj_update_dom.is_commit(false);
                return;
            }

            var arr_files = obj_file_input.files;
            var ui_file_cnt = arr_files.length;
            if (!ui_file_cnt) {
                m_this.update();
                m_obj_update_dom.is_commit(false);
                return;
            }

            // 上传文件
            on_sel_dir();

            // 请求
            // upload_done();

            function upload_done () {
                var arr_file_param = [];
                for (var idx = 0; idx < ui_file_cnt; idx++) {
                    var obj_file_item = arr_files[idx];
                    var str_path = obj_file_item.webkitRelativePath;
                    arr_file_param.push({
                        ["file_" + idx]: "",
                        [M_CONST_ATTRS]: {
                            [M_CONST_MODULE]: m_cur_module_name,
                            [M_CONST_VER]: m_cur_version_name,
                            [M_CONST_INDEX]: idx + "",
                            [M_CONST_MD5]: "",
                            [M_CONST_SIZE]: obj_file_item.size + "",
                            [M_CONST_NAME]: str_path.substring(str_path.indexOf("/") + 1),
                            [M_CONST_CREATE_TIME]: "",
                            [M_CONST_EDIT_TIME]: "",
                        }
                    });
                }
            }

            // ********************************************************************* 文件上传 ********************************************************************* //
            function on_sel_dir () {
                let ary_files = arr_files;
                let ui_file_idx = 0;
                let obj_ver_info_req = {
                    CMD: "set",
                    FUNC: "UPGRADE_FILE_INFO",
                    PARAMS: []
                };

                function operator_next_file () {
                    if (ui_file_idx >= ui_file_cnt) {
                        upload_status("正在归档所有文件信息...");

                        $.ajax({
                            url: "Api",
                            data: JSON.stringify(obj_ver_info_req),
                            type: "post",
                            contentType: "application/json",
                            dataType: "json",
                            success: function (obj_srv_dat) {
                                upload_status("所有文件信息归档完成");
                                m_this.update();
                            },
                            error: function (xhr, textStatus, errorThrown) {
                                console.log("failed msg : " + xhr.responseText);
                            }
                        });

                        console.log("file operator finished");
                    } else {
                        calculate_md5(ary_files[ui_file_idx], function (md5) {
                            var str_path = ary_files[ui_file_idx].webkitRelativePath;
                            obj_ver_info_req.PARAMS[ui_file_idx] = {
                                ["File_" + ui_file_idx]: "",
                                ATTRS: {
                                    MODULE: m_cur_module_name,
                                    VER: m_cur_version_name,
                                    INDEX: "-1",
                                    MD5: md5,
                                    NAME: str_path.substring(str_path.indexOf("/") + 1),
                                    SIZE: ary_files[ui_file_idx].size.toString()
                                }
                            };

                            console.log("File:" + ary_files[ui_file_idx].webkitRelativePath + "\nSize:" + ary_files[ui_file_idx].size + "\nMd5:" + md5);

                            /* check file exist */
                            let obj_req_json = {
                                func: "UPGRADE_FILE_EXIST",
                                cmd: "GET",
                                params: [{
                                    [md5]: ""
                                }]
                            };

                            upload_status("文件" + ui_file_idx + "： 准备秒传数据...");
                            $.ajax({
                                url: "Api",
                                data: JSON.stringify(obj_req_json),
                                type: "post",
                                contentType: "application/json",
                                dataType: "json",
                                success: function (obj_srv_dat) {
                                    let b_status = obj_srv_dat.PARAMS[0][md5.toUpperCase()];

                                    if ("0" == b_status) {
                                        upload_file(ary_files[ui_file_idx], md5, function () {
                                            upload_status("文件" + ui_file_idx + "： 常规传输完成");

                                            ui_file_idx++;
                                            operator_next_file();
                                        });
                                    } else {
                                        console.log("File " + md5 + "Exist, Not Upload");
                                        upload_status("文件" + ui_file_idx + ": 秒传数据完成");
                                        ui_file_idx++;
                                        operator_next_file();
                                    }
                                },
                                error: function (xhr, textStatus, errorThrown) {
                                    console.log("failed msg : " + xhr.responseText);
                                }
                            });

                        });
                    }
                }

                function upload_file (cla_file_obj, str_file_md5, fn_callback) {
                    let obj_blob_slice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
                    const ui_slice_size = 2097152; /* 2M */
                    let ui_slice_cnt = Math.ceil(cla_file_obj.size / ui_slice_size);
                    let ui_slice_idx = 0;
                    let cla_file_reader = new FileReader();

                    let ui_sta_pos = 0;
                    let ui_end_pos = 0;

                    cla_file_reader.onload = function (e) {

                        let obj_req_json = {
                            func: "UPGRADE_FILE_DATA",
                            cmd: "SET",
                            params: [{
                                [str_file_md5]: "",
                                attrs: {
                                    OFFSET: ui_sta_pos.toString(),
                                    LENGTH: (ui_end_pos - ui_sta_pos).toString(),
                                    DATA: arrayBufferToBase64(e.target.result)
                                }
                            }]
                        };

                        $.ajax({
                            url: "Api",
                            data: JSON.stringify(obj_req_json),
                            type: "post",
                            contentType: "application/json",
                            dataType: "json",
                            success: function (obj_srv_dat) {
                                upload_status("文件" + ui_file_idx + "： 上传 " + ui_slice_idx * 100.0 / ui_slice_cnt + "%");

                                ui_slice_idx++;
                                if (ui_slice_idx <= ui_slice_cnt) {
                                    send_next_slice();
                                } else {
                                    console.log("File " + str_file_md5 + "Upload finished");

                                    if (null != fn_callback) {
                                        fn_callback();
                                    }
                                }
                            },
                            error: function (xhr, textStatus, errorThrown) {
                                console.log("failed msg : " + xhr.responseText);
                            }
                        });
                    };

                    function send_next_slice () {
                        ui_sta_pos = ui_slice_idx * ui_slice_size;
                        ui_end_pos = (ui_sta_pos + ui_slice_size > cla_file_obj.size) ? cla_file_obj.size : (ui_sta_pos + ui_slice_size);

                        if (ui_sta_pos > ui_end_pos) {
                            ui_sta_pos = ui_end_pos;
                        }

                        cla_file_reader.readAsArrayBuffer(obj_blob_slice.call(cla_file_obj, ui_sta_pos, ui_end_pos));
                    }

                    send_next_slice();
                }

                function calculate_md5 (cla_file_obj, fn_callback) {
                    let obj_blob_slice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
                    const ui_slice_size = 2097152; /* 2M */
                    let ui_slice_cnt = Math.ceil(cla_file_obj.size / ui_slice_size);
                    let ui_slice_idx = 0;
                    let cla_md5_oper = new SparkMD5.ArrayBuffer();
                    let cla_file_reader = new FileReader();

                    cla_file_reader.onload = function (e) {
                        cla_md5_oper.append(e.target.result); // Append array buffer
                        ui_slice_idx++;

                        if (ui_slice_idx < ui_slice_cnt) {
                            load_next_slice();
                        } else {
                            let str_hex_md5 = cla_md5_oper.end();
                            if (null != fn_callback) {
                                fn_callback(str_hex_md5);
                            }
                        }
                    };

                    function load_next_slice () {
                        let ui_sta_pos = ui_slice_idx * ui_slice_size;
                        let ui_end_pos = (ui_sta_pos + ui_slice_size > cla_file_obj.size) ? cla_file_obj.size : (ui_sta_pos + ui_slice_size);

                        if (ui_sta_pos > ui_end_pos) {
                            ui_sta_pos = ui_end_pos;
                        }

                        cla_file_reader.readAsArrayBuffer(obj_blob_slice.call(cla_file_obj, ui_sta_pos, ui_end_pos));
                    }

                    load_next_slice();
                }

                operator_next_file();
            }

            // 更新状态
            function upload_status (msg) {
                document.getElementById("status").innerText = msg;
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

// ui更新数据相关
function ui_update_dom_val () {
    var obj_form = document.getElementById("upd_form");
    var obj_module_discript = document.getElementById("modlue_text");
    var obj_create = document.getElementById("version_create_time");
    var obj_edit = document.getElementById("version_edit_time");
    var obj_log = document.getElementById("version_text");
    var obj_file_input = document.getElementById("upd_file_input");

    // 更新版本数据
    this.udpate_version_time_log = function (t_create, t_edit, log) {
        if (obj_create && typeof t_create === "string") {
            obj_create.children[1].innerHTML = t_create;
        }

        if (obj_edit && typeof t_edit === "string") {
            obj_edit.children[1].innerHTML = t_edit;
        }

        if (obj_log && typeof log === "string") {
            obj_log.value = log;
        }
    };

    // 更新模块信息
    this.update_module_info = function (discript) {
        if (obj_module_discript && typeof discript === "string") {
            obj_module_discript.value = discript;
        }
    };

    // 更新版本日志
    this.update_version_log = function (discript) {
        if (obj_log && typeof discript === "string") {
            obj_log.value = discript;
        }
    };

    // 清空数据; 除了模块选项数据
    this.clear_version_data = function () {
        this.udpate_version_time_log("", "", "");
        update_select("version", []);
        add_menu_tree([]);
    };

    // 获取模块描述
    this.get_module_discript = function () {
        if (obj_module_discript) {
            return obj_module_discript.value;
        }
    };

    this.get_version_log = function () {
        if (obj_log) {
            return obj_log.value;
        }
    };

    // 获取文件input
    this.get_file_target = function () {
        return document.getElementById("upd_file_input");
    };

    this.clear_file_input = function name (params) {
        if (obj_file_input) {
            obj_file_input.select();
            document.selection.clear();
        }
    };

    this.is_commit = function (b) {
        if (obj_form) {
            var str_operation = b ? "add" : "remove";
            obj_form.classList[str_operation]("is_submitting");
        }
    };
}

// 构建文件目录
function construct_file_menu () {
    var m_arr_files = [];
    var m_tree_data = [];
    var m_this = this;
    // 设置的文件位置map
    var m_obj_map = {};

    this.set_file = function (arr) {
        if (typeof arr === "object") {
            m_arr_files = arr;
            m_tree_data = [];
            m_obj_map = {};
        }
    };

    this.set_item = function (index, name, pre, b_show) {
        if (typeof index !== "number" && typeof name !== "string" || typeof pre !== "object") {
            return;
        }

        var str_key = pre.str_parent + "_" + index + "_" + name;

        if (!m_obj_map[str_key]) {
            m_obj_map[str_key] = true;
            pre.arr_parent.push({
                title: name,
                children: [],
                // 节点是否展开
                spread: b_show || false
            });
        }

        return {
            arr_parent: pre.arr_parent[pre.arr_parent.length - 1].children,
            str_parent: str_key
        };
    };

    this.get_data = function () {
        if (m_arr_files) {
            var ui_file_cnt = m_arr_files.length;
            // 获取路径的名称
            var str_path_property = "file_path";
            var ui_fisrt_path = 0;
            if (m_arr_files.constructor === FileList) {
                str_path_property = "webkitRelativePath";
                ui_fisrt_path = 1;
            }

            for (var idx = 0; idx < ui_file_cnt; idx++) {
                const str_path = m_arr_files[idx][str_path_property];
                m_this.add_child(str_path, ui_fisrt_path);
            }
        }

        return m_tree_data;
    };

    this.add_child = function (str, ui_path_idx) {
        if (typeof str !== "string") {
            return "";
        }

        // 文件路径
        var arr_name = str.split("/");
        // console.log(arr_name);

        if (ui_path_idx) {
            arr_name.shift();
        }

        // 文件深度
        var ui_deep = arr_name.length;
        // 第一层目录去掉
        var ui_idx = 0;
        var parent_ark = {
            arr_parent: m_tree_data,
            str_parent: ""
        };

        while (ui_idx < ui_deep) {
            var b_show = false;
            if (ui_idx === 0 || ui_idx === 1) {
                b_show = true;
            }
            parent_ark = m_this.set_item(0, arr_name[ui_idx], parent_ark, b_show);
            ui_idx++;
        }
    };
}


function arrayBufferToBase64 (array) {
    array = new Uint8Array(array);
    var length = array.byteLength;
    var table = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9', '+', '/'
    ];
    var base64Str = "";
    for (var i = 0; length - i >= 3; i += 3) {
        var num1 = array[i];
        var num2 = array[i + 1];
        var num3 = array[i + 2];
        base64Str += table[num1 >>> 2] +
            table[((num1 & 0b11) << 4) | (num2 >>> 4)] +
            table[((num2 & 0b1111) << 2) | (num3 >>> 6)] +
            table[num3 & 0b111111];
    }
    var lastByte = length - i;
    if (lastByte === 1) {
        var lastNum1 = array[i];
        base64Str += table[lastNum1 >>> 2] + table[((lastNum1 & 0b11) << 4)] + '==';
    } else if (lastByte === 2) {
        var lastNum1 = array[i];
        var lastNum2 = array[i + 1];
        base64Str += table[lastNum1 >>> 2] +
            table[((lastNum1 & 0b11) << 4) | (lastNum2 >>> 4)] +
            table[(lastNum2 & 0b1111) << 2] +
            '=';
    }
    return base64Str;
}


function get_progress_bar_html (title, width, color) {
    if ("number" !== typeof width || "string" !== typeof title || "string" !== typeof color) {
        return "";
    }

    var default_color = color || "#86e01e";
    var html = "";
    var show_percent = width;

    if (100 < Number(width)) {
        show_percent = 100;
    }

    html = "<div class='item_pro_block'><div class='mc_lab' style=''>" + title + "</div><div class='mc_lab' style=''> " +
        width + "%</div><div class='mc_progress_bar_wrap' style=''><div class='mc_progress_bar' style='width:" +
        show_percent + "%;background-color:" + default_color + "'></div></div></div>";

    return html;
}