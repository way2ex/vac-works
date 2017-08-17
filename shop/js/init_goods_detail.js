var href = window.location.href;
var index = href.indexOf("?");
var name;
var p50s = null;
var p360s = null;
var color = null;
var network = null;
var colors = null;
var networks = null;
var param_color = null;      //record the color and network
var param_network = null;
//var goodsId = null;        /record the goodsId

if( index > 0 ){
    var querystring = href.substring(index+1);
    var strings = querystring.split("=");
    var keyword = strings[1];
    //goodsId = keyword;
    var requiredetail_ajax;
    if(window.XMLHttpRequest){
      requiredetail_ajax = new XMLHttpRequest();
    }else {
      requiredetail_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    requiredetail_ajax.open("GET","/shop/php/detail_for_goods.php?query="+keyword,true);
    requiredetail_ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    requiredetail_ajax.onreadystatechange = function(){
        if(requiredetail_ajax.readyState == 4 && requiredetail_ajax.status == 200){
            // alert(requiredetail_ajax.responseText);
            var xml = requiredetail_ajax.responseXML;
            name = xml.getElementsByTagName("name")[0].innerHTML;
            var price = xml.getElementsByTagName("price")[0].innerHTML+".00";
            var descript = xml.getElementsByTagName("descript")[0].innerHTML;
            p50s = xml.getElementsByTagName("p50");
            p360s = xml.getElementsByTagName("p360");
            var commenumber = xml.getElementsByTagName("commenumber")[0].innerHTML;
            color = xml.getElementsByTagName("color")[0].innerHTML;
            network = xml.getElementsByTagName("network")[0].innerHTML;
            colors = xml.getElementsByTagName("color_array");
            networks = xml.getElementsByTagName("network_array");
            param_color = color;
            param_network = network;

            var fullName = name+" "+network + " "+color +" 双卡双待";

            var big_photo = document.getElementById("photo_img");
            big_photo.setAttribute("src",p360s[0].innerHTML);
            var photo_imgs = document.getElementById("detail_photoul").getElementsByTagName("img");
            for(var i = 0;i < photo_imgs.length;i++){
                photo_imgs[i].setAttribute("src",p50s[i].innerHTML);
            }
            document.getElementById("p_fullname").innerHTML = fullName;
            document.getElementById("p_descript").innerHTML = descript;
            document.getElementById("em_price").innerHTML = price;
            document.getElementById("a_commenumber").innerHTML = commenumber;

            var chooseColor_ul = document.getElementById("chooseColor_ul");
            for(i = 0;i < colors.length; i++){
                var node_li = document.createElement("li");
                var node_a = document.createElement("a");
                node_a.innerHTML = colors[i].innerHTML;
                node_li.appendChild(node_a);
                chooseColor_ul.appendChild(node_li);
                if(color == colors[i].innerHTML){
                    node_li.setAttribute("class","lis_checked");
                }
            }
            var network_li_div = document.getElementById("network_li_div");
            for(i = 0; i < networks.length ; i++){
                var node_li2 = document.createElement("li");
                var node_a2 = document.createElement("a");
                node_a2.innerHTML = networks[i].innerHTML;
                node_li2.appendChild(node_a2);
                network_li_div.appendChild(node_li2);
                if(network == networks[i].innerHTML){
                    node_li2.setAttribute("class","lis_checked");
                }
            }
            var color_lis = chooseColor_ul.getElementsByTagName("li");
            for(j = 0;j < color_lis.length;j++){
                color_lis[j].onclick = function(){
                    for(var k = 0;  k<color_lis.length; k++){
                        color_lis[k].setAttribute("class","");
                    }
                    this.setAttribute("class","lis_checked");
                    param_color = this.firstChild.innerHTML;
                };
            }
            var network_lis = network_li_div.getElementsByTagName("li");
            for(j = 0;j < network_lis.length;j++){
                network_lis[j].onclick = function(){
                    for(k = 0;k<network_lis.length;k++){
                        network_lis[k].setAttribute("class","");
                    }
                    this.setAttribute("class","lis_checked");
                    param_network= this.firstChild.innerHTML;
                };
            }

            //add the click event to the parameter lis

        }
    };
    requiredetail_ajax.send();
}else{
}

// the code to show the big picture when the user click the mini picture
var photo_ul = document.getElementById("detail_photoul");
var photo_lis = photo_ul.getElementsByTagName("li");
photo_lis[0].setAttribute("class","photo_li_checked");
var index_li_checked = 0;
for(i =0;i < photo_lis.length; i++){
    photo_lis[i].onclick = function(){
        for(var j = 0;j < photo_lis.length;j++){
            photo_lis[j].setAttribute("class","");
        }
        this.setAttribute("class","photo_li_checked");
        var imgurl = this.firstChild.getAttribute("src");
        imgurl = imgurl.replace("60x60","360x360");
        // alert(imgurl);
        var photo_img = document.getElementById("photo_img");
        photo_img.setAttribute("src",imgurl);
    };
}         //end the code to change the picture

//code for reponding when user add or reduce the count
var orderCount = 1;             //set the count to be 1
//then when user click the add button ,orderCount add
var countInput = document.getElementById("detail_ordercount");
var addCount = document.getElementById("addcount");
var reduceCount = document.getElementById("reducecount"); //cancel the default event
addCount.onclick = function(){
    if(orderCount < 100){
        orderCount++;
        countInput.value = orderCount;
    }
    return false;
};
reduceCount.onclick = function(){
    if(orderCount > 1){
        orderCount--;
        countInput.value = orderCount;
    }
    return false;
};
//set the event when the text in the input changed
countInput.oninput = function(){
    var value = this.value;
    if(isNaN(value)){
        this.value = orderCount;
    }else{
        if(value > 100 || value < 1){
            this.value = orderCount;
        }else{
            orderCount = this.value;
        }
    }
};


//the code for choosing the parameter then send to the back-end to make a order
var addTocart = document.getElementById("order_submit");
addTocart.onclick = function(){
    // alert(name+"->"+param_color+"->"+param_network);
    if(isLogin){           //judge if the user is login
        // get the orderCount,param_color,param_network ,name  and send to the back end
        var queryword = "name="+name+"&color="+param_color+"&network="+param_network+"&count="+orderCount;
        var ajax;
        if(window.XMLHttpRequest){
            ajax = new XMLHttpRequest();
        }else{
            ajax = new ActiveXObject("Microsoft.XMLHTTP");
        }
        ajax.open("POST","/shop/php/addTocart.php",true);
        ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                xml = ajax.responseXML;
                var resultOfadd = xml.getElementsByTagName("resultOfadd")[0].innerHTML;
                if(resultOfadd == "成功加入购物车"){
                    alert(resultOfadd);
                }else{
                    var login_state = xml.getElementsByTagName("login_state")[0].innerHTML;
                    if(login_state =="nologin"){
                        if(confirm("您未登录，请登录！")){
                            window.location.href = "/shop/login.html?from="+href;
                        }else{

                        }
                    }else{
                        alert("加入购物车出错，请重试！");
                    }
                }
            }
        };
        ajax.send(queryword);
        //alert("send");
    }else{
        if(confirm("您未登录，请登录！")){
            window.location.href = "/shop/login.html?from="+href;
        }else{

        }

    }
    return false;
};

//the code for go to the cart page
var gotocart = document.getElementById("gotocart");
gotocart.onclick = function(){
    window.location.href = "/shop/cart.html";
    return false;
};
