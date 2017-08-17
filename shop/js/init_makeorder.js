var xmlhttp;
//when get the total and the count of every order from
// the database ,add them to the follow parameters
var allCount = 0;
var allMoney = 0;
// var province = null;
// var city = null;
// var realName = null;
// var dist = null;
// var town = null;
// var street = null;
// var phone = null;
var addressIds = new Array();
var indexOfAddress;

var beijing_dist = new Array("海淀区","西城区","朝阳区","平谷区","昌平区","大兴区","房山区","密云区");
var shanghai_dist = new Array("黄埔区","徐汇区","长宁区","静安区","普陀区","虹口区","浦东新区","闵行区");
var tianjing_dist = new Array("和平区","河东区","河西区","南开区","河北区","红桥区","滨海新区","东丽区");
if(window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
}else{
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("POST","/shop/php/checklogin.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var xml = xmlhttp.responseXML;
        var node_user = xml.getElementsByTagName("user")[0];
        var node_state = xml.getElementsByTagName("state")[0];
        var state = node_state.innerHTML;

        if(state == "login"){
            isLogin = true;
            var username = node_user.getElementsByTagName("name")[0].innerHTML;
            var pagetop_ul = document.getElementById("pagetop-ul");
            var topli_register = document.getElementById("topli_register");
            var topli_login = document.getElementById("topli_login");
            pagetop_ul.removeChild(topli_register);
            pagetop_ul.removeChild(topli_login);

            var topli_username = document.createElement("li");
            topli_username.className = "topli";
            topli_username.setAttribute("id","topli_username");
            pagetop_ul.insertBefore(topli_username,pagetop_ul.firstChild);

            var topli_a = document.createElement("a");
            topli_a.setAttribute("href","userinfo.html");
            topli_a.style.color = "red";
            topli_a.style.fontSize = "16px";
            var topli_aText = document.createTextNode(username);
            topli_a.appendChild(topli_aText);
            topli_username.appendChild(topli_a);

            var notation_login = document.getElementById("notation_login");
            if(notation_login !== null){
                notation_login.style.display = "none";
            }
            var makeorder_address = document.getElementById("makeorder_address");
            makeorder_address.style.display = "block";

            //if the user has logined ,send ajax to the php and get the data
            var ajaxForAddress;
            if(window.XMLHttpRequest){
                ajaxForAddress = new XMLHttpRequest();
            }else{
                ajaxForAddress = new ActiveXObject("Microsoft.XMLHTTP");
            }
            ajaxForAddress.open("GET","/shop/php/returnAddress.php",true);
            ajaxForAddress.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            ajaxForAddress.onreadystatechange = function(){
                if(ajaxForAddress.readyState == 4 && ajaxForAddress.status == 200){
                     //alert(ajaxForAddress.responseText);
                    var dom = ajaxForAddress.responseXML;
                    var xml = dom.getElementsByTagName("address")[0];
                    var node_addressIds = xml.getElementsByTagName("addressId");
                    var  realNames = xml.getElementsByTagName("realName");
                    var provinces = xml.getElementsByTagName("province");
                    var citys = xml.getElementsByTagName("city");
                    var dists = xml.getElementsByTagName("dist");
                    var towns = xml.getElementsByTagName("town");
                    var streets = xml.getElementsByTagName("street");
                    var phones = xml.getElementsByTagName("phone");
                    var defaultAddresses = xml.getElementsByTagName("defaultAddress");
                    if(realNames.length > 0){
                        var length = realNames.length ;
                        var makeorder_address = document.getElementById("makeorder_address");
                        var modeldiv_address = document.getElementById("modeldiv_address");
                        for(var i = 0;i < length;i++){
                            var div_address = modeldiv_address.cloneNode(true);
                            div_address.setAttribute("id","");
                            addressIds[i] = node_addressIds[i].innerHTML;
                            div_address.getElementsByClassName("addressitem_province")[0].innerHTML =
                            provinces[i].innerHTML;
                            div_address.getElementsByClassName("addressitem_city")[0].innerHTML =
                            citys[i].innerHTML;
                            // div_address.getElementsByClassName("addressitem_name")[0].innerHTML =
                            // realNames[i].innerHTML;
                            if(realNames[i].innerHTML){
                                div_address.getElementsByClassName("addressitem_name")[0].innerHTML =
                                 realNames[i].innerHTML;
                            }else{
                                div_address.getElementsByClassName("addressitem_name")[0].innerHTML ="你想买给谁~";
                            }
                            div_address.getElementsByClassName("addressitem_dist")[0].innerHTML =
                            dists[i].innerHTML;
                            div_address.getElementsByClassName("addressitem_town")[0].innerHTML =
                            towns[i].innerHTML;
                            div_address.getElementsByClassName("street")[0].innerHTML =
                            streets[i].innerHTML;
                            div_address.getElementsByClassName("phone")[0].innerHTML =
                            phones[i].innerHTML;
                            div_address.checked = false;
                            div_address.onclick = function(){
                                if(this.checked == false){
                                    var div_addresses= document.getElementsByClassName("address_item");
                                    for(var i = 0;i < div_addresses.length;i++){
                                        div_addresses[i].checked = false;
                                        div_addresses[i].style.backgroundImage = "url(sr_images/XXbjLKQ7-237-106.png)";
                                    }
                                    this.checked = true;
                                    this.style.backgroundImage = "url(sr_images/FdXXbjLKQ.png)";
                                }else{
                                    this.checked = false;
                                    this.style.backgroundImage = "url(sr_images/XXbjLKQ7-237-106.png)";
                                }
                            };
                            makeorder_address.appendChild(div_address);
                            var isDefault = defaultAddresses[i].innerHTML;
                            if(isDefault == "true"){
                                var classOf = div_address.getAttribute("class");
                                div_address.setAttribute("class",classOf+" item_current");
                            }

                        }
                        makeorder_address.removeChild(modeldiv_address);

                        //next add the click event to ever alter button
                        var modify_address = document.getElementsByClassName("modify_address");
                        for(var j = 0;j<modify_address.length;j++){
                            modify_address[j].index = j;
                            modify_address[j].onclick = function(){
                                //get the index of the addressId in the array
                                indexOfAddress = this.index;
                                var root_node = this.parentNode.parentNode;
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
                                input_phone.value= phone;
                                thick.style.display = "block";

                                selectOption(select_province,province);
                                var provinceIndex = returnIndexOfText(select_province,province);

                                insertArrayToSelect(select_city,cityArray[provinceIndex]);
                                selectOption(select_city,city);
                                var cityIndex = returnIndexOfText(select_city,city);

                                insertArrayToSelect(select_dist,distArray[provinceIndex][cityIndex]);
                                selectOption(select_dist,dist);
                                var distIndex = returnIndexOfText(select_dist,dist);

                                insertArrayToSelect(select_town,townArray[provinceIndex][cityIndex][distIndex]);
                                selectOption(select_town,town);
                                return false;
                            };
                        }

                        var close_thick = document.getElementById("close_thick");
                        close_thick.onclick = function(){
                            var confirm = window.confirm("确定要退出地址编辑吗？");
                            if(confirm)
                            {var thick = document.getElementById("thick");
                            thick.style.display="none";}
                            return false;
                        };

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
                            // switch(selectedValue){
                            //     case "请选择":
                            //         resetSelect3();
                            //         break;
                            //     case "海淀区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"北太平庄","学院路","中关村","上地",
                            //     "清华园","北下关","西二旗","青龙镇","七侠镇","花园路","香山");
                            //         //trigOnChange(select_dist);
                            //         break;
                            //     case "西城区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"西长安街","金融街","广安门内","德胜门",
                            //     "月坛","展览路","天桥","什刹海","陶然亭","新街口","大栅栏");
                            //         //trigOnChange(select_dist);
                            //         break;
                            //     case "朝阳区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"和平街","八里庄","十八里堡","六里屯",
                            //     "左家庄","望京街道","亚运村","高碑店区","太阳宫","崔各庄","三间房");
                            //         //trigOnChange(select_dist);
                            //         break;
                            //     case "平谷区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"平谷镇","峪口镇","马坊镇","金海湖镇",
                            //         "东高村镇","山东庄镇","南独乐河镇","大华山镇","夏各庄镇","马昌营镇","王辛庄镇");
                            //         //trigOnChange(select_dist);
                            //         break;
                            //     case "昌平区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"南口镇","阳坊镇","十三陵镇","南邵镇",
                            //         "兴寿镇","百善镇","沙河镇","东小口镇","北七家镇");
                            //         //trigOnChange(select_dist);
                            //         break;
                            //     case "大兴区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"青云店镇","长子营镇","采育镇","礼贤镇",
                            //             "榆垡镇","清源街道","魏善庄镇","林校路街道");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "房山区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"青云店镇","长子营镇","采育镇","礼贤镇",
                            //             "榆垡镇","清源街道","魏善庄镇","林校路街道");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "密云区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"平谷镇","峪口镇","马坊镇","金海湖镇",
                            //             "东高村镇","山东庄镇","南独乐河镇","大华山镇","夏各庄镇","马昌营镇","王辛庄镇");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "和平区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"劝业场街道","小白楼街道","五大道街道","新兴街道",
                            //         "南营门街道","南市街道");
                            //         //trigOnChange(select_dist);
                            //         break;
                            //     case "河东区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"月川社区","榕根社区	","榕根社区	","鹿回头社区",
                            //             "港门村社区","下洋田社区","荔枝沟社区","清平乐社区");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "河西区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"大营门街道","下瓦房街道","桃园街道","挂甲寺街道",
                            //             "马场街道","越秀路街道","尖山街道","陈塘庄街道");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "南开区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"长虹街道","鼓楼街道","兴南街道","广开街道",
                            //             "万兴街道","学府街道","向阳路街道","嘉陵道街道");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "河北区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"光复道街道","望海楼街道","新开河街道","铁东路街道",
                            //             "建昌道街道","宁园街道","江都路街道","月牙河街道");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "滨海新区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"长虹街道","鼓楼街道","兴南街道","广开街道",
                            //             "万兴街道","学府街道","向阳路街道","嘉陵道街道");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "红桥区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"月川社区","榕根社区	","榕根社区	","鹿回头社区",
                            //             "港门村社区","下洋田社区","荔枝沟社区","清平乐社区");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "东丽区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"大营门街道","下瓦房街道","桃园街道","挂甲寺街道",
                            //             "马场街道","越秀路街道","尖山街道","陈塘庄街道");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "黄埔区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"南京东路街道","外滩街道","半淞园路街道","小东门街道",
                            //             "豫园街道","老西门街道","瑞金二路街道","淮海中路街道");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "徐汇区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"湖南路街道","天平路街道","枫林路街道","徐家汇街道",
                            //             "斜土路街道","龙华街道","瑞金二路街道","虹梅路街道");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "长宁区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"华阳路街道","新华路街道","江苏路街道","天山路街道",
                            //             "周家桥街道","虹桥街道","仙霞新村街道","程家桥街道");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "静安区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"江宁路街道","静安寺街道","南京西路街道","曹家渡街道",
                            //             "石门二路街道","天目西路街道","北站街道","程家桥街道");
                            //         //    trigOnChange(select_dist);
                            //         break;
                            //     case "普陀区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"湖南路街道","天平路街道","枫林路街道","徐家汇街道",
                            //             "斜土路街道","龙华街道","瑞金二路街道","虹梅路街道");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "虹口区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"南京东路街道","外滩街道","半淞园路街道","小东门街道",
                            //             "豫园街道","老西门街道","瑞金二路街道","淮海中路街道");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "浦东新区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"湖南路街道","天平路街道","枫林路街道","徐家汇街道",
                            //             "斜土路街道","龙华街道","瑞金二路街道","虹梅路街道");
                            //             //trigOnChange(select_dist);
                            //         break;
                            //     case "闵行区":
                            //         resetSelect3();
                            //         insertToSelect(select_town,"华阳路街道","新华路街道","江苏路街道","天山路街道",
                            //             "周家桥街道","虹桥街道","仙霞新村街道","程家桥街道");
                            //             //trigOnChange(select_dist);
                            //         break;
                            // }
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
            };
            ajaxForAddress.send();   //ajax for asking address

            //next confirm to make the order
            var ajaxForOrders;
            if(window.XMLHttpRequest){
                ajaxForOrders = new XMLHttpRequest();
            }else{
                ajaxForOrders = new ActiveXObject("Microsoft.XMLHTTP");
            }
            ajaxForOrders.open("GET","/shop/php/returnGoodsInCart.php",true);
            ajaxForOrders.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            ajaxForOrders.onreadystatechange = function(){
                if(ajaxForOrders.readyState == 4 && ajaxForOrders.status == 200){
                    var xml = ajaxForOrders.responseXML;
                    var items = xml.getElementsByTagName("item");
                    var goodsdiv = document.getElementById("goodsdiv");
                    var modeldiv_goods = document.getElementById("modeldiv_goods");
                    for(var i = 0; i< items.length;i++){
                        var div_goods = modeldiv_goods.cloneNode(true);
                        goodsdiv.appendChild(div_goods);
                        div_goods.setAttribute("id","");
                        var goodsId = items[i].getElementsByTagName("goodsId")[0].innerHTML;
                        var goodsName = items[i].getElementsByTagName("goodsName")[0].innerHTML;
                        var goodsPrice = items[i].getElementsByTagName("goodsPrice")[0].innerHTML;
                        var goodsCount = items[i].getElementsByTagName("goodsCount")[0].innerHTML;
                        var total = items[i].getElementsByTagName("total")[0].innerHTML;
                        var network = items[i].getElementsByTagName("network")[0].innerHTML;
                        var color = items[i].getElementsByTagName("color")[0].innerHTML;
                        var p200 = items[i].getElementsByTagName("p200")[0].innerHTML;
                        var title = goodsName+" "+network+" "+color+" 双卡双待";
                        var pic_a = div_goods.getElementsByClassName("p200div")[0];
                        pic_a.setAttribute("href","/shop/goodsdetail.html?q="+goodsId);
                        var p200img = div_goods.getElementsByClassName("p200")[0];
                        p200img.setAttribute("src",p200);
                        var goods_detailtitle = div_goods.getElementsByClassName("goods_detailtitle")[0];
                        goods_detailtitle.innerHTML = title;
                        goods_detailtitle.setAttribute("href","/shop/goodsdetail.html?q="+goodsId);
                        div_goods.getElementsByClassName("param_color")[0].innerHTML = color;
                        div_goods.getElementsByClassName("param_network")[0].innerHTML = network;
                        div_goods.getElementsByClassName("ordersgoods_singleprice")[0].innerHTML = goodsPrice;
                        div_goods.getElementsByClassName("ordergoods_count1")[0].innerHTML = goodsCount;
                        div_goods.getElementsByClassName("ordersgoods_totalprice")[0].innerHTML = total;
                        allCount += ~~goodsCount;
                        allMoney += ~~total;
                    }
                    goodsdiv.removeChild(modeldiv_goods);
                    document.getElementsByClassName("ordersgoods_totalmoney")[0].innerHTML = ~~allMoney;
                    document.getElementsByClassName("gobalance_goodscount")[0].innerHTML = ~~allCount;

                    var gobalance = document.getElementsByClassName("gobalance_go")[0];
                    gobalance.onclick = function(){
                        var ajaxToMakeOrder;
                        if(window.XMLHttpRequest){
                            ajaxToMakeOrder = new XMLHttpRequest();
                        }else{
                            ajaxToMakeOrder = new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        ajaxToMakeOrder.open("GET","/shop/php/makeorder.php",true);
                        ajaxToMakeOrder.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                        ajaxToMakeOrder.onreadystatechange = function(){
                            if(ajaxToMakeOrder.readyState == 4 && ajaxToMakeOrder.status == 200){
                                if(ajaxToMakeOrder.responseText == "success"){
                                    alert("下单成功，请耐心等待卖家发货~");
                                    window.location.reload(true);
                                }else{
                                    alert("下单失败，请重试！");
                                }
                            }
                        };
                        ajaxToMakeOrder.send();
                    };
                }
            };
            ajaxForOrders.send();
        }else {
        }
    }
};
xmlhttp.send("query=query_loginstate");
