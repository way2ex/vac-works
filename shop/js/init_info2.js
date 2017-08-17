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
            var userinfo = document.getElementById("userinfo");
            userinfo.style.display = "block";
            // var commoninfo_account =document.getElementsByClassName("commoninfo_account")[0];
            // commoninfo_account.innerHTML = xml.getElementsByTagName("account")[0].innerHTML;
            // var photo2_account1 = document.getElementsByClassName("photo2_account1")[0];
            // photo2_account1.innerHTML = xml.getElementsByTagName("account")[0].innerHTML;
            // var photo2_nickname1 = document.getElementsByClassName("photo2_nickname1")[0];
            // photo2_nickname1.innerHTML = username;
            //
            // var nickname = document.getElementsByClassName("nickname")[0];
            // nickname.value = username;
            // var photo2_grade = document.getElementsByClassName("photo2_grade")[0];
            // photo2_grade.innerHTML = xml.getElementsByTagName("membergrade")[0].innerHTML;
            //
            var the_photo = document.getElementById("the_photo");
            var photo = xml.getElementsByTagName("photo")[0].innerHTML;
            //alert(photo);
            the_photo.setAttribute("src",photo);

            var btn_upload = document.getElementById("submit_photo");
            btn_upload.onclick = function(){
                var formData = new FormData();
                formData.append("file",document.getElementById("upload_photo").files[0]);
                var ajax ;
                if(window.XMLHttpRequest){
                    ajax = new XMLHttpRequest();
                }else{
                    ajax = new ActiveXObject("Microsoft.XMLHTTP");
                }
                ajax.open("POST","/shop/php/upload_photo.php",true);
                ajax.onreadystatechange = function(){
                    if(ajax.readyState == 4 && ajax.status == 200){
                        switch(ajax.responseText){
                            case "0":
                                alert("请上传正确的文件格式，并大小不超过3M！");
                                break;
                            case "1":
                                alert("保存成功！");
                                //window.location.reload(true);
                                document.getElementById("the_photo").setAttribute("src","user_photo/2_ducklings.jpg");
                                break;
                            case "2":
                                alert("保存成功！");
                                //window.location.reload(true);
                                document.getElementById("the_photo").setAttribute("src","user_photo/2_ducklings.jpg");
                                break;
                            case "3":
                                alert("上传失败，请稍后重试！");
                                window.location.reload(true);
                                break;
                            default:
                                alert("保存成功！");
                                //window.location.reload(true);
                                document.getElementById("the_photo").setAttribute("src",ajax.responseText);
                                break;
                                break;
                        }
                    }
                };
                ajax.send(formData);
                return false;
            };
            // var sexs = document.getElementsByClassName("radio");
            // var sex = xml.getElementsByTagName("sex")[0].innerHTML;
            // if(sex == "male"){
            //     sexs[0].setAttribute("checked","true");
            // }else if(sex == "female"){
            //     sexs[1].setAttribute("checked","true");
            // }else{
            //
            // }
            //
            // var input_realname = document.getElementsByClassName("nickname")[1];
            // var realname = xml.getElementsByTagName("realname")[0].innerHTML;
            // input_realname.value = realname;
            //
            //
            // var submit = document.getElementById("submit");
            // submit.onclick = function(){
            //     var username = document.getElementsByClassName("nickname")[0].value;
            //     var realname = document.getElementsByClassName("nickname")[1].value;
            //     var account = document.getElementsByClassName("commoninfo_account")[0].innerHTML;
            //
            //     var radios = document.getElementsByClassName("radio");
            //     var sexValue = "";
            //     for(var i = 0;i< radios.length;i++){
            //         if(radios[i].checked){
            //             sexValue =radios[i].value;
            //         }
            //     }
            //     var yearIndex = document.getElementById("birthdayYear").selectedIndex;
            //     var monthIndex = document.getElementById("birthdayMonth").selectedIndex;
            //     var dayIndex = document.getElementById("birthdayDay").selectedIndex;
            //     var year = document.getElementById("birthdayYear").options[yearIndex].value;
            //     var month = document.getElementById("birthdayMonth").options[monthIndex].value;
            //     var day = document.getElementById("birthdayDay").options[dayIndex].value;
            //
            //     var ajax;
            //     if(window.XMLHttpRequest){
            //         ajax = new XMLHttpRequest();
            //     }else{
            //         ajax = new ActiveXObject("Microsoft.XMLHTTP");
            //     }
            //     ajax.open("POST","/shop/php/userinfo.php",true);
            //     ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            //     ajax.onreadystatechange = function(){
            //         if(ajax.readyState == 4 && ajax.status == 200){
            //
            //
            //         }
            //     };
            //     ajax.send("username="+username+"&realname="+realname+"&account="+account+"&sex="+sexValue+"&year="+year+"&month="+month+"&day="+day);
            //     return false;
            // };

            //add click event to the submit button

        }else {
        }
    }
};
xmlhttp.send("query=query_loginstate");
