//get the goodsId from the href
var href = window.location.href;
var goodsId = href.split("=")[1];

//according to the goodsId ,send ajax to get the comments
var ajaxForComment;
if(window.XMLHttpRequest){
    ajaxForComment = new XMLHttpRequest();
}else{
    ajaxForComment = new ActiveXObject("Microsoft.XMLHTTP");
}

ajaxForComment.open("GET","/shop/php/returnComment.php?goodsId="+goodsId,true);
ajaxForComment.setRequestHeader("Content-type","application");
ajaxForComment.onreadystatechange = function(){
    if(ajaxForComment.readyState == 4 && ajaxForComment.status == 200){
        var commentdiv = document.getElementsByClassName("detail_comment")[0];
        var model = document.getElementsByClassName("comment_model")[0];
        var xml = ajaxForComment.responseXML;

        var comments = xml.getElementsByTagName("comment");
        for(var i = 0 ;i < comments.length;i++){
            var comment_detail = model.cloneNode(true);
            comment_detail.setAttribute("class","comment_detail");
            var commenttext = comments[i].getElementsByTagName("commenttext")[0].innerHTML;
            comment_detail.getElementsByTagName("p")[0].innerHTML = commenttext;
            var username = comments[i].getElementsByTagName("username")[0].innerHTML;
            comment_detail.getElementsByClassName("username")[0].innerHTML = username;
            var membergrade = comments[i].getElementsByTagName("membergrade")[0].innerHTML;
            comment_detail.getElementsByClassName("commentuser_grade")[0].innerHTML = membergrade;
            var createTime = comments[i].getElementsByTagName("createTime")[0].innerHTML;
            comment_detail.getElementsByClassName("commentuser_from")[0].innerHTML = createTime;
            var stargrade  = comments[i].getElementsByTagName("stargrade")[0].innerHTML;
            var stardiv = comment_detail.getElementsByClassName("comment_star")[0];
            switch(stargrade){
                case "1":
                    stardiv.style.backgroundPosition="-66px -239px";
                    break;
                case "2":
                    stardiv.style.backgroundPosition="-51px -239px";
                    break;
                case "3":
                    stardiv.style.backgroundPosition="-34px -239px";
                    break;
                case "4":
                    stardiv.style.backgroundPosition="-16px -239px";
                    break;
                case "5":
                    stardiv.style.backgroundPosition="-0px -239px";
                    break;
            }
            commentdiv.appendChild(comment_detail);

        }
        commentdiv.removeChild(model);
    }
};
ajaxForComment.send();
