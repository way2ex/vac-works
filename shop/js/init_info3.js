var xmlhttp;
var isLogin = false;
var addressIds = new Array();
var indexOfAddress;
var addressIds = new Array();
if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
} else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}


xmlhttp.open("POST", "/shop/php/checklogin.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var xml = xmlhttp.responseXML;
        var node_user = xml.getElementsByTagName("user")[0];
        var node_state = xml.getElementsByTagName("state")[0];
        var state = node_state.innerHTML;

        if (state == "login") {
            isLogin = true;
            var username = node_user.getElementsByTagName("name")[0].innerHTML;
            var pagetop_ul = document.getElementById("pagetop-ul");
            var topli_register = document.getElementById("topli_register");
            var topli_login = document.getElementById("topli_login");
            pagetop_ul.removeChild(topli_register);
            pagetop_ul.removeChild(topli_login);

            var topli_username = document.createElement("li");
            topli_username.className = "topli";
            topli_username.setAttribute("id", "topli_username");
            pagetop_ul.insertBefore(topli_username, pagetop_ul.firstChild);

            var topli_a = document.createElement("a");
            topli_a.setAttribute("href", "userinfo.html");
            topli_a.style.color = "red";
            topli_a.style.fontSize = "16px";
            var topli_aText = document.createTextNode(username);
            topli_a.appendChild(topli_aText);
            topli_username.appendChild(topli_a);

            var notation_login = document.getElementById("notation_login");
            if (notation_login != null) {
                notation_login.style.display = "none";
            }
            //alert(notation_login);
            //notation_login.style.display = "none";
            var userinfo = document.getElementById("userinfo");
            userinfo.style.display = "block";

            //if the user has logined ,send ajax to the php and get the data
            var ajaxForAddress;
            if (window.XMLHttpRequest) {
                ajaxForAddress = new XMLHttpRequest();
            } else {
                ajaxForAddress = new ActiveXObject("Microsoft.XMLHTTP");
            }
            ajaxForAddress.open("GET", "/shop/php/returnAddress.php", true);
            ajaxForAddress.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajaxForAddress.onreadystatechange = function() {
                if (ajaxForAddress.readyState == 4 && ajaxForAddress.status == 200) {
                    var dom = ajaxForAddress.responseXML;
                    if(dom){
                        var xml = dom.getElementsByTagName("address")[0];
                        var node_addressIds = xml.getElementsByTagName("addressId");
                        var realNames = xml.getElementsByTagName("realName");
                        var provinces = xml.getElementsByTagName("province");
                        var citys = xml.getElementsByTagName("city");
                        var dists = xml.getElementsByTagName("dist");
                        var towns = xml.getElementsByTagName("town");
                        var streets = xml.getElementsByTagName("street");
                        var phones = xml.getElementsByTagName("phone");
                        var defaultAddresses = xml.getElementsByTagName("defaultAddress");
                        var usernames = xml.getElementsByTagName("username");
                        if (realNames.length > 0) {
                            var address_counts = document.getElementsByClassName("address_count");
                            for(var i = 0;i < address_counts.length;i++){
                                address_counts[i].innerHTML = realNames.length;
                            }
                            var length = realNames.length;
                            var addressdiv = document.getElementById("addressdiv");
                            var modeladdress = document.getElementById("modeladdress");
                            for (var i = 0; i < length; i++) {
                                var div_address = modeladdress.cloneNode(true);
                                div_address.setAttribute("id", "");
                                addressIds[i] = node_addressIds[i].innerHTML;
                                div_address.getElementsByClassName("addressitem_province")[0].innerHTML =
                                    provinces[i].innerHTML;
                                div_address.getElementsByClassName("addressitem_city")[0].innerHTML =
                                    citys[i].innerHTML;
                                // div_address.getElementsByClassName("addressitem_name")[0].innerHTML =
                                // realNames[i].innerHTML;
                                if (realNames[i].innerHTML) {
                                    div_address.getElementsByClassName("addressitem_name")[0].innerHTML =
                                        realNames[i].innerHTML;
                                } else {
                                    div_address.getElementsByClassName("addressitem_name")[0].innerHTML = "你想买给谁~";
                                }
                                div_address.getElementsByClassName("addressitem_dist")[0].innerHTML =
                                    dists[i].innerHTML;
                                div_address.getElementsByClassName("addressitem_town")[0].innerHTML =
                                    towns[i].innerHTML;
                                div_address.getElementsByClassName("street")[0].innerHTML =
                                    streets[i].innerHTML;
                                div_address.getElementsByClassName("phone")[0].innerHTML =
                                    phones[i].innerHTML;
                                div_address.getElementsByClassName("username")[0].innerHTML =
                                    usernames[i].innerHTML;
                                addressIds[i] = node_addressIds[i].innerHTML;
                                addressdiv.appendChild(div_address);
                                var isDefault = defaultAddresses[i].innerHTML;
                                if (isDefault == "true") {
                                    var classOf = div_address.getAttribute("class");
                                    div_address.setAttribute("class", classOf + " default_address");
                                    div_address.getElementsByClassName("default_notation")[0].style.display = "inline";
                                } else {
                                    div_address.getElementsByClassName("operation_setdefault")[0].style.display = "inline";
                                }
                                var edit = div_address.getElementsByClassName("operation_edit")[0];
                                edit.index = i;
                                edit.onclick = function() {
                                    indexOfAddress = this.index;
                                    var root_node = this.parentNode.parentNode.parentNode;
                                    var province = root_node.getElementsByClassName("addressitem_province")[0].innerHTML;
                                    var city = root_node.getElementsByClassName("addressitem_city")[0].innerHTML;
                                    var realName = root_node.getElementsByClassName("addressitem_name")[0].innerHTML;
                                    var dist = root_node.getElementsByClassName("addressitem_dist")[0].innerHTML;
                                    var town = root_node.getElementsByClassName("addressitem_town")[0].innerHTML;
                                    var street = root_node.getElementsByClassName("street")[0].innerHTML;
                                    var phone = root_node.getElementsByClassName("phone")[0].innerHTML;
                                    var thick = document.getElementById("thick");
                                    var receiver = document.getElementById("receiver");
                                    receiver.value = realName;

                                    var select_province = document.getElementById("select_province");
                                    //alert(select_province.options.length);
                                    // select_province.options[4].value = province;
                                    // select_province.options[4].selected = true;
                                    //select_province.text = province;
                                    var select_city = document.getElementById("select_city");
                                    var select_dist = document.getElementById("select_dist");
                                    var select_town = document.getElementById("select_town");
                                    var detailAddress = document.getElementById("detailAddress");
                                    detailAddress.value = street;
                                    var input_phone = document.getElementById("phone");
                                    input_phone.value = phone;
                                    thick.style.display = "block";

                                    selectOption(select_province, province);
                                    var provinceIndex = returnIndexOfText(select_province, province);

                                    insertArrayToSelect(select_city, cityArray[provinceIndex]);
                                    selectOption(select_city, city);
                                    var cityIndex = returnIndexOfText(select_city, city);

                                    insertArrayToSelect(select_dist, distArray[provinceIndex][cityIndex]);
                                    selectOption(select_dist, dist);
                                    var distIndex = returnIndexOfText(select_dist, dist);

                                    insertArrayToSelect(select_town, townArray[provinceIndex][cityIndex][distIndex]);
                                    selectOption(select_town, town);

                                    return false;
                                };
                                var delete_btn = div_address.getElementsByClassName("operation_delete")[0];
                                delete_btn.index = i;
                                delete_btn.onclick = function(){
                                    var indexOfAddress = this.index;
                                    var addressId = addressIds[indexOfAddress];

                                    var ajaxToDeleteAddress;
                                    if(window.XMLHttpRequest){
                                        ajaxToDeleteAddress = new XMLHttpRequest();
                                    }else{
                                        ajaxToDeleteAddress = new ActiveXObject("Microsoft.XMLHTTP");
                                    }
                                    ajaxToDeleteAddress.open("GET","/shop/php/deleteAddress.php?addressId="+addressId,true);
                                    ajaxToDeleteAddress.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                                    ajaxToDeleteAddress.onreadystatechange = function(){
                                        if(ajaxToDeleteAddress.readyState == 4 && ajaxToDeleteAddress.status == 200){
                                            if(ajaxToDeleteAddress.responseText == "success"){
                                                alert("删除成功！");
                                                window.location.reload(true);
                                            }else{
                                                alert("删除失败，请重试！");
                                            }
                                        }
                                    };
                                    ajaxToDeleteAddress.send();
                                };
                            }
                            addressdiv.removeChild(modeladdress);

                            var close_thick = document.getElementById("close_thick");
                            close_thick.onclick = function(){
                                var confirm = window.confirm("确定要退出地址编辑吗？");
                                if(confirm)
                                {var thick = document.getElementById("thick");
                                thick.style.display="none";}
                                return false;
                            };
                            var select_province = document.getElementById("select_province");
                            select_province.onchange = function(){
                                var provinceIndex = this.selectedIndex;
                                var select_city = document.getElementById("select_city");
                                insertArrayToSelect(select_city,cityArray[provinceIndex]);
                                insertArrayToSelect(select_dist,distArray[provinceIndex][0]);
                                insertArrayToSelect(select_town,townArray[provinceIndex][0][0]);
                            };
                            var select_city = document.getElementById("select_city");
                            select_city.onchange = function(){
                                var cityIndex = this.selectedIndex;
                                var select_province = document.getElementById("select_province");
                                var select_dist  = document.getElementById("select_dist");
                                var provinceIndex = select_province.selectedIndex;
                                insertArrayToSelect(select_dist,distArray[provinceIndex][cityIndex]);
                                insertArrayToSelect(select_town,townArray[provinceIndex][cityIndex][0]);
                            };

                            var select_dist = document.getElementById("select_dist");
                            select_dist.onchange = function(){
                                var distIndex = this.selectedIndex;
                                var select_province = document.getElementById("select_province");
                                provinceIndex = select_province.selectedIndex;
                                var select_city = document.getElementById("select_city");
                                cityIndex = select_city.selectedIndex;
                                var select_town = document.getElementById("select_town");
                                insertArrayToSelect(select_town,townArray[provinceIndex][cityIndex][distIndex]);

                            };
                            //add the event function to the saveAddress button
                            var saveAddress = document.getElementById("saveAddress");
                            saveAddress.onclick = function(){
                                var select_province = document.getElementById("select_province");
                                var provinceValue = getCheckedText(select_province);
                                var select_city = document.getElementById("select_city");
                                var cityValue = getCheckedText(select_city);
                                var select_dist = document.getElementById("select_dist");
                                var distValue = getCheckedText(select_dist);
                                var select_town = document.getElementById("select_town");
                                var townValue = getCheckedText(select_town);
                                var realNameValue = document.getElementById("receiver").value;
                                var streetValue = document.getElementById("detailAddress").value;
                                var phoneValue = document.getElementById("phone").value;
                                var addressId = addressIds[indexOfAddress];
                                if(realNameValue === "" || streetValue === "" || phoneValue === ""){
                                    alert("请输入完整的数据！");
                                    return false;
                                }
                                if(provinceValue == "请选择" || cityValue == "请选择" || distValue == "请选择" || townValue == "请选择"){
                                    alert("请选择准确的地址");
                                }
                                var postString = "province="+provinceValue+"&city="+cityValue+"&dist="+distValue+"&town="+townValue+"&realName="+realNameValue+"&street="+streetValue+"&phone="+phoneValue+"&addressId="+addressId;
                                var ajaxToSendAddress;
                                if(window.XMLHttpRequest){
                                    ajaxToSendAddress = new window.XMLHttpRequest();
                                }else{
                                    ajaxToSendAddress = new ActiveXObject("Microsoft.XMLHTTP");
                                }

                                ajaxToSendAddress.open("POST","/shop/php/alterAddress.php",true);
                                ajaxToSendAddress.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                                ajaxToSendAddress.onreadystatechange = function(){
                                    if(ajaxToSendAddress.readyState == 4 && ajaxToSendAddress.status == 200){
                                        if(ajaxToSendAddress.responseText == "success"){
                                            var　thick = document.getElementById("thick");
                                            alert("成功保存地址！");
                                            thick.style.display = "none";
                                            var addressitem_province = document.getElementsByClassName("addressitem_province")[indexOfAddress];
                                            addressitem_province.innerHTML = provinceValue;
                                            var addressitem_city = document.getElementsByClassName("addressitem_city")[indexOfAddress];
                                            addressitem_city.innerHTML = cityValue;
                                            var addressitem_name = document.getElementsByClassName("addressitem_name")[indexOfAddress];
                                            addressitem_name.innerHTML = realNameValue;
                                            var addressitem_dist = document.getElementsByClassName("addressitem_dist")[indexOfAddress];
                                            addressitem_dist.innerHTML = distValue;
                                            var addressitem_town = document.getElementsByClassName("addressitem_town")[indexOfAddress];
                                            addressitem_town.innerHTML = townValue;
                                            var street = document.getElementsByClassName("street")[indexOfAddress];
                                            street.innerHTML = streetValue;
                                            var phone = document.getElementsByClassName("phone")[indexOfAddress];
                                            phone.innerHTML = phoneValue;
                                        }else{
                                            alert("地址保存失败，请重试！");
                                        }
                                    }
                                };
                                ajaxToSendAddress.send(postString);

                                return false;
                            };
                        }
                    }

                }
            };
            ajaxForAddress.send(); //ajax for asking address

            var newaddress_buttons = document.getElementsByClassName("newaddress_button");
            for(var i = 0; i < newaddress_buttons.length;i++){
                newaddress_buttons[i].onclick = function(){
                    var thick = document.getElementById("thick");
                    thick.style.display = "block";
                    var close_thick = document.getElementById("close_thick");
                    close_thick.onclick = function(){
                        var confirm = window.confirm("确定要退出地址编辑吗？");
                        if(confirm)
                        {var thick = document.getElementById("thick");
                        thick.style.display="none";}
                        return false;
                    };
                    var select_province = document.getElementById("select_province");
                    select_province.onchange = function(){
                        var provinceIndex = this.selectedIndex;
                        var select_city = document.getElementById("select_city");
                        insertArrayToSelect(select_city,cityArray[provinceIndex]);
                        insertArrayToSelect(select_dist,distArray[provinceIndex][0]);
                        insertArrayToSelect(select_town,townArray[provinceIndex][0][0]);
                    };
                    var select_city = document.getElementById("select_city");
                    select_city.onchange = function(){
                        var cityIndex = this.selectedIndex;
                        var select_province = document.getElementById("select_province");
                        var select_dist  = document.getElementById("select_dist");
                        var provinceIndex = select_province.selectedIndex;
                        insertArrayToSelect(select_dist,distArray[provinceIndex][cityIndex]);
                        insertArrayToSelect(select_town,townArray[provinceIndex][cityIndex][0]);
                    };

                    var select_dist = document.getElementById("select_dist");
                    select_dist.onchange = function(){
                        var distIndex = this.selectedIndex;
                        var select_province = document.getElementById("select_province");
                        provinceIndex = select_province.selectedIndex;
                        var select_city = document.getElementById("select_city");
                        cityIndex = select_city.selectedIndex;
                        var select_town = document.getElementById("select_town");
                        insertArrayToSelect(select_town,townArray[provinceIndex][cityIndex][distIndex]);

                    };
                    //add the event function to the saveAddress button
                    var saveAddress = document.getElementById("saveAddress");
                    saveAddress.onclick = function(){
                        var select_province = document.getElementById("select_province");
                        var provinceValue = getCheckedText(select_province);
                        var select_city = document.getElementById("select_city");
                        var cityValue = getCheckedText(select_city);
                        var select_dist = document.getElementById("select_dist");
                        var distValue = getCheckedText(select_dist);
                        var select_town = document.getElementById("select_town");
                        var townValue = getCheckedText(select_town);
                        var realNameValue = document.getElementById("receiver").value;
                        var streetValue = document.getElementById("detailAddress").value;
                        var phoneValue = document.getElementById("phone").value;
                        //var addressId = addressIds[indexOfAddress];
                        if(realNameValue === "" || streetValue === "" || phoneValue === ""){
                            alert("请输入完整的数据！");
                            return false;
                        }
                        if(provinceValue == "请选择" || cityValue == "请选择" || distValue == "请选择" || townValue == "请选择"){
                            alert("请选择准确的地址");
                        }
                        var postString = "province="+provinceValue+"&city="+cityValue+"&dist="+distValue+"&town="+townValue+"&realName="+realNameValue+"&street="+streetValue+"&phone="+phoneValue;
                        var ajaxToSendAddress;
                        if(window.XMLHttpRequest){
                            ajaxToSendAddress = new window.XMLHttpRequest();
                        }else{
                            ajaxToSendAddress = new ActiveXObject("Microsoft.XMLHTTP");
                        }

                        ajaxToSendAddress.open("POST","/shop/php/addAddress.php",true);
                        ajaxToSendAddress.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                        ajaxToSendAddress.onreadystatechange = function(){
                            if(ajaxToSendAddress.readyState == 4 && ajaxToSendAddress.status == 200){
                                if(ajaxToSendAddress.responseText == "success"){
                                    var　thick = document.getElementById("thick");
                                    alert("成功保存地址！");
                                    thick.style.display = "none";
                                    window.location.reload("true");
                                    // var addressitem_province = document.getElementsByClassName("addressitem_province")[indexOfAddress];
                                    // addressitem_province.innerHTML = provinceValue;
                                    // var addressitem_city = document.getElementsByClassName("addressitem_city")[indexOfAddress];
                                    // addressitem_city.innerHTML = cityValue;
                                    // var addressitem_name = document.getElementsByClassName("addressitem_name")[indexOfAddress];
                                    // addressitem_name.innerHTML = realNameValue;
                                    // var addressitem_dist = document.getElementsByClassName("addressitem_dist")[indexOfAddress];
                                    // addressitem_dist.innerHTML = distValue;
                                    // var addressitem_town = document.getElementsByClassName("addressitem_town")[indexOfAddress];
                                    // addressitem_town.innerHTML = townValue;
                                    // var street = document.getElementsByClassName("street")[indexOfAddress];
                                    // street.innerHTML = streetValue;
                                    // var phone = document.getElementsByClassName("phone")[indexOfAddress];
                                    // phone.innerHTML = phoneValue;
                                }else{
                                    alert("地址保存失败，请重试！");
                                }
                            }
                        };
                        ajaxToSendAddress.send(postString);

                        return false;
                    };
                    return false;
                };
            }

        } else {}
    }
};
xmlhttp.send("query=query_loginstate");
