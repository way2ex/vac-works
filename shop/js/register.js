
var btn_register = document.getElementById("register_submit");
var register_note = document.getElementById("register_note");
var postStr = null;
var account = document.getElementById("register-username");
var password = document.getElementById("register-password");

btn_register.onclick = function(){
  var accountText = account.value;
  var passwordText = password.value;
  //alert(accountText);
  if(accountText == ""){
    register_note.innerHTML = "请输入账号！";
    register_note.style.display = "block";
    return;
  }
  else if(passwordText == ""){
    register_note.innerHTML = "请输入密码！";
    register_note.style.display = "block";
    return;
  }
  else{
      register_note.style.display = "none";
      postStr = "account="+accountText+"&password="+passwordText;
      //alert(postStr);
    //发送ajax到后台
    var xmlhttp;
    if(window.XMLHttpRequest){
      //IE7+ Firefox Opera ,Safari
      xmlhttp = new XMLHttpRequest();
    }
    else{
      //for IE5, IE6
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("POST","/shop/php/register.php",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4  && xmlhttp.status == 200){
         var xml = xmlhttp.responseXML;
         var state = xml.getElementsByTagName("register")[0].childNodes[0].nodeValue;
         if(state == "success"){
           alert("恭喜您，注册成功，请登陆！");
           window.location.href = "login.html";
         }else if(state == "fail"){
           alert("很抱歉，注册失败！");
           document.getElementById("register-username").value = "";
           document.getElementById("register-password").value = "";
         }else{
            register_note.innerHTML = "账号重复！";
            register_note.style.display = "block";
          }
      }
    };
    xmlhttp.send(postStr);
  };
};
