var xmlhttp;
var isLogin = false;
var starGrade = null;
var goodsIdToSend;
var memberIdToSend;
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
            var comment_div = document.getElementById("comment_div");
            comment_div.style.display = "block";
            var search = window.location.search.substring(1);
            //alert(search);
            var queryStrings = search.split("&");
            if(queryStrings.length == 4){
                var goodsId = queryStrings[0].split("=")[1];
                goodsIdToSend = goodsId;
                var memberId = queryStrings[1].split("=")[1];
                memberIdToSend = memberId;
                var orderscode = queryStrings[2].split("=")[1];
                var orderTimeBefore = queryStrings[3].split("=")[1];
                var orderTimes = orderTimeBefore.split("%20");
                var orderTime = orderTimes[0]+" "+orderTimes[1];
                var ajax;
                if(window.XMLHttpRequest){
                    ajax = new XMLHttpRequest();
                }else{
                    ajax = new ActiveXObject("Microsoft.XMLHTTP");
                }
                ajax.open("GET","/shop/php/returnGoodsForComment.php?query="+goodsId,true);
                ajax.onreadystatechange = function(){
                    if(ajax.readyState == 4 && ajax.status == 200){
                        //alert(ajax.responseText);
                        var xml = ajax.responseXML;
                        var goodsName = xml.getElementsByTagName("name")[0].innerHTML;
                        var goodsPrice = xml.getElementsByTagName("price")[0].innerHTML;
                        var descript = xml.getElementsByTagName("descript")[0].innerHTML;
                        var p200 = xml.getElementsByTagName("p200")[0].innerHTML;
                        var color = xml.getElementsByTagName("color")[0].innerHTML;
                        var network = xml.getElementsByTagName("network")[0].innerHTML;

                        var title = goodsName+" "+descript;
                        comment_div.getElementsByClassName("comment-order-number")[0].innerHTML = orderscode;
                        comment_div.getElementsByClassName("comment-order-time")[0].innerHTML = orderTime;
                        comment_div.getElementsByClassName("img_comment")[0].setAttribute("src",p200);
                        var a = comment_div.getElementsByClassName("comment-goods-name")[0];
                        a.innerHTML = title;
                        a.setAttribute("href","/shop/goodsdetail.html?q="+goodsId);
                        comment_div.getElementsByClassName("comment-goods-price")[0].innerHTML = goodsPrice;
                        comment_div.getElementsByClassName("goods-param-1")[0].innerHTML = color;
                        comment_div.getElementsByClassName("goods-param-2")[0].innerHTML = network;

                        var star1 = document.getElementsByClassName("star1")[0];
                        var star2 = document.getElementsByClassName("star2")[0];
                        var star3 = document.getElementsByClassName("star3")[0];
                        var star4 = document.getElementsByClassName("star4")[0];
                        var star5 = document.getElementsByClassName("star5")[0];
                        star1.onclick = function(){
                            star5.style.background = "url(/shop/sr_images/commstar.png) repeat-x -0px -0px";
                            star4.style.background = "url(/shop/sr_images/commstar.png) repeat-x -0px -0px";
                            star3.style.background = "url(/shop/sr_images/commstar.png) repeat-x -0px -0px";
                            star2.style.background = "url(/shop/sr_images/commstar.png) repeat-x -0px -0px";
                            this.style.background = "url(/shop/sr_images/commstar.png) repeat-x -16px -16px";
                            starGrade = 1;
                        };
                        star2.onclick = function(){
                            star5.style.background = "url(/shop/sr_images/commstar.png) repeat-x -0px -0px";
                            star4.style.background = "url(/shop/sr_images/commstar.png) repeat-x -0px -0px";
                            star3.style.background = "url(/shop/sr_images/commstar.png) repeat-x -0px -0px";
                            this.style.background = "url(/shop/sr_images/commstar.png) repeat-x -16px -16px";
                            starGrade = 2;
                        };
                        star3.onclick = function(){
                            star5.style.background = "url(/shop/sr_images/commstar.png) repeat-x -0px -0px";
                            star4.style.background = "url(/shop/sr_images/commstar.png) repeat-x -0px -0px";
                            this.style.background = "url(/shop/sr_images/commstar.png) repeat-x -16px -16px";
                            starGrade = 3;
                        };
                        star4.onclick = function(){
                            star5.style.background = "url(/shop/sr_images/commstar.png) repeat-x -0px -0px";
                            this.style.background = "url(/shop/sr_images/commstar.png) repeat-x -16px -16px";
                            starGrade = 4;

                        };
                        star5.onclick = function(){
                            this.style.background = "url(/shop/sr_images/commstar.png) repeat-x -16px -16px";
                            starGrade = 5;
                        };
                        var textArea = document.getElementsByClassName("comment-text")[0];
                        var textNumber = document.getElementsByClassName("text-available2")[0];
                        textArea.oninput = function(){
                            var value = textArea.value;
                            textNumber.innerHTML = 500-~~value.length;
                            if(value.length>=500){
                                textArea.value = value.substring(0,500);
                            }
                        };

                        var submit = document.getElementsByClassName("comment-submit")[0];
                        submit.onclick = function(){
                            //var now = getTimeNow();

                            var textArea = document.getElementsByClassName("comment-text")[0];
                            var comment = textArea.value;
                            var postString = "goodsId="+goodsIdToSend+"&memberId="+memberIdToSend+"&starGrade="+starGrade+"&comment="+comment;
                            var ajax;
                            if(window.XMLHttpRequest){
                                ajax = new XMLHttpRequest();
                            }else{
                                ajax = new ActiveXObject("Microsoft.XMLHTTP");
                            }
                            ajax.open("POST","/shop/php/addComment.php",true);
                            ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                            ajax.onreadystatechange = function(){
                                if(ajax.readyState == 4 && ajax.status == 200){
                                    if(ajax.responseText == "success"){
                                        alert("添加评论成功！");
                                        document.getElementById("comment_div").style.display = "none";
                                        document.getElementsByClassName("goback")[0].style.display = "block";
                                    }
                                }
                            };
                            ajax.send(postString);
                            return false;
                        };
                    }
                };
                ajax.send();
            }else{

            }

        }else {
        }
    }
};
xmlhttp.send("query=query_loginstate");

function getTimeNow() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate+ " " + date.getHours() + seperator2 + date.getMinutes()+seperator2 + date.getSeconds();
    return currentdate;
}
