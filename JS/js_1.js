function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  tabid = document.getElementById(cityName);
  tab = document.getElementsByClassName('tab')[0];
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent_, tablinks_;
  tabcontent_ = document.getElementsByClassName("tabcontent_");
  for (i = 0; i < tabcontent_.length; i++) {
    tabcontent_[i].style.display = "none";

  }

  // Remove the background color of all tablinks_/buttons
  tablinks_ = document.getElementsByClassName("tablink_");
  for (i = 0; i < tablinks_.length; i++) {
    tablinks_[i].style.backgroundColor = "";
  }
  me_2 = document.getElementsByClassName("me_2");
  for (i = 0; i < me_2.length; i++) {
    me_2[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}
function load_LS_data_to_HTML() {
  var arr = ['crc_TW_area', 'crc_name', 'crc_tel', 'crc_loc'];
  var isallempty;
  var is_not_empty_cnt = 0;
  for (i = 0; i < arr.length; i++) {
    is_not_empty_cnt += LS_manager.isNotEmpty(arr[i]);
  }
  if (is_not_empty_cnt == arr.length) {
    // Local Store 目前有值
    isallempty = false;
  } else {
    // Local Store 目前無值
    isallempty = true;
  }
  if (isallempty != true) {
    console.group('Load contact list:');
    var arr_from_JSON = [];
    for (i = 0; i < arr.length; i++) {
      arr_from_JSON[i] = format_transfer(LS_manager.getItem(arr[i]));
      console.log(arr_from_JSON[i]);
    }
    for (i = 0; i < arr_from_JSON[1].length; i++) {
      let ol = document.createElement("ol");
      ol.class = "Contact_ul";
      let li = document.createElement("li");
      let dt = document.createElement("dt");
      let dd1 = document.createElement("dd");
      let dd2 = document.createElement("dd");
      ol.appendChild(li);
      ol.appendChild(dt);
      ol.appendChild(dd1);
      ol.appendChild(dd2);

      li.innerHTML = arr_from_JSON[0][i];
      dt.innerHTML = arr_from_JSON[1][i];
      dd1.innerHTML = "TEL : " + arr_from_JSON[2][i];
      dd2.innerHTML = "Address : " + arr_from_JSON[3][i];

      document.getElementById('contacts').appendChild(ol);

    }
    console.groupEnd();

    // memberpage_ncontacts.innerText = arr_from_JSON[1].length + " contacts";
  }
}
function showContactAddOption() {
  (crc.style.display == "block") ? crc.style.display = "none" : crc.style.display = "block";
}
function imgSizeFitAreaCoodrs() {
  var areas = document.getElementsByTagName('area');
  // alert(window.innerWidth);
  alert((window.innerWidth > 1024) ? 1024 : window.innerWidth);
  mycarpage1_img.width = (window.innerWidth > 1024) ? 1024 : window.innerWidth;
  alert(mycarpage1_img.width);
  mycarpage1_img.height = mycarpage1_img.width;
  var width_T_ratio = mycarpage1_img.width / 1024;
  var height_T_ratio = mycarpage1_img.height / 1024;
  var area1_c = [314, 490, 159];
  var area2_c = [821, 206, 158];
  var area3_c = [497, 695, 47];
  var area4_c = [936, 455, 44];
  var area_c = [area1_c, area2_c, area3_c, area4_c];

  mycarpage1_img.height = mycarpage1_img.width;
  console.group('imgSizeFitAreaCoodrs');
  console.log('width = ' + mycarpage1_img.width);
  console.log('height = ' + mycarpage1_img.height);
  console.log('width_T_ratio = ' + width_T_ratio);
  console.log('height_T_ratio = ' + height_T_ratio);
  for (i = 0; i < areas.length; i++) {
    var area_tgr = areas[i];
    area_tgr_coodrs = area_tgr.coords.split(',');
    var tmp_coodrs = '';
    for (j = 0; j < area_tgr_coodrs.length; j++) {
      if (j % 2 == 0) { //x
        tmp_coodrs = String(tmp_coodrs) + String(area_c[i][j] * width_T_ratio) + ',';
      } else {  //y
        // if (i == 2) {
        //   tmp_coodrs = String(tmp_coodrs) + String(area_tgr_coodrs[j] * height_T_ratio) + ',';

        // } else if (i == 1) {
        //   tmp_coodrs = String(tmp_coodrs) + String(area_tgr_coodrs[j] * height_T_ratio) + ',';
        // } else if (i == 3) {
        //   tmp_coodrs = String(tmp_coodrs) + String(area_tgr_coodrs[j] * height_T_ratio) + ',';
        // } else {
        //   tmp_coodrs = String(tmp_coodrs) + String(area_tgr_coodrs[j] * height_T_ratio) + ',';

        // }
        tmp_coodrs = String(tmp_coodrs) + String(area_c[i][j] * height_T_ratio * 0.95) + ',';

      }
    }
    console.log(tmp_coodrs.substring(0, tmp_coodrs.length - 1));
    areas[i].coords = tmp_coodrs.substring(0, tmp_coodrs.length - 1);
    // console.log(tmp_coodrs);

  }

  console.groupEnd();

}
function getLatestRecordsKM() {
  var arr = ['first_Record_KM', 'oc_input_KM', 'nomalmainlist_km', 'unnomalmainlist_km']
  var costList = [0];
  for (let i = 0; i < arr.length; i++) {
    var table = format_transfer(LS_manager.getItem(arr[i]));
    for (let j = 0; j < table.length; j++) {
      if (table[j] == "NaN" || table[j] == "undefined") {

      } else {
        costList.push(parseInt(table[j]));
        // console.log(parseInt(table[j]));

      }
    }
  }
  // 
  var latestkmrecords = Math.max(Math.max.apply(Math, costList));
  Kilometer_record.innerText = "Kilometer record : " + latestkmrecords;
  return latestkmrecords;
}
function showMe2(dom) {
  var menu = document.getElementsByClassName('grid_me')[0];
  var menu_chil = menu.children;
  var isActive = 0;


  if (dom.children[1].style.display == 'block') {
    for (i = 0; i < menu_chil.length; i++) {
      var menu_c_c = menu_chil[i].children;
      for (j = 1; j < menu_c_c.length; j++) {
        menu_c_c[j].style.display = 'none';
      }


    }
  } else {
    for (i = 1; i < dom.children.length; i++) {
      dom.children[i].style.display = 'block';
    }


  }

}
var normalunnormal = {
  _saveTable: function (id) {
    if (id == 'nomalmainlist_') {
      var arr = [id + 'item', id + 'cost', id + 'km', id + 'time'];
      var table = Format_transferHTMLtable_To_JSarray(id + 'table', true);
      var testArr = new Array;
      for (i = 0; i < arr.length; i++) {
        var tmp = [];
        testArr[i]=[];
        for (j = 0; j < table.length; j++) {
          console.log(table[j][i].value);

          tmp.push(table[j][i]);
          testArr[i].push(table[j][i]);
        }
        // console.log(arr[i]);
        // console.log(tmp);
        LS_manager.removeItem(arr[i]);
        LS_manager.setItem(arr[i], format_transfer(tmp));
      }
      console.log(testArr);

    } else {
      var arr = [id + 'sort', id + 'item', id + 'cost', id + 'km', id + 'time'];
      var table = Format_transferHTMLtable_To_JSarray(id + 'table', true);
      for (i = 0; i < arr.length; i++) {
        var tmp = [];
        for (j = 0; j < table.length; j++) {
          tmp.push(table[j][i]);
        }
        console.log(arr[i]);
        console.log(tmp);
        LS_manager.removeItem(arr[i]);
        LS_manager.setItem(arr[i], format_transfer(tmp));
      }
    }


    window.location.reload();

  }
}
var homepage = {
  _getCostData: function () {
    var arr = ['unnomalmainlist_time', 'nomalmainlist_time', 'unnomalmainlist_cost', 'nomalmainlist_cost'];
    var repair_time = []
    var repaire_cost = [];
    var output = [[], []]

    for (i = 0; i < arr.length; i++) {
      var arrTable = format_transfer(LS_manager.getItem(arr[i]));
      if (arrTable != false) {
        if (i == 0 || i == 1) {
          for (j = 0; j < arrTable.length; j++) {
            repair_time.push(format_transfer(LS_manager.getItem(arr[i]))[j]);
          }
        } else {
          for (j = 0; j < arrTable.length; j++) {
            repaire_cost.push(format_transfer(LS_manager.getItem(arr[i]))[j]);
          }
        }
      }
    }
    var rmvdup_repairTime = data_work.rmvDup(repair_time);
    if (rmvdup_repairTime.length == repair_time.length) {
      output = [repair_time, repaire_cost];
    } else {
      var rmvdup_repairCost = [];
      for (i = 0; i < rmvdup_repairTime.length; i++) {
        tmp = 0;
        for (j = 0; j < repair_time.length; j++) {
          if (rmvdup_repairTime[i] == repair_time[j]) {
            if (tmp == 0) {
              rmvdup_repairCost[i] = 0;
            }
            rmvdup_repairCost[i] += parseInt(repaire_cost[j]);
            // console.log(i, '<>', j, '->', rmvdup_repairCost[i]);
            tmp++;

          }
        }



      }
      output = [rmvdup_repairTime, rmvdup_repairCost];
    }
    // console.log(output);
    LS_manager.removeItem('summary_date');
    LS_manager.removeItem('summary_cost');
    LS_manager.setItem('summary_date', format_transfer(output[0]));
    LS_manager.setItem('summary_cost', format_transfer(output[1]));
    return output;
  },
  setHomePageChart: function () {
    chart_setChart('chart', 'oc_oc_date', 'oc_oc_km');

  },
  setCostChart: function () {
    homepage._getCostData();
    chart_setChart('chart1', 'summary_date', 'summary_cost');

  }
}
var mycarpage = {

  _switchPic: function (c_elmnt, o_elmnt) {
    var c = document.getElementById(c_elmnt);
    var o = document.getElementById(o_elmnt);
    c.style.display = 'none';
    o.style.display = 'block';



  },
  _getTableBysort: function () {
    var ipt_arr = CureTable._makeATracingTable();
    var table = document.getElementById('mycarpage_' + sort);
    table.innerHTML = '<tr><th>Item</th><th>chgTime</th><th>chgKm</th><th>isChg</th></tr>';
    for (let j = 0; j < ipt_arr[0].length; j++) {
      var tr = document.createElement('tr');
      for (let i = 0; i < ipt_arr.length; i++) {
        if (ipt_arr[1][j] == sort && (i == 2 || i == 7 || i == 8) || i == 11) {
          var td = document.createElement('td');
          td.innerText = ipt_arr[i][j];
          tr.appendChild(td);
        }
      }
      if (tr.children.length == 4) {

        table.appendChild(tr);
      }
      // console.log(tr.children.length!=4);

    }
  },

  _saveTablefunction(id) {
    var arr = ['mycarpage_item_' + id, 'mycarpage_km_' + id, 'mycarpage_date_' + id, 'mycarpage_cost_' + id];
    var table = Format_transferHTMLtable_To_JSarray('mycarpage_' + id, true);
    for (i = 0; i < arr.length; i++) {
      var tmp = [];
      for (j = 0; j < table.length; j++) {
        tmp.push(table[j][i]);
      }
      console.log(tmp);
      LS_manager.removeItem(arr[i]);
      LS_manager.setItem(arr[i], format_transfer(tmp));
    }

    window.location.reload();

  },

  _findSortedItem: function (sort) {
    var arr = ['itemChange_sort', 'itemChange_item', 'itemChange_cost', 'itemChange_km', 'itemChange_time'];
    var sortArr = format_transfer(LS_manager.getItem('itemChange_sort'));
    var itemArr = format_transfer(LS_manager.getItem('itemChange_item'));
    var item = [];

    for (i = 0; i < sortArr.length; i++) {
      if (sortArr[i] == sort) {
        item.push(itemArr[i]);
      }
    }
    return item;

  },
  _loadSortedTableNew: function (sort) {
    var table = document.getElementById('mycarpage_' + sort);
    table.innerHTML = '<tr><th>Item</th><th>Cost</th><th>KMed</th><th>chgTime</th></tr>';
    var arr = CureTable._makeATracingTable();
    var opt_arr = [[], [], [], []];
    for (let i = 0; i < arr[0].length; i++) {
      tmp = 0;
      if (arr[1][i] == sort) {
        for (let j = 0; j < arr.length; j++) {
          if ((j == 2 || j == 6 || j == 7 || j == 3) && i != 0) {
            opt_arr[tmp].push(arr[j][i]);

            // console.log(arr[j][i]);
            tmp++;
          }
        }
      }


    }
    for (let i = 0; i < opt_arr[0].length; i++) {
      var tr = document.createElement('tr');
      for (let j = 0; j < opt_arr.length; j++) {

        var td1 = document.createElement('td');
        td1.innerHTML = "<input type=text class='itemchange_table' value = '" + opt_arr[j][i] + "'readonly>";
        tr.appendChild(td1);
      }

      table.appendChild(tr);
    }


    return opt_arr;
    //2,6,7,3
  },
  _loadSortedTable: function (sort) {
    var arr = ['mycarpage_item_' + sort, 'mycarpage_km_' + sort, 'mycarpage_date_' + sort, 'mycarpage_cost_' + sort];
    var Sorted_arr = mycarpage._findSortedItem(sort);
    var table = document.getElementById('mycarpage_' + sort);
    table.innerHTML = '<tr><th>Item</th><th>KM</th><th>Date</th><th>Cost</th></tr>';
    if (LS_manager.getItem('mycarpage_item_' + sort) == null) {
      for (i = 0; i < Sorted_arr.length; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        td1.innerHTML = "<input type=text class='itemchange_table' value = '" + Sorted_arr[i] + "'>";
        // td1.innerHTML = "<input type=text class='itemchange_table' value=" + format_transfer(LS_manager.getItem(arr[j]))[i] + ">";

        td2.innerHTML = "<input type=number class='itemchange_table' >";
        td3.innerHTML = "<input type=date class='itemchange_table' >";
        td4.innerHTML = "<input type=number class='itemchange_table' >";
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        table.appendChild(tr);
      }
    } else {
      for (i = 0; i < Sorted_arr.length; i++) {
        var tr = document.createElement('tr');
        for (j = 0; j < arr.length; j++) {
          var loadArr = format_transfer(LS_manager.getItem(arr[j]));
          var td1 = document.createElement('td');
          if (j == 0) {
            td1.innerHTML = "<input type=text class='itemchange_table' value = '" + loadArr[i] + "'>";
          } else if (j == 1 || j == 3) {
            td1.innerHTML = "<input type=number class='itemchange_table' value = '" + loadArr[i] + "'>";

          } else {
            td1.innerHTML = "<input type=date class='itemchange_table' value = '" + loadArr[i] + "'>";

          }
          tr.appendChild(td1);
        }
        table.appendChild(tr);
      }
    }


  }
}
var ocpage = {
  _clickLinkHref: function () {
    oc_input_date.value = moment().format('YYYY-MM-DD');
  },
  _submitInput: function () {
    var ocp_oil = document.getElementById('oc_input_oil_select');
    var ocp_price = document.getElementById('oc_input_price');
    var ocp_liter = document.getElementById('oc_input_liter');
    var ocp_km = document.getElementById('oc_input_KM');
    var oc_input_date = document.getElementById('oc_input_date').value.replace('/', '-');
    console.log(oc_input_date);
    console.log(typeof (oc_input_date));
    var ocp_spend = parseInt(ocp_price.value) * parseInt(ocp_liter.value);
    LS_manager.setItem('oc_input_oil_select', ocp_oil.value);
    LS_manager.setItem('oc_input_price', ocp_price.value);
    LS_manager.setItem('oc_input_liter', ocp_liter.value);
    LS_manager.setItem('oc_input_KM', ocp_km.value);
    LS_manager.setItem('ocp_spend', ocp_spend);
    LS_manager.setItem('oc_input_date', oc_input_date);
    // oc_input_date
    this._calOilCons();
    window.location.reload();
    getLatestRecordsKM();
  },
  _calOilCons: function () {
    var rekms_oc = format_transfer(LS_manager.getItem('oc_input_KM'));
    var rekms_l = format_transfer(LS_manager.getItem('oc_input_liter'));
    var format_date = format_transfer(LS_manager.getItem('oc_input_date'));
    if (rekms_oc.length == 1) {
      var rekms_fir = format_transfer(LS_manager.getItem('first_Record_KM'))[0];
      var oilCons = Math.round(((rekms_oc[0] - rekms_fir) / rekms_l[0]), 2);
      LS_manager.setItem('oc_oc_km', oilCons);
      LS_manager.setItem('oc_oc_date', format_date);
      console.log('length = 1, ', oilCons, '=', rekms_oc[0], '-', rekms_fir, '/', rekms_l[0]);
      return oilCons;
    } else {
      var oilCons = Math.round(((rekms_oc[0] - rekms_oc[1]) / rekms_l[0]), 2);
      LS_manager.setItem('oc_oc_km', oilCons);
      LS_manager.setItem('oc_oc_date', format_date[0]);
      console.log('length != 1, ', oilCons, '=', rekms_oc[0], '-', rekms_oc[1], '/', rekms_l[0]);
      return oilCons;

    }
  },
  _reCalockm() {
    var arr = ['oc_input_oil_select', 'oc_input_price', 'oc_input_liter', 'oc_input_KM', 'ocp_spend', 'oc_input_date'];
    var oc_input_KM = format_transfer(LS_manager.getItem(arr[3]));
    var oc_oc_date = format_transfer(LS_manager.getItem(arr[5]));
    var oc_input_l = format_transfer(LS_manager.getItem(arr[2]));
    var first_km = format_transfer(LS_manager.getItem('first_Record_KM'))[0];
    oc_input_KM.unshift(first_km);
    var oc_oc_km = [];
    oc_input_KM.sort();
    console.log(oc_input_KM);
    for (let i = 0; i < oc_input_KM.length - 1; i++) {
      oc_oc_km[i] = Math.round(((oc_input_KM[i + 1] - oc_input_KM[i]) / oc_input_l[i]), 2);
      console.log(oc_oc_km[i], oc_input_KM[i + 1], oc_input_KM[i], oc_input_l[i]);
    }
    console.log(oc_oc_date);
    console.log(oc_oc_km);

    LS_manager.removeItem('oc_oc_date');
    LS_manager.removeItem('oc_oc_km');
    LS_manager.setItem('oc_oc_date', format_transfer(oc_oc_date));
    LS_manager.setItem('oc_oc_km', format_transfer(oc_oc_km));

    chart_setChart('chart', 'oc_oc_date', 'oc_oc_km');
    window.location.reload();
  },
  _calOcSpend: function (id) {
    var tgtinputchg_spend = document.getElementById('octable_spend_' + id);
    var input_price = document.getElementById('oc_input_price_' + id);
    var input_l = document.getElementById('oc_input_liter_' + id);

    tgtinputchg_spend.value = parseInt(input_price.value) * parseInt(input_l.value);
  },
  _getList() {
    ocpage_table.innerHTML = '';
    var arr = ['oc_input_oil_select', 'oc_input_price', 'oc_input_liter', 'oc_input_KM', 'ocp_spend', 'oc_input_date'];

    var xxx = format_transfer(LS_manager.getItem(arr[0]));

    ocpage_table.innerHTML = '<tr><th>Oil</th><th>Price</th><th>Liter</th><th>KM</th><th>spend</th><th>date</th></tr>';
    for (let i = 0; i < xxx.length; i++) {
      var tr = document.createElement('tr');
      for (let j = 0; j < arr.length; j++) {
        if (j == 4) {
          var yyy = format_transfer(LS_manager.getItem(arr[j]))[i];
          var td = document.createElement('td');
          var input = document.createElement('input');
          input.type = 'text';
          input.className = 'itemchange_table';
          input.readOnly = true;
          input.id = 'octable_spend_' + i;
          input.value = yyy;
          td.appendChild(input);
          tr.appendChild(td);

        } else {
          var yyy = format_transfer(LS_manager.getItem(arr[j]))[i];
          var td = document.createElement('td');
          var input = document.createElement('input');
          input.type = 'text';
          input.className = 'itemchange_table';
          input.value = yyy
          input.id = arr[j] + "_" + i;
          if (j == 2 || j == 1) {
            input.onchange = function () {
              ocpage._calOcSpend(i);
            }
          };
          td.appendChild(input);
          tr.appendChild(td);
        }
      }
      ocpage_table.appendChild(tr);

    }

    var hr = document.createElement('hr');
    ocpage_tableDiv.appendChild(hr);
    var div = document.createElement('div');
    div.className = 'contact_addDiv memberpage_button';
    div.onclick = function () {
      ocpage._clickListSave();
    }
    div.innerText = 'Save';
    ocpage_tableDiv.appendChild(div);
  },
  _clickListSave: function () {
    var xxx = Format_transferHTMLtable_To_JSarray('ocpage_table', true);
    var arr = ['oc_input_oil_select', 'oc_input_price', 'oc_input_liter', 'oc_input_KM', 'ocp_spend', 'oc_input_date'];

    // console.log(xxx);

    for (let j = 0; j < arr.length; j++) {
      LS_manager.removeItem(arr[j]);
    }
    for (let i = 0; i < xxx.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        // console.log(xxx[i][j]);
        LS_manager.setItem(arr[j], (xxx[i][j]));
        // LS_manager.setItem(arr[j],format_transfer(xxx[i]));
      }
    }
    ocpage._reCalockm();
  },

  _getOilPrice: function () {
    var ocp_price = document.getElementById('oc_input_price');
    var ocp_oil = document.getElementById('oc_input_oil_select');
    if (ocp_oil.value == '92') {
      ocp_price.value = 29.5;
    } else if (ocp_oil.value == '95') {
      ocp_price.value = 31;

    } else if (ocp_oil.value == '98') {
      ocp_price.value = 33.1;

    } else {
      alert("unselect the oil selection.");
      window.location.reload();
    }


  },



  _resetInput: function () {
    document.getElementById('oc_input_oil_select').value = "choose one";
    document.getElementById('oc_input_price').value = "(auto key in)";
    document.getElementById('oc_input_liter').value = null;
    document.getElementById('oc_input_KM').value = null;

  }
}
var itempage = {
  _saveTable: function () {
    var arr = ['itemChange_sort', 'itemChange_item', 'itemChange_cost', 'itemChange_km', 'itemChange_time'];
    var table = Format_transferHTMLtable_To_JSarray('itemChange_table', true);
    for (i = 0; i < arr.length; i++) {
      var tmp = [];
      for (j = 0; j < table.length; j++) {
        tmp.push(table[j][i]);
      }
      console.log(arr[i]);
      console.log(tmp);
      LS_manager.removeItem(arr[i]);
      LS_manager.setItem(arr[i], format_transfer(tmp));
    }

    window.location.reload();

  },

  _addBtn: function (id) {
    // console.log(id); //itemChange_table、nomalmainlist_table、unnomalmainlist_table
    var table = document.getElementById(id);
    var tr = document.createElement('tr')
    // console.log(LS_manager.getItem('itemChange_sort'));
    var latestKM = getLatestRecordsKM();
    var arr_itemChange_sort = data_work.rmvDup(format_transfer(LS_manager.getItem('itemChange_sort')));
    var today = moment().format('YYYY-MM-DD');

    var arr_itemChange_item = data_work.rmvDup(format_transfer(LS_manager.getItem('itemChange_item')));
    var arr = [arr_itemChange_sort, arr_itemChange_item];
    if (id == 'itemChange_table') {
      for (i = 0; i < 5; i++) {
        var td = document.createElement('td')
        td.innerHTML = "<input type=text class='itemchange_table'>";
        tr.appendChild(td);
      }
    } if (id == 'unnomalmainlist_table') {
      for (i = 0; i < 5; i++) {
        var td = document.createElement('td')
        var se = document.createElement('select')
        if (i == 0) {
          for (j = 0; j < arr[i].length; j++) {
            var op = document.createElement('option')
            op.innerText = arr[i][j];
            se.appendChild(op);
          }
          td.appendChild(se);

        } else if (i == 4) {

          td.innerHTML = "<input type=date class='itemchange_table' value=" + today + ">";
        } else if (i == 3) {

          td.innerHTML = "<input type=text class='itemchange_table' value =" + latestKM + ">";
        } else {
          td.innerHTML = "<input type=text class='itemchange_table'>";
        }
        tr.appendChild(td);
      }
    } else if (id == 'nomalmainlist_table') {
      for (i = 1; i < 5; i++) {
        var td = document.createElement('td')
        var se = document.createElement('select')
        if (i == 1) {
          for (j = 0; j < arr[i].length; j++) {
            var op = document.createElement('option')
            op.innerText = arr[i][j];
            se.appendChild(op);
          }
          td.appendChild(se);

        } else if (i == 4) {

          td.innerHTML = "<input type=date class='itemchange_table' value=" + today + ">";
        } else if (i == 3) {

          td.innerHTML = "<input type=text class='itemchange_table' value =" + latestKM + ">";
        } else {
          td.innerHTML = "<input type=text class='itemchange_table'>";
        }
        tr.appendChild(td);
      }
    } else {
      for (i = 0; i < 5; i++) {
        var td = document.createElement('td')
        var se = document.createElement('select')
        if (i == 0 || i == 1) {
          for (j = 0; j < arr[i].length; j++) {
            var op = document.createElement('option')
            op.innerText = arr[i][j];
            se.appendChild(op);
          }
          td.appendChild(se);

        } else if (i == 4) {

          td.innerHTML = "<input type=date class='itemchange_table'>";
        } else {
          td.innerHTML = "<input type=text class='itemchange_table'>";
        }
        tr.appendChild(td);
      }

    }
    table.appendChild(tr);

  },

  _defaultTable: function () {
    var itemChange_sort = ["BS", "BS", "BS", "WH", "ER", "ER", "ER", "ER", "ER", "ER", "ER", "BR", "ER", "ER", "ER", "ER", "BR", "ER", "ER", "BS", "BS", "BS", "WH"];
    var itemChange_item = ['牌照', '燃油稅', '強制險', '輪子', '電池', '機油', '動力機油', '機油芯', '空濾', '正時皮帶', '原廠汽油濾心', '煞車油', '離合器油', '變速箱油', '齒輪油', '水箱水', '煞車來令', '火星塞', '皮帶', '小保', '大保', '隔熱紙', '調胎'];
    var itemChange_cost = ['10000', '1920', '1866', '11200', '2000', '1466', '500', '200', '980', '3000', '500', '800', '900', '200', '200', '0', '200', '2400', '200', '4000', '15000', '13000', '0'];
    var itemChange_km = ['10000', '10000', '10000', '40000', '40000', '5000', '40000', '5000', '20000', '80000', '40000', '40000', '40000', '40000', '40000', '20000', '20000', '50000', '70000', '5000', '20000', '100000', '5000'];
    var itemChange_time = ['365', '365', '365', '1460', '1460', '180', '730', '180', '365', '2920', '730', '730', '730', '730', '730', '365', '365', '1825', '2555', '182.5', '730', '3650', '180'];
    var arr = ['itemChange_sort', 'itemChange_item', 'itemChange_cost', 'itemChange_km', 'itemChange_time'];
    var itemChange_table = [itemChange_sort, itemChange_item, itemChange_cost, itemChange_km, itemChange_time];

    for (i = 0; i < arr.length; i++) {
      var json1 = format_transfer(itemChange_table[i]);
      // console.log(json1);
      LS_manager.setItem(arr[i], json1);
    }
    itempage._loadTable('itemChange_table');
  },
  _loadTable: function (tableId) {


    // console.log(tableId);
    var arr_lst = ['itemChange_sort', 'itemChange_item', 'itemChange_cost', 'itemChange_km', 'itemChange_time'];
    // console.log(localStorage.getItem(tableId.split('_')[0] + '_sort'));
    var arr = [tableId.split('_')[0] + '_sort', tableId.split('_')[0] + '_item', tableId.split('_')[0] + '_cost', tableId.split('_')[0] + '_km', tableId.split('_')[0] + '_time'];
    var tmp = format_transfer(localStorage.getItem('itemChange_sort'));//tableId.split('_')[0] + '_sort'
    var tmp2 = format_transfer(localStorage.getItem(tableId.split('_')[0] + '_item'));//tableId.split('_')[0] + '_sort'
    // console.log(tableId.split('_'));

    if (tmp == false || tmp2 == false) {
      if ((tableId == 'nomalmainlist_table' || tableId == 'unnomalmainlist_table') && tmp == false) {
        alert('Please maintain the Maintain list first.');
        window.location.reload();
        return false;
      } else {
        console.log('_loadTable = null');
        return false;

      }
    } else {
      if (tableId == 'itemChange_table') {
        document.getElementById(tableId).innerHTML = '<tr>   <th>Sort</th>  <th>Item</th>  <th>Cost</th>  <th>KM</th>  <th>Day</th></tr>';

        for (i = 0; i < tmp.length; i++) {
          var tr = document.createElement("tr");
          for (j = 0; j < arr.length; j++) {
            var td = document.createElement("td");
            td.innerHTML = "<input type=text class='itemchange_table' value=" + format_transfer(LS_manager.getItem(arr[j]))[i] + ">";
            tr.appendChild(td);
          }
          document.getElementById(tableId).appendChild(tr);
        }

      } else {
        if (tableId == 'nomalmainlist_table') {
          document.getElementById(tableId).innerHTML = '<tr>   <th>Item</th>  <th>Cost</th>   <th>KM</th>  <th>Day</th></tr>';

        } else if (tableId == 'unnomalmainlist_table') {
          document.getElementById(tableId).innerHTML = '<tr>   <th>Sort</th>  <th>Item</th>  <th>Cost</th>  <th>KM</th>  <th>Day</th></tr>';

        }

        for (i = 0; i < tmp2.length; i++) {
          var tr = document.createElement("tr");
          for (j = 0; j < arr.length; j++) {
            // var td = document.createElement("td");
            var se = document.createElement("select");
            var input_arr = data_work.rmvDup(format_transfer(LS_manager.getItem(arr_lst[j])));

            if (j == 1) {
              var td = document.createElement("td");
              if (tableId == 'unnomalmainlist_table') {
                if (j == 0) {
                  for (k = 0; k < input_arr.length; k++) {
                    var op = document.createElement("option");
                    op.innerText = input_arr[k];
                    se.appendChild(op);
                  }
                  td.appendChild(se);

                } else {

                  td.innerHTML = "<input type=text class='itemchange_table' value=" + format_transfer(LS_manager.getItem(arr[j]))[i] + ">";
                }
              } else {
                for (k = 0; k < input_arr.length; k++) {
                  var op = document.createElement("option");
                  op.innerText = input_arr[k];
                  if (input_arr[k] == format_transfer(LS_manager.getItem(arr[j]))[i]) {
                    op.selected = true;
                  }
                  se.appendChild(op);
                }
                td.appendChild(se);
              }
            } else if (j == 4) {
              var td = document.createElement("td");
              // console.log(format_transfer(LS_manager.getItem(arr[j]))[i]);

              td.innerHTML = "<input type=date class='itemchange_table' value=" + format_transfer(LS_manager.getItem(arr[j]))[i] + ">";

            } else {

              if (tableId == 'unnomalmainlist_table') {
                var td = document.createElement("td");
                td.innerHTML = "<input type=text class='itemchange_table' value=" + format_transfer(LS_manager.getItem(arr[j]))[i] + ">";

              } else {
                if (j != 0) {
                  var td = document.createElement("td");
                  td.innerHTML = "<input type=text class='itemchange_table' value=" + format_transfer(LS_manager.getItem(arr[j]))[i] + ">";
                }
              }
            }
            // console.log(td);

            if (tableId == 'nomalmainlist_table' && (td == undefined || j == 0)) {
              // console.log('//');
            } else {
              // console.log(`tr = ${i}, td = ${j}, ${tr}, ${td.children[0].value}`);

              tr.appendChild(td);
            }
          }

          document.getElementById(tableId).appendChild(tr);
        }

      }

      return true;
    }
  },
  _resetTable: function () {
    var arr = ['itemChange_sort', 'itemChange_item', 'itemChange_cost', 'itemChange_km', 'itemChange_time'];
    for (i = 0; i < arr.length; i++) {
      LS_manager.removeItem(arr[i]);
    }
    window.location.reload();
  }
}
var memberpage = {
  _showFirstKmRecords: function () {
    var divv = document.createElement("div");
    divv.className = "memberpage_hashtag";
    divv.style.width = "30%";
    divv.style.border = "1px black solid";
    divv.id = "memberpage_ncontacts"
    divv.onclick = function () { memberpage._first_km_records_save(); }
    divv.innerHTML = "Save";
    var br = document.createElement("br");
    var table = document.createElement('table');
    var arr = ['MILEAGE', 'Time'];
    table.innerHTML = '<table><tr><th>DefaultItem</th><th>Value</th></tr></table>';
    for (let i = 0; i < 3; i++) {
      var tr = document.createElement('tr');
      for (let j = 0; j < 2; j++) {
        if (j == 0) {
          var td = document.createElement('td');
          if (i == 2) {
            td.colSpan = 2;
            td.appendChild(divv);
            tr.appendChild(td);
          } else {

            td.innerText = arr[i];
          }
          tr.appendChild(td);

        } else if (j == 1) {
          if (i == 0) {
            var input = document.createElement("input");
            input.type = "number";
            input.className = "itemchange_table";
            input.id = "firkmKeyin";
            var td = document.createElement('td');
            td.appendChild(input);
            tr.appendChild(td);
          } else if (i == 1) {
            var inputDate = document.createElement("input");
            inputDate.type = "date";
            inputDate.className = "itemchange_table";
            inputDate.id = "firdateKeyin";
            inputDate.value = moment().format('YYYY-MM-DD');
            var td = document.createElement('td');
            td.appendChild(inputDate);
            tr.appendChild(td);
          } else if (i == 2) {

            var td = document.createElement('td');
          }
        }
      }
      table.appendChild(tr);
    }
    memberpage_1.appendChild(table);

  },
  _isnewuser: function () {
    var x = LS_manager.getItem('first_Record_KM');
    memberpage_1.innerHTML = "";
    // console.log('ppppp -->'+x);
    if (x != null) {
      var check_hashtag_arr = ['first_Record_KM', 'crc_name', 'nomalmainlist_item', 'unnomalmainlist_item', 'itemChange_item'];
      var pp = document.createElement("pp");
      var br = document.createElement("br");
      pp.innerText = 'All yours achievements';

      pp.style = "width: fit-content;display: inline-block;cursor: pointer;";
      memberpage_1.appendChild(pp);
      memberpage_1.appendChild(br);
      for (i = 0; i < check_hashtag_arr.length; i++) {
        var xxx = format_transfer(LS_manager.getItem(check_hashtag_arr[i]));

        // console.log(xxx);
        if (i == 0 && xxx != null) {

          var divv = document.createElement("div");
          divv.className = "memberpage_hashtag";
          divv.id = "memberpage_firstkmrecord";
          // divv.onclick=function(){
          //   openPage('Contact_', button_Contact_, 'rgba(72, 201, 176, 0.3)');
          // }
          divv.style = "width: fit-content;display: inline-block;cursor: pointer;";
          divv.innerText = "Saved 1th km records !";
          memberpage_1.appendChild(divv);


        }
        if (i == 1 && xxx != false) {
          var divv = document.createElement("div");
          divv.className = "memberpage_hashtag";
          divv.id = "memberpage_ncontacts";
          divv.onclick = function () {
            openPage('Contact_', button_Contact_, 'rgba(72, 201, 176, 0.3)');
          }
          divv.style = "width: fit-content;display: inline-block;cursor: pointer;";
          divv.innerHTML = "Saved " + xxx.length + " contacts !";
          memberpage_1.appendChild(divv);

        }
        if ((i == 2) && xxx != false) {
          var divv = document.createElement("div");
          divv.className = "memberpage_hashtag";
          divv.id = "memberpage_ncontacts";
          divv.style = "width: fit-content;display: inline-block;cursor: pointer;";
          divv.innerHTML = "Saved " + xxx.length + " normal maintain list !";
          memberpage_1.appendChild(divv);

        }

        if ((i == 3) && xxx != false) {
          var divv = document.createElement("div");
          divv.className = "memberpage_hashtag";
          divv.id = "memberpage_ncontacts";
          divv.style = "width: fit-content;display: inline-block;cursor: pointer;";
          divv.innerHTML = "Saved " + xxx.length + " unnormal maintain list !";
          memberpage_1.appendChild(divv);

        }
        if ((i == 4) && xxx != false) {
          var divv = document.createElement("div");
          divv.className = "memberpage_hashtag";
          divv.id = "memberpage_ncontacts";
          divv.style = "width: fit-content;display: inline-block;cursor: pointer;";
          divv.innerHTML = "Saved " + xxx.length + " maintain list !";
          memberpage_1.appendChild(divv);

        }
      }

      return false;

    } else {
      memberpage_1.innerHTML = '';
      memberpage_query.style.display = 'none';
      var divv = document.createElement("div");
      var br = document.createElement("br");
      divv.className = "memberpage_hashtag";
      divv.id = "memberpage_ncontacts"
      divv.onclick = function () { memberpage._showFirstKmRecords(); }
      divv.style = "width: fit-content;display: inline-block;cursor: pointer;"
      divv.innerText = "Start Curing Your car !";
      memberpage_1.appendChild(divv);
      memberpage_1.appendChild(br);
      return true;

    }
  },

  _queryThisName: function (id) {
    memberpage_query_name.innerHTML = '';
    console.log(id.innerText);
    var data = LS_manager.getItem(id.innerText);
    data = format_transfer(data);
    for (i = 0; i < data.length; i++) {
      let divbtn = document.createElement("div");
      divbtn.className = "contact_addDiv memberpage_button";
      divbtn.innerText = data[i];
      memberpage_query_name.appendChild(divbtn);

    }

  },

  _queryNameSpace: function () {
    memberpage_query_namespace.innerHTML = '';
    let hr = document.createElement("hr");
    memberpage_query_namespace.appendChild(hr);
    var data = LS_manager.queryNameSpace();
    data = format_transfer(data);

    if (data == false) {
      let divbtn = document.createElement("div");
      divbtn.innerText = "LETS RECORD OUR FIRST DATA !";
      memberpage_query_namespace.appendChild(divbtn);
    } else {
      for (i = 0; i < data.length; i++) {
        let divbtn = document.createElement("div");
        divbtn.className = "contact_addDiv memberpage_button";
        divbtn.innerText = data[i];
        divbtn.addEventListener('click', function () {
          memberpage._queryThisName(divbtn);
        });
        memberpage_query_namespace.appendChild(divbtn);

      }
    }

    memberpage_query_namespace.appendChild(hr);

  },

  _first_km_records_save: function () {
    var input = firkmKeyin.value;
    var inputDate = firdateKeyin.value;
    LS_manager.setItem('first_Record_KM', input);
    LS_manager.setItem('first_Record_Date', inputDate);
    window.location.reload();

  },

  _clearAll: function () {
    var yes = confirm('Cleaned all the data ?');

    if (yes) {
      alert('Cleaned all the data, thanks for your using.');
      localStorage.clear();
      location.reload();
    } else {
      alert('cancel.');
      location.reload();

    }

  }
}
var contactpage = {
  saveTowebLocal: function () {
    var arr = ['crc_TW_area', 'crc_name', 'crc_tel', 'crc_loc'];
    var arr_data = [];

    //抓所有資料進陣列儲存
    for (i = 0; i < 4; i++) {
      var elmnt = document.getElementById(arr[i]);
      if (elmnt.value == "") {
        alert('輸入處不可空白');
        console.log("Save nothing!");
        return "";
      } else {
        arr_data[i] = elmnt.value;
        console.log("Saving " + arr[i] + " with value " + elmnt.value + " into arr ");
      }
    }

    for (i = 0; i < 4; i++) {
      LS_manager.setItem(arr[i], arr_data[i]);
    }
    window.location.reload();

  },
  load_all_localStore: function () {
    var arr = ['crc_TW_area', 'crc_name', 'crc_tel', 'crc_loc'];
    // console.group('local_store get item: ');
    var local_storage = [];
    for (i = 0; i < arr.length; i++) {
      local_storage[i] = localStorage.getItem(arr[i]); //1= crc_name, 2=crc_area, 3= crc_tel, 4= crc_loc
      // console.log(`i=${i}===>${local_storage[i]}`);
    }
    // console.groupEnd();
    return local_storage;
  }
}
var CureTable = {
  _makeATracingTable: function () {
    var arr = ['itemChange_time', 'itemChange_sort', 'itemChange_item', 'itemChange_cost', 'itemChange_km'];
    var arr1 = ['nomalmainlist_time', 'nomalmainlist_item', 'nomalmainlist_cost', 'nomalmainlist_km'];
    var firstKM = format_transfer(LS_manager.getItem('first_Record_KM'))[0];
    var latestKM = getLatestRecordsKM();
    var firstDay = format_transfer(LS_manager.getItem('first_Record_Date'))[0];
    var today = moment().format('YYYY-MM-DD');
    var opt_arr = [['optArr_time'], ['optArr_sort'], ['optArr_item'], ['optArr_cost'], ['optArr_km'], ['optArr_timeInstalled'], ['optArr_kmInstalled'], ['optArr_nextChgTime'], ['optArr_nextChgKm'], ['optArr_isChgTime'], ['optArr_isChgKm'], ['optArr_isChg']];
    var isNotEmpty_itemChanepage = (format_transfer(LS_manager.getItem(arr[0]))[0] != null) ? 1 : 0;
    var isNotEmpty_nomalmainlist = (format_transfer(LS_manager.getItem(arr1[0]))[0] != null) ? 1 : 0;
    // var itemArr = format_transfer(LS_manager.getItem(arr[i]));
    if (isNotEmpty_itemChanepage) { //先判斷周期維修保有無值 有就先長optarr
      for (let i = 0; i < arr.length; i++) {
        var tmmpp = format_transfer(LS_manager.getItem(arr[i]));
        for (let j = 0; j < tmmpp.length; j++) {
          opt_arr[i][j + 1] = tmmpp[j];
        }
      }
    } else {

      if (memberpage._isnewuser()) {
        button_memberpage_.click();
        alert('Please update the maintain list first !');
      };
      return false;

    }
    if (isNotEmpty_nomalmainlist) {//判斷定期維修紀錄有無值 有就長optarr
      var normalmain = new Array;
      for (let i = 0; i < arr1.length; i++) { //抓維護紀錄
        var tmmpp = format_transfer(LS_manager.getItem(arr1[i]));
        normalmain[i] = [];
        for (let j = 0; j < tmmpp.length; j++) {
          normalmain[i][j] = tmmpp[j];
        }

      }
      rmvDupArr_item = data_removeDuplication(normalmain[1]);
      rmvDupArr_date = [];
      rmvDupArr_km = [];
      for (let i = 0; i < rmvDupArr_item.length; i++) { //抓維護紀錄中不重複且最新的那筆，存rmvDupArr_x、rmvDupArr_date

        for (j = 0; j < normalmain[0].length; j++) {
          if (rmvDupArr_item[i] == normalmain[1][j]) {
            // console.log(i, j, normalmain[1][j], normalmain[0][j]);
            rmvDupArr_date[i] = normalmain[0][j];
            rmvDupArr_km[i] = normalmain[3][j];
          }
        }
      }
      for (j = 0; j < rmvDupArr_item.length; j++) {
        for (let i = 0; i < opt_arr[0].length; i++) {//24
          if (opt_arr[2][i] == rmvDupArr_item[j]) {
            opt_arr[5][i] = rmvDupArr_date[j];
            opt_arr[6][i] = rmvDupArr_km[j];
          }
        }
      }

      for (let i = 0; i < opt_arr[0].length; i++) {//24
        if (opt_arr[5][i] == null) {
          opt_arr[5][i] = firstDay;
        }
        if (opt_arr[6][i] == null) {
          opt_arr[6][i] = '0';
        }
        if (i != 0) {
          opt_arr[7][i] = moment(opt_arr[5][i]).add(parseInt(opt_arr[0][i]), 'days').format('YYYY-MM-DD');
          opt_arr[8][i] = parseInt(opt_arr[6][i]) + parseInt(opt_arr[4][i]);
        }
      }




    } else {
      for (i = 0; i < opt_arr[0].length; i++) { //針對optarr的K row
        if (i != 0) {
          opt_arr[5][i] = moment(firstDay).format('YYYY-MM-DD');
          opt_arr[7][i] = moment(opt_arr[5][i]).add(parseInt(opt_arr[0][i]), 'days').format('YYYY-MM-DD');
          opt_arr[6][i] = '0';
          opt_arr[8][i] = parseInt(opt_arr[6][i]) + parseInt(opt_arr[4][i]);
        }
      }


    }//沒有的話塞補預設值
    for (i = 0; i < opt_arr[0].length; i++) {
      if (i != 0) {
        if (parseInt(opt_arr[8][i]) <= parseInt(latestKM)) {
          opt_arr[10][i] = true;

        } else {
          opt_arr[10][i] = false;

        }
      }

    }



    for (i = 0; i < opt_arr[0].length; i++) {
      if (i != 0) {
        var momentDate = moment(opt_arr[5][i]).add(opt_arr[0][i], 'days').format('YYYY-MM-DD');
        var nowDate = moment().format('YYYY-MM-DD');
        opt_arr[7][i] = momentDate;
        if (momentDate <= nowDate) {
          opt_arr[9][i] = true;

        } else {
          opt_arr[9][i] = false;

        }
      }

    }
    for (i = 1; i < opt_arr[0].length; i++) {
      // if (opt_arr[9][i] == true || opt_arr[10][i] == true) {
      //   opt_arr[11][i] = true;
      // } else {

      //   opt_arr[11][i] = false;
      // }
      opt_arr[11][i] = opt_arr[9][i] + opt_arr[10][i];
    }

    // console.log(opt_arr);
    // console.log(isNotEmpty_nomalmainlist);
    return opt_arr;
  },

  _makeATracingTableOld: function () {
    var arr = ['itemChange_time', 'itemChange_sort', 'itemChange_item', 'itemChange_cost', 'itemChange_km'];
    var arr1 = ['nomalmainlist_time', 'nomalmainlist_sort', 'nomalmainlist_item', 'nomalmainlist_cost', 'nomalmainlist_km'];
    var tmp1 = format_transfer(LS_manager.getItem('itemChange_time'));
    var opt_arr = [['optArr_time'], ['optArr_sort'], ['optArr_item'], ['optArr_cost'], ['optArr_km'], ['optArr_timeInstalled'], ['optArr_kmInstalled'], ['optArr_nextChgTime'], ['optArr_nextChgKm'], ['optArr_isChgTime'], ['optArr_isChgKm'], ['optArr_isChg']];
    var firstKM = format_transfer(LS_manager.getItem('first_Record_KM'))[0];
    var firstDay = format_transfer(LS_manager.getItem('first_Record_Date'))[0];
    for (i = 0; i < arr.length; i++) {
      var tmmpp = format_transfer(LS_manager.getItem(arr[i]));
      for (j = 1; j <= tmp1.length; j++) {
        opt_arr[i][j] = tmmpp[j - 1];
      }

    }
    var tmp2 = format_transfer(LS_manager.getItem('nomalmainlist_item'));
    var m2 = moment(firstDay).fromNow();
    var latestKM = getLatestRecordsKM();
    if (tmp2 == false) {
      for (i = 0; i < arr.length; i++) { //處理哪個normallist
        var tmmpp = format_transfer(LS_manager.getItem(arr1[i]));

        for (k = 0; k < opt_arr[0].length; k++) { //針對optarr的K row
          if (i == 0 && k != 0) { //已使用天數 
            var momentDate = moment().format('YYYY-MM-DD');
            opt_arr[5][k] = moment(firstDay).format('YYYY-MM-DD');

          } else if (i == 4 && k != 0) { //已使用里程
            opt_arr[6][k] = firstKM;
          } else {
            opt_arr[i][k] = opt_arr[i][k];
          }
        }
      }

    } else {
      for (i = 0; i < arr.length; i++) { //處理哪個normallist
        var tmmpp = format_transfer(LS_manager.getItem(arr1[i]));
        console.log(tmmpp);
        for (j = 0; j < tmp2.length; j++) { //針對normallist中的j row
          for (k = 0; k < opt_arr[0].length; k++) { //針對optarr的K row
            if (tmp2[j] == opt_arr[2][k]) { //如果OPTARR表內有重複就更新 / 定位目標row數
              if (i == 0) {
                opt_arr[5][k] = tmmpp[j];

              } else if (i == 4) {
                opt_arr[6][k] = tmmpp[j];
                console.log(i, j, opt_arr[6][19]);
              }
            } else {//表示沒維修過(日期用0算/里程用0算)
              if (i == 0 && k != 0) { //前次更換時間
                var momentDate = moment(firstDay).format('YYYY-MM-DD');
                opt_arr[5][k] = momentDate;

              } else if (i == 4 && k != 0) { //前次更換里程
                opt_arr[6][k] = '0';
              } else {
                opt_arr[i][k] = opt_arr[i][k];
              }
            }
          }

        }
      }
    }

    var judgeChange = [];
    for (i = 0; i < opt_arr[0].length; i++) {
      if (i != 0) {
        var momentDate = moment(opt_arr[5][i]).add(opt_arr[0][i], 'days').format('YYYY-MM-DD');
        var nowDate = moment().format('YYYY-MM-DD');
        opt_arr[7][i] = momentDate;
        if (momentDate <= nowDate) {
          opt_arr[9][i] = true;

        } else {
          opt_arr[9][i] = false;

        }
      }

    }

    for (i = 0; i < opt_arr[0].length; i++) {
      if (i != 0) {
        opt_arr[8][i] = parseInt(opt_arr[4][i]) + parseInt(opt_arr[6][i]);
        if (opt_arr[8][i] <= latestKM) {
          opt_arr[10][i] = true;

        } else {
          opt_arr[10][i] = false;

        }
      }

    }

    for (i = 1; i < opt_arr[0].length; i++) {
      // if (opt_arr[9][i] == true || opt_arr[10][i] == true) {
      //   opt_arr[11][i] = true;
      // } else {

      //   opt_arr[11][i] = false;
      // }
      opt_arr[11][i] = opt_arr[9][i] + opt_arr[10][i];
    }
    return opt_arr;
  },
  addChgTracingTable: function () {
    var TracingTable = CureTable._makeATracingTable();


    for (i = 1; i < TracingTable[0].length; i++) {
      if (TracingTable[11][i] > 0) {
        var tr = document.createElement('tr');
        for (j = 1; j < TracingTable.length; j++) {
          if (j == 2 || j == 5 || j == 7 || j == 8) {
            var td = document.createElement('td');
            td.innerText = TracingTable[j][i];
            if (TracingTable[9][i] == true && j == 7) {
              td.style.fontWeight = 800;
              td.style.color = 'red';
            }

            if (TracingTable[10][i] == true && j == 8) {
              td.style.fontWeight = 800;
              td.style.color = 'red';

            }
            tr.appendChild(td);

          }
        }

        Kilometer_table.appendChild(tr);
      }

    }
  }
}
var exportpage = {
  _exportLSData: function () {
    var allLS = format_transfer(LS_manager.exportAllData());
    var text = exportpage_name.value;
    var tempLink = document.createElement("a");

    var taBlob = new Blob([allLS], { type: 'text/plain' });

    tempLink.setAttribute('href', URL.createObjectURL(taBlob));
    if (text.length > 0) {
      tempLink.setAttribute('download', `${text}.txt`);

    } else {
      tempLink.setAttribute('download', `LS_MANAER_${moment().format('YYYYMMDD')}.txt`);

    }

    tempLink.click();

    // URL.revokeObjectURL(tempLink.href);
  }
}

var importpage = {
  _importLSData: function () {
    var yes = confirm('we will clean all the data, and upload this version to cover it, keep going ?');

    if (yes) {
      var inputData = importpage_file.files[0];
      var tmpstr = '';
      if (inputData) {
        var reader = new FileReader();
        reader.readAsText(inputData, "UTF-8");
        reader.onload = function (evt) {
          inputData = evt.target.result;
          var inputArr = format_transfer(inputData);
          console.log(inputArr)
          for (let j = 1; j < inputArr.length; j++) {
            LS_manager.removeItem(inputArr[0][j - 1]);
            LS_manager.setItem(inputArr[0][j - 1], format_transfer(inputArr[j]));
            // console.log(inputArr[0][j-1])
            // console.log(format_transfer(inputArr[j]))

          }

          location.reload();
          return true;
        }


        reader.onerror = function (evt) {
          console.log("error reading file");
          return false;
        }

      }
    } else {
      alert('Cancel.');
      // location.reload();
      return false;

    }

  }
}