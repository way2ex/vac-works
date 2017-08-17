var xmlhttp;
var isLogin = false;

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
            //alert(notation_login);
            //notation_login.style.display = "none";
        }else {
        }
    }
};
xmlhttp.send("query=query_loginstate");
