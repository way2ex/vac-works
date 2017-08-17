var xmlhttp;
var isLogin = false;
var allMoney = 0;
var allCount = 0;
if(window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
}else{
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
var totalArray = new Array();
var cart_addcounts;
var cart_decreasecounts;
var orderscodes = new Array();

// var c = 2;
// var a = document.getElementsByClassName("ordergoods_param_1").length+1;
// var b = document.getElementsByClassName("ordergoods_param_2").length;
// if(a == c){
//     alert("true");
// }
//alert(a == b);

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

            //only when the user has logined ,the page will show the goods in the cart
            showGoodsInCart();
            var gobalance_go = document.getElementsByClassName("gobalance_go")[0];
            gobalance_go.onclick = function(){
                window.location.href = "makeorder.html";
            };
        }else {
        }
    }
};
xmlhttp.send("query=query_loginstate");



function showGoodsInCart(){

    var ajaxForGoods;
    if(window.XMLHttpRequest){
        ajaxForGoods = new XMLHttpRequest();
    }else{
        ajaxForGoods = new ActiveXObject("Microsoft.XMLHTTP");
    }

    ajaxForGoods.open("GET","/shop/php/returnGoodsInCart.php",true);
    ajaxForGoods.onreadystatechange = function(){
        if(ajaxForGoods.readyState == 4 && ajaxForGoods.status == 200){
            var cart_goodsdiv = document.getElementById("cart_goodsdiv");
            var model_div = document.getElementById("first_goodsdiv");
            // alert(ajaxForGoods.responseText);
            var xml = ajaxForGoods.responseXML;
            var items = xml.getElementsByTagName("item");
            for(var i=0;i < items.length;i++){
                //get the data in the item_node
                var orderscode = items[i].getElementsByTagName("orderscode")[0].innerHTML;
                orderscodes[i] = orderscode;
                var goodsId = items[i].getElementsByTagName("goodsId")[0].innerHTML;
                var goodsName = items[i].getElementsByTagName("goodsName")[0].innerHTML;
                var goodsPrice = items[i].getElementsByTagName("goodsPrice")[0].innerHTML;
                var goodsCount = items[i].getElementsByTagName("goodsCount")[0].innerHTML;
                var total = items[i].getElementsByTagName("total")[0].innerHTML;
                var network = items[i].getElementsByTagName("network")[0].innerHTML;
                var color = items[i].getElementsByTagName("color")[0].innerHTML;
                var p200 = items[i].getElementsByTagName("p200")[0].innerHTML;
                var goodsTitle = goodsName+" "+network+" "+color;

                totalArray[i] = goodsCount;
                var div_ordergoods = model_div.cloneNode(true);
                //alert(div_ordergoods.getElementsByClassName("ordergoods_param_1")[0].innerHTML);
                div_ordergoods.setAttribute("id","");
                div_ordergoods.style.display = "block";
                cart_goodsdiv.appendChild(div_ordergoods);
                //insert the datas into the div  and append the div into the cart_goodsdiv
                var img_a = div_ordergoods.getElementsByClassName("image_a")[0];
                img_a.setAttribute("href","/shop/goodsdetail.html?q="+goodsId);
                var img = img_a.getElementsByTagName("img")[0];
                img.setAttribute("src",p200);
                img.setAttribute("alt",goodsTitle);

                var tital_a = div_ordergoods.getElementsByClassName("ordergoods_detail1")[0].
                        getElementsByTagName("a")[0];
                tital_a.setAttribute("href","/shop/goodsdetail.html?q="+goodsId);
                tital_a.innerHTML = goodsTitle;

                div_ordergoods.getElementsByClassName("ordergoods_param_1")[0].innerHTML = "颜色："+color;
                div_ordergoods.getElementsByClassName("ordergoods_param_2")[0].innerHTML = "网络："+network;
                // alert(div_ordergoods.getElementsByClassName("ordergoods_price")[0].firstChild);
                div_ordergoods.getElementsByClassName("ordergoods_price")[0].getElementsByClassName("singleprice")[0].innerHTML = goodsPrice;
                div_ordergoods.getElementsByClassName("ordergoods_total")[0].getElementsByClassName("totalmoney")[0].innerHTML = total;
                var input_count = div_ordergoods.getElementsByClassName("input_count")[0];
                input_count.value = goodsCount;
                var cart_addcount = div_ordergoods.getElementsByClassName("cart_addcount")[0];
                //cart_addcount.index = k;
            }           //end inserting all the goods in the cart
            //remove the first model child
            cart_goodsdiv.removeChild(model_div);

            //Next,add the function to the addcount, decreasecount,and delete_btn
            var checkthiss = document.getElementsByClassName("checkthis");
            for(var j = 0 ; j< checkthiss.length;j++){
                checkthiss[j].onclick = function(){
                    caculaCountAndMoneyForCheckthis();
                };
            }

            //add the event to the checkall checkbox
            var checkall = document.getElementsByClassName("checkall")[0];
            checkall.onclick = function(){
                var checkthiss = document.getElementsByClassName("checkthis");
                var checked = this.checked;
                for(var j = 0;j<checkthiss.length;j++){
                    checkthiss[j].checked = checked;
                }
                caculaCountAndMoney();
            };
            //add the event to the + and - button
            //var totalmoneys = cart_goodsdiv.getElementsByClassName("totalmoney");
            cart_addcounts = cart_goodsdiv.getElementsByClassName("cart_addcount");
            cart_decreasecounts = cart_goodsdiv.getElementsByClassName("cart_decreasecount");
            var input_counts = cart_goodsdiv.getElementsByClassName("input_count");
            var totals = cart_goodsdiv.getElementsByClassName("totalmoney");
            var singleprices = cart_goodsdiv.getElementsByClassName("singleprice");
            var delete_orders = cart_goodsdiv.getElementsByClassName("delete_order");
            for(var k = 0 ;k < input_counts.length;k++){
                //listen to the change of the value of the input
                input_counts[k].index = k;
                input_counts[k].oninput = function(){
                    var value = this.value;
                    if(isNaN(value)){
                        this.value = totalArray[k];
                    }else if(value > 100 || value < 1){
                        this.value = totalArray[k];
                    }else{
                        totalArray[this.index] = value;
                    }
                    totals[this.index].innerHTML = this.value * singleprices[this.index].innerHTML;
                    caculaCountAndMoney();
                };
                cart_addcounts[k].index = k;
                //add function to the add button
                cart_addcounts[k].onclick = function(){
                    var input = this.parentNode.getElementsByTagName("input")[0];
                    var value = input.value;
                    var index = this.index;
                    if(value < 100){
                        totalArray[index]++;
                        input.value = totalArray[index];
                    }
                    totals[this.index].innerHTML = input_counts[index].value * singleprices[index].innerHTML;
                    caculaCountAndMoney();
                    return false;
                };

                cart_decreasecounts[k].index = k;
                cart_decreasecounts[k].onclick = function(){
                    var input = this.parentNode.getElementsByTagName("input")[0];
                    var value = input.value;
                    var index = this.index;
                    if(value > 1){
                        totalArray[index]--;
                        input.value = totalArray[index];
                    }
                    totals[this.index].innerHTML = input_counts[index].value * singleprices[index].innerHTML;
                    caculaCountAndMoney();
                    return false;
                };
                delete_orders[k].index = k;
                delete_orders[k].onclick = function(){
                    var rootParent = this.parentNode.parentNode;
                    var ajaxForDeleteOrder;
                    if(window.XMLHttpRequest){
                        ajaxForDeleteOrder = new XMLHttpRequest();
                    }else{
                        ajaxForDeleteOrder = new ActiceXObject("Microsoft.XMLHTTP");
                    }
                    ajaxForDeleteOrder.open("GET","/shop/php/deleteOrder.php?orderscode="+orderscodes[this.index],true);
                    ajaxForDeleteOrder.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    ajaxForDeleteOrder.onreadystatechange = function(){
                        if(ajaxForDeleteOrder.readyState == 4 && ajaxForDeleteOrder.status == 200){
                            if(ajaxForDeleteOrder.responseText == "success"){
                                alert("成功从购物车删除！");
                                cart_goodsdiv.removeChild(rootParent);
                                caculaCountAndMoney();
                            }else{
                                alert("删除失败");
                            }
                        }
                    };
                    ajaxForDeleteOrder.send();
                    return false;
                };
            }

        }
    };
    ajaxForGoods.send();
}

function caculaCountAndMoneyForCheckthis(){
    allCount = 0;
    allMoney = 0;
    var checkedCount = 0;
    var cart_ordergoods = document.getElementsByClassName("cart_ordergoods");
    for(var k = 0 ; k< cart_ordergoods.length;k++){
        var checkbox = cart_ordergoods[k].getElementsByClassName("checkthis")[0];
        if(checkbox.checked){
            var count = parseInt(cart_ordergoods[k].getElementsByClassName("input_count")[0].value);
            var total = parseInt(cart_ordergoods[k].getElementsByClassName("totalmoney")[0].innerHTML);
            allCount += count;
            allMoney += total;
            checkedCount += 1;
        }
    }
     var  checkall = document.getElementsByClassName("checkall")[0];
     var length = cart_ordergoods.length;
     if(checkedCount == length){
         checkall.checked = true;
     }
     else{
         checkall.checked = false;
     }
    document.getElementById("total_money").innerHTML = allMoney;
    document.getElementById("total_account").innerHTML = allCount;
}
function caculaCountAndMoney(){
    allCount = 0;
    allMoney = 0;

    var checkall = document.getElementsByClassName("checkall")[0];
    var cart_ordergoods = document.getElementsByClassName("cart_ordergoods");
    for(var k = 0 ; k< cart_ordergoods.length;k++){
        var checkbox = cart_ordergoods[k].getElementsByClassName("checkthis")[0];
        if(checkbox.checked){
            var count = parseInt(cart_ordergoods[k].getElementsByClassName("input_count")[0].value);
            var total = parseInt(cart_ordergoods[k].getElementsByClassName("totalmoney")[0].innerHTML);
            allCount += count;
            allMoney += total;
        }

    }
    document.getElementById("total_money").innerHTML = allMoney;
    document.getElementById("total_account").innerHTML = allCount;
}
