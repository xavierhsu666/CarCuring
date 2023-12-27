// date-------------------------------------------------------

function date_getLastDate(d) {
    var d1 = new Date(d);
    d1.setDate(1);
    d1.setMonth(d1.getMonth() + 1);
    d1.setDate(d1.getDate() - 1);
    return d1;
}
function date_getDiff(t1, t2) {
    var gap = (t1 - t2) / (1000 * 3600 * 24);
    return gap;
}
// data-------------------------------------------------------

var data_work = {
    rmvDup: function (arr) {

        const filteredArray = arr.filter(function (ele, pos) {
            return arr.indexOf(ele) == pos;
        })
        return filteredArray;
    },

    sortByArr: function (arr, i, type) {
        var opt_arr = new Array;
        tmp = 0;
        var rmvDup_x = this.rmvDup(arr[i]);
        var rmvDup_y = new Array;
        var isValDup = (rmvDup_x.length < arr[i].length) ? 1 : 0;
        if (type = 'index') {
            if (isValDup) {
                for (let j = 0; j < rmvDup_x.length; j++) {
                    rmvDup_y[j]=[];
                }

            }
        }
        return opt_arr;

    },

    mergeTwoArrayByDict: function (arrDict, arrValue) {
        if (arrDict.length != arrValue.length) {
            console.log('Error! data_mergeTwoArrayBysameDict two parameter are not the same length!');
            return false;
        } else {

            var output = [[], []];
            var rmvdup_arrDict = data_removeDuplication(arrDict);
            if (rmvdup_arrDict.length == arrDict.length) {
                output = [arrDict, arrValue];
            } else {
                var rmvdup_arrValue = [];
                for (i = 0; i < rmvdup_arrDict.length; i++) {
                    tmp = 0;
                    for (j = 0; j < arrDict.length; j++) {
                        if (rmvdup_arrDict[i] == arrDict[j]) {
                            if (tmp == 0) {
                                rmvdup_arrValue[i] = 0;
                            }
                            rmvdup_arrValue[i] += parseInt(arrValue[j]);
                            // console.log(i, '<>', j, '->', rmvdup_arrValue[i]);
                            tmp++;

                        }
                    }
                }
            }

            output = [rmvdup_arrDict, rmvdup_arrValue];

            // console.log(output);
            return output;
        }
    }

}
function data_removeDuplication(arr) {

    const filteredArray = arr.filter(function (ele, pos) {
        return arr.indexOf(ele) == pos;
    })
    return filteredArray;
}
// Math-------------------------------------------

function math_getRnd(max, min) { //2~5
    var leng = max - min + 1;
    var rnd = Math.random();
    return Math.floor(rnd * leng) + min;

}

//format----------------------------------------------
function Format_transferHTMLtable_To_JSarray(table_id, istdinput) {
    myData = document.getElementById(table_id);
    my_liste = []
    if (istdinput) {
        //1為標題藍直接跳過
        for (var i = 1; i < myData.rows.length; i++) {
            el = myData.rows[i].children;
            my_el = []
            for (var j = 0; j < el.length; j++) {
                my_el.push(el[j].children[0].value);
            }

            my_liste.push(my_el);
        }
    } else {

        //這部分還沒測試過
        for (var i = 0; i < myData.rows.length; i++) {
            el = myData[i].rows.children;
            my_el = []
            for (var j = 0; j < el.length; j++) {
                my_el.push(el[j].innerText);
            }
            my_liste.push(my_el);

        }
    }
    return my_liste
}
function Format_checkJsonFormat(json) { //#json
    // Nested Count function only to be used for counting colons and commas
    countCharacter =
        function (string, character) {
            count = 0;
            for (var i = 0; i < string.length; i++) {
                if (string.charAt(i) == character) {  // counting : or ,
                    count++;
                }
            }
            return count;
        }

    json = json.trim();  // remove whitespace, start and end spaces

    // check starting and ending brackets
    if (json.charAt(0) != '{' || json.charAt(json.length - 1) != '}') {
        console.log('Brackets {} are not balanced');
        return false;
    }
    // else this line will check whether commas(,) are one less than colon(:)
    else if (!(countCharacter(json, ':') - 1 == countCharacter(json, ','))) {
        console.log('comma or colon are not balanced');
        return false;

    } else {
        json = json.substring(1, json.length - 1);  // remove first and last
        // brackets
        json = json.split(',');  // split string into array, and on each index there
        // is a key-value pair

        // this line iterate the array of key-value pair and check whether key-value
        // string has colon in between
        for (var i = 0; i < json.length; i++) {
            pairs = json[i];

            if (pairs.indexOf(':') == -1) {  // if colon not exist in b/w

                console.log('No colon b/w key and value');
                return false;
            }
        }
    }
    return true;
}

function format_transfer(val) { //#json
    // BetweenJasonAndArray
    var val_type;
    var outputformat;
    if (val == null) {
        return false;
    } else if (Array.isArray(val)) {
        val_type = "array";
        // console.log('type format is array. Transfer to JSON!');
        outputformat = JSON.stringify(val);
        return outputformat;
    } else if (typeof (val) == "string") {
        try {
            // val = JSON.parse(val);
            val_type = "json";
            outputformat = eval(val);
            // console.log((val));
            // console.log(typeof (val));
            // console.log('type format is JSON. Transfer to ARRAY! ');
            return outputformat;
        } catch (error) {
            is_json = false;
            val_type = "string";
            // Format_checkJsonFormat(val);
            outputformat = [val];
            return outputformat;

        }
    } else {
        return "Error: Val format is invalid";
    };

}
//localstorage---------------------------------------------
function localstorage_saveNamespace(id) {
    var namespace = 'x_space';
    var namespace_data = localStorage.getItem(namespace);
    if (namespace_data == null) {

        localStorage.setItem(namespace, "[" + JSON.stringify(id) + "]");
        console.log("[" + JSON.stringify(id) + "] --> saving ok");
        return true;
    } else {
        var arr = [];

        arr = format_transfer(namespace_data);
        arr_simu = format_transfer(namespace_data);
        arr_simu.unshift(id);
        arr_rmvDup = data_removeDuplication(arr_simu);

        if (arr_simu.length != arr_rmvDup.length) { //namespace duplication

            console.log("Error : there are same id in name space");
            return false;
        } else {
            arr.unshift(id);
            console.log(arr);
            arr = format_transfer(arr);
            localStorage.setItem(namespace, arr);
            console.log("[" + JSON.stringify(id) + "] --> saving ok");
            return true;
        }
    }

}
function localstorage_clearNamespace() {
    localStorage.removeItem('x_space');
}
function localstorage_queryNamespace() {
    var x = localStorage.getItem('x_space');
    return x;
}
function localstorage_setItem(id, val) {
    var namespace_data = localStorage.getItem(id);
    if (namespace_data == null) {
        localstorage_saveNamespace(id);
        localStorage.setItem(id, "[" + JSON.stringify(val) + "]");
        console.log("[" + JSON.stringify(val) + "] --> saving ok");
        return true;
    } else {
        localstorage_saveNamespace(id);
        var arr = [];
        arr = format_transfer(namespace_data);
        arr.unshift(val);
        arr = format_transfer(arr);
        localStorage.setItem(id, arr);
        console.log(arr + " --> saving ok");
        return true;
    }


}
/**
 * Localstroe tool box by kazuo
 */
var LS_manager = {
    'nameSpace': 'x_space',
    'DIYPackageUse': ['format_transfer', 'data_removeDuplication'],
    /**
     * 
     * @param {string} id save id to Namespace
     * @returns boolean suscess or fail
     */
    saveNameSpace: function (id) {
        var namespace = this.nameSpace;
        var namespace_data = localStorage.getItem(namespace);
        if (namespace_data == null) {
            localStorage.setItem(namespace, "[" + JSON.stringify(id) + "]");
            // console.log("[" + JSON.stringify(id) + "] --> saving ok");
            return true;
        } else {
            var arr = [];

            arr = format_transfer(namespace_data);
            arr_simu = format_transfer(namespace_data);
            arr_simu.unshift(id);
            arr_rmvDup = data_removeDuplication(arr_simu);

            if (arr_simu.length != arr_rmvDup.length) { //namespace duplication

                // console.log("Error : there are same id in name space");
                return false;
            } else {
                arr.unshift(id);
                // console.log(arr);
                arr = format_transfer(arr);
                localStorage.setItem(namespace, arr);
                // console.log("[" + JSON.stringify(id) + "] --> saving ok");
                return true;
            }
        }

    },
    clearNameSpace: function () {
        localStorage.removeItem(this.nameSpace);
        return true;
    },
    queryNameSpace: function () {
        var x = localStorage.getItem(this.nameSpace);
        // console.log(x);
        return x;
    },
    setItem: function (id, val) {
        var namespace_data = localStorage.getItem(id);
        if (namespace_data == null) {
            try {
                if (val.substring(0, 1) == '[' && val.substring(val.length - 1, val.length) == ']') {

                    this.saveNameSpace(id);
                    localStorage.setItem(id, val);
                    // console.log("[" + JSON.stringify(val) + "] --> saving ok");
                    return true;
                } else {
                    this.saveNameSpace(id);
                    localStorage.setItem(id, "[" + JSON.stringify(val) + "]");
                    // console.log("[" + JSON.stringify(val) + "] --> saving ok");
                    return true;
                }
            } catch {
                this.saveNameSpace(id);
                localStorage.setItem(id, "[" + JSON.stringify(val) + "]");
                // console.log("[" + JSON.stringify(val) + "] --> saving ok");
                return true;
            }

        } else {
            this.saveNameSpace(id);
            var arr = [];
            arr = format_transfer(namespace_data);
            arr.unshift(val);
            arr = format_transfer(arr);
            localStorage.setItem(id, arr);
            // console.log(arr + " --> saving ok");
            return true;
        }

    },
    removeItem: function (val) {
        var ls_qNamespace = this.queryNameSpace();
        var ls_qNamespace_new = [];
        ls_qNamespace = format_transfer(ls_qNamespace);//json轉陣列
        if (Array.isArray(val)) {
            //if val是陣列，先處理namespace
            k = 0;
            for (i = 0; i < val.length; i++) {
                if (ls_qNamespace.indexOf(val[i]) >= 0) {
                    ls_qNamespace.splice(ls_qNamespace.indexOf(val[i]), 1);
                }

            }
            // console.log(`${ls_qNamespace}`);
            ls_qNamespace = format_transfer(ls_qNamespace);//轉JSON
            // console.group('val 陣列下處理');
            // console.log(typeof (ls_qNamespace));
            // console.log(ls_qNamespace);
            // console.groupEnd();

            localStorage.setItem(this.nameSpace, ls_qNamespace);

            // //if val是陣列，在處理其localStorage

            for (i = 0; i < val.length; i++) {
                localStorage.removeItem(val[i]);
            }
            return true;
        } else if (typeof (val) == "string") {
            //if val是字串，先處理namespace
            k = 0;
            for (j = 0; j < ls_qNamespace.length; j++) {
                if (ls_qNamespace[j] != val) {
                    ls_qNamespace_new[k] = ls_qNamespace[j];
                    k++;
                }
            }
            ls_qNamespace_new = data_removeDuplication(ls_qNamespace_new);//移除重複
            ls_qNamespace_new = format_transfer(ls_qNamespace_new);//轉JSON
            localStorage.setItem(this.nameSpace, ls_qNamespace_new);
            // console.group('val 字串下處理');
            // console.log(typeof (ls_qNamespace_new));
            // console.log(ls_qNamespace_new);
            // console.groupEnd();

            // //if val是字串，在處理其localStorage
            localStorage.removeItem(val);
            return true;

        } else {

            return false;
        }
    },
    getItem(id) {
        var x = localStorage.getItem(id);
        if (x == null) {

            // console.log('ERROR: LS_MANAGER cannot find <<' + id+'>>');
            return x;
        } else {
            return x;

        }
    },
    isNotEmpty: function (kw) {
        return localStorage.getItem(kw) == null ? false : true;

    },
    exportAllData: function () {
        var ns_arr = format_transfer(this.queryNameSpace());
        var out_arr = new Array;
        cntt = 0;
        for (let i = 0; i <= ns_arr.length; i++) {
            out_arr[i] = [];
            if (i == 0) {
                for (let j = 0; j < ns_arr.length; j++) {
                    out_arr[i][j] = ns_arr[j];
                }
            } else {
                var cnt_arr = format_transfer(this.getItem(ns_arr[i - 1]));
                for (let j = 0; j < cnt_arr.length; j++) {
                    out_arr[i][j] = cnt_arr[j];
                }

            }
        }
        var ns = this.queryNameSpace();
        return out_arr;
    }

}
//chart----------------------------------------------------------------------------------
function chart_setChart(id, x, y) {
    var arr_date = format_transfer(localStorage.getItem(x));
    var arr = format_transfer(localStorage.getItem(y));
    if (Array.isArray(arr_date) == false || Array.isArray(arr) == false) {
        return false;
    } else {

        // chart making with charts.js and canvas--------------------------------------------------------
        var ctx = document.getElementById(id);//.getContext('2d');

        Chart.defaults.global.defaultFontColor = 'white';
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: arr_date,
                datasets: [{
                    label: false,
                    data: arr,
                    borderColor: 'rgb(244, 244, 244)',
                    borderWidth: 1,
                    backgroundColor: 'rgba(72, 201, 176, 0.3)'
                }]
            },
            options: {

                scales: {
                    y: {
                        beginAtZero: true

                    }
                },
                legend: {
                    labels: {
                        // 这个更具体的字体属性覆盖全局属性
                        fontColor: 'black'
                    },
                    display: false
                }
            }
        });
        var ctxHeight = parseInt(ctx.style.height.replace('px', '')) * 0.9;
        var ctxwidth = parseInt(ctx.style.width.replace('px', '')) * 0.9;
        var fontSizee = parseInt(window.getComputedStyle(document.getElementsByTagName('body')[0]).fontSize.replace('px', '')) * 0.45;

        ctx.style.height = ctxHeight + 'px';
        ctx.style.width = ctxwidth + 'px';
        myChart.options.scales.yAxes[0].ticks.minor.fontSize = fontSizee;
        myChart.options.scales.yAxes[0].ticks.fontSize = fontSizee;
        myChart.options.scales.xAxes[0].ticks.minor.fontSize = fontSizee;
        myChart.options.scales.xAxes[0].ticks.fontSize = fontSizee;
        myChart.update();
        // for (var x in charts) {
        //     // set/change the actual font-size
        //     charts[x].options.scales.xAxes[0].ticks.minor.fontSize = 200;
        //     charts[x].options.scales.yAxes[0].ticks.minor.fontSize = 200;

        //     // set proper spacing for resized font
        //     charts[x].options.scales.xAxes[0].ticks.fontSize = 200;
        //     charts[x].options.scales.yAxes[0].ticks.fontSize = 200;

        //     // update chart to apply new font-size
        //     charts[x].update();
        // }

    }
}