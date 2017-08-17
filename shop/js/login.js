var loginbtn = document.getElementById("login_submit");
var account = document.getElementById("login_account");
var password = document.getElementById("login_password");

var account_note = document.getElementById("account_note");
var password_note = document.getElementById("password_note");

var postStr;

window.onload = function(){
  account.value = "";
  password.value = "";
};

loginbtn.onclick =  function(){
  account_note.style.display = "none";
  password_note.style.display = "none";
  var accountText = account.value;
  var passwordText = password.value;
  if(accountText == ""){
    account_note.innerHTML = "请输入账号！";
    account_note.style.display = "inline";
    return;
  }
  if(passwordText == ""){
    password_note.innerHTML = "请输入密码！";
    password_note.style.display = "inline";
    return;
  }
  postStr = "account="+accountText+"&password="+passwordText;
  //ajax
  var xmlhttp;
  if(window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
  }else{
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.open("POST","/shop/php/login.php",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  //readyState
  //0:请求未初始化
  //1：服务器连接已建立
  //2：请求已接收
  //3：请求处理中
  //4：请求已完成，且响应已就绪
  //status
  //200: "OK"
  //404:
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200 ){
      //alert(xmlhttp.responseText);
      var state = xmlhttp.responseText;
      if(state == "fail"){
        alert("登陆失败！");
      }else{
        window.location.href = "index.html";
      }
    }
  };
  xmlhttp.send(postStr);
};
