var xmlhttp;
var isLogin = false;

if (window.XMLHttpRequest){
  //IE7+  Firefox Opera Safari
  xmlhttp = new XMLHttpRequest();
}else{
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("POST","/shop/php/indexlogin.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.onreadystatechange = function(){
  if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
    //alert(xmlhttp.responseText);
      var xml = xmlhttp.responseXML;
      var node_user = xml.getElementsByTagName("user")[0];
      var node_state = node_user.getElementsByTagName("state")[0];
      var state = node_state.childNodes[0].nodeValue;
      if(state == "login"){
          isLogin = true;
          var node_username = node_user.getElementsByTagName("name")[0];
          var username = node_username.childNodes[0].nodeValue;
          var node_photo = node_user.getElementsByTagName("photo")[0];
          var photourl = node_photo.childNodes[0].nodeValue;

          var topul = document.getElementById("pagetop-ul");
          var topli_register = document.getElementById("topli_register");
          var topli_login = document.getElementById("topli_login");
          topul.removeChild(topli_register);
          topul.removeChild(topli_login);

          var topli_username = document.createElement("li");
          topli_username.className = "topli";
          topli_username.setAttribute("id","topli_username");
          topul.insertBefore(topli_username,topul.firstChild);

          var topli_a = document.createElement("a");
          topli_a.setAttribute("href","userinfo.html");
          topli_a.style.color="red";
          topli_a.style.fontSize = "16px";
          var topli_aText = document.createTextNode(username);
          topli_a.appendChild(topli_aText);
          topli_username.appendChild(topli_a);

          var loginbtn = document.getElementById("loginbtn");
          var enrollbtn = document.getElementById("enrollbtn");
          loginbtn.style.display = "none";
          enrollbtn.style.display = "none";

          var p_username = document.getElementById("p_username");
          p_username.style.display="inline-block";
          p_username.style.fontSize = "16px";
          p_username.style.color = "red";
          p_username.innerHTML = username;

          //var userphoto_a = document.getElementsByClassName("userphoto")[0];
          //userphoto_a.style.backgroundImage = "url('"+photourl+"')";
          var user_photo = document.getElementById("user_photo");
          user_photo.setAttribute("src",photourl);

      }else{

      }
  }
};
xmlhttp.send("query=query_loginstate");
