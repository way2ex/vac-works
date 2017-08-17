var xmlhttp;
var isLogin = false;
var goodsIds = new Array();
var memberIds = new Array();
var orderscodes = new Array();
var orderTimes = new Array();

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
            if(notation_login != null){
                notation_login.style.display = "none";
            }
            //next request the orders
            //if the user has logined ,send ajax to the php and get the data
            var ajaxForOrders;
            if(window.XMLHttpRequest){
                ajaxForOrders = new XMLHttpRequest();
            }else{
                ajaxForOrders = new ActiveXObject("Microsoft.XMLHTTP");
            }
            ajaxForOrders.open("GET","/shop/php/returnMyOrders.php",true);
            ajaxForOrders.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            ajaxForOrders.onreadystatechange = function(){
                if(ajaxForOrders.readyState == 4 && ajaxForOrders.status == 200){
                    //alert(ajaxForOrders.responseText);
                    var xml = ajaxForOrders.responseXML;
                    var items = xml.getElementsByTagName("item");
                    var listitem_div = document.getElementById("listitem_div");
                    var model_list_item = document.getElementById("model_list_item");
                    for(var i = 0;i < items.length;i++){
                        var list_item = model_list_item.cloneNode(model_list_item);
                        list_item.setAttribute("id","");
                        listitem_div.appendChild(list_item);
                        list_item.getElementsByClassName("order-time")[0].innerHTML =
                        items[i].getElementsByTagName("orderTime")[0].innerHTML;
                        orderTimes[i] = items[i].getElementsByTagName("orderTime")[0].innerHTML;
                        list_item.getElementsByClassName("order-number")[0].innerHTML =
                        items[i].getElementsByTagName("orderscode")[0].innerHTML;
                        orderscodes[i] = items[i].getElementsByTagName("orderscode")[0].innerHTML;
                        var goodsId = items[i].getElementsByTagName("goodsId")[0].innerHTML;
                        var name =  items[i].getElementsByTagName("goodsName")[0].innerHTML;
                        var network = items[i].getElementsByTagName("network")[0].innerHTML;
                        var color = items[i].getElementsByTagName("color")[0].innerHTML;
                        var title = name+" "+network+" "+color+" "+"手机";
                        var title_a  = list_item.getElementsByClassName("order-goods-name")[0];
                        title_a.setAttribute("href","/shop/goodsdetail.html?q="+goodsId);
                        var img_a = list_item.getElementsByClassName("img_a")[0];
                        img_a.setAttribute("href","/shop/goodsdetail.html?q="+goodsId);
                        var img_p200 = list_item.getElementsByClassName("img_p200")[0];
                        var p200 = items[i].getElementsByTagName("p200")[0].innerHTML;
                        img_p200.setAttribute("src",p200);
                        //img_p200.setAttribute("alt",title);
                        list_item.getElementsByClassName("count")[0].innerHTML =
                        items[i].getElementsByTagName("goodsCount")[0].innerHTML;
                        list_item.getElementsByClassName("item-receiver")[0].innerHTML =
                        items[i].getElementsByTagName("realName")[0].innerHTML;
                        list_item.getElementsByClassName("allMoney")[0].innerHTML =
                        items[i].getElementsByTagName("total")[0].innerHTML;

                        var realName = items[i].getElementsByTagName("realName")[0].innerHTML;
                        if(!realName)
                        {
                            list_item.getElementsByClassName("item-receiver")[0].innerHTML = "你怎么不填写收货人呢？";
                        }else{
                            list_item.getElementsByClassName("item-receiver")[0].innerHTML =realName;
                        }
                        goodsIds[i] = goodsId;
                        var memberId = items[i].getElementsByTagName("memberId")[0].innerHTML;
                        memberIds[i] = memberId;

                    }
                    //alert(goodsIds[1]+memberIds[1]);
                    listitem_div.removeChild(model_list_item);

                    var rebuys = document.getElementsByClassName("rebuy");
                    for(var j = 0;j < rebuys.length;j++){
                        rebuys[j].index = j;
                        rebuys[j].onclick = function(){
                            var indexOf = this.index;
                            this.setAttribute("href","/shop/goodsdetail.html?q="+goodsIds[indexOf]);
                            //return false;
                        };
                    }

                    var add_comment = document.getElementsByClassName("add-comment");
                    for(var j = 0;j<add_comment.length;j++){
                        add_comment[j].index = j;
                        add_comment[j].onclick = function(){
                            //alert(this.index);
                            var indexOf = this.index;
                            this.setAttribute("href","/shop/comment.html?goodsId="+goodsIds[indexOf]+"&memberId="+memberIds[indexOf]+"&orderscode="+orderscodes[indexOf]+"&orderTime="+orderTimes[indexOf]);
                        };
                    }
                }
            };
            ajaxForOrders.send();

        }else {
        }
    }
};
xmlhttp.send("query=query_loginstate");
