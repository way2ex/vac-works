var xmlforgoods;

if(window.XMLHttpRequest){
  xmlforgoods = new XMLHttpRequest();
}else{
  xmlforgoods = new ActiveXObject("Microsoft.XMLHTTP");
}

xmlforgoods.open("GET","/shop/php/index_showgoods.php",true);
xmlforgoods.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlforgoods.onreadystatechange = function(){
  if(xmlforgoods.readyState == 4 && xmlforgoods.status == 200){
    var xml = xmlforgoods.responseXML;
    var node_goods = xml.getElementsByTagName("goods")[0];
    var node_good = xml.getElementsByTagName("good");   //Array

    var phone_list_before = document.getElementById("J_today01");
    var outer_ul = document.getElementById("outer_ul");
    var phone_list = document.createElement("ul");
    phone_list.setAttribute("class","innerdiv clearfix phone-list");
    phone_list.setAttribute("id","J_today01");

    var id = null;
    var name = null;
    var network = null;
    var color = null;
    var price = null;
    //对于每个获得的good进行操作
    for(var i = 0;i<node_good.length;i++){
        id = xml.getElementsByTagName("id")[i].innerHTML;
        name = xml.getElementsByTagName("name")[i].innerHTML;
        network = xml.getElementsByTagName("network")[i].innerHTML;
        color = xml.getElementsByTagName("color")[i].innerHTML;
        photo = xml.getElementsByTagName("photo200x200")[i].innerHTML;
        price = xml.getElementsByTagName("price")[i].innerHTML;

        var phone_li = document.createElement("li");
        var phone_div = document.createElement("div");     // create div and set it
        phone_div.setAttribute("class","pic-show");
        //create a  and must set the attribute href   title  target
        var phone_a = document.createElement("a");
        phone_a.setAttribute("href","/shop/goodsdetail.html?q="+id);
        phone_a.setAttribute("title",name+" "+network+" "+color);
        phone_a.setAttribute("target","_blank");
        var phone_img = document.createElement("img");
        phone_img.setAttribute("src",photo);
        phone_a.appendChild(phone_img);
        phone_div.appendChild(phone_a);
        phone_li.appendChild(phone_div);

        //create the first p  p1
        var phone_p1 = document.createElement("p");
        phone_p1.setAttribute("class","pro-name");
        var phone_a2 = document.createElement("a");
        phone_a2.setAttribute("href","/shop/goodsdetail.html?q="+id);
        phone_a2.setAttribute("target","_blank");
        phone_a2.setAttribute("title",name+" "+network+" "+color);
        var phone_a2Value = document.createTextNode(name+" "+network+" "+color);
        phone_a2.appendChild(phone_a2Value);
        phone_p1.appendChild(phone_a2);
        phone_li.appendChild(phone_p1);

        var phone_p2 = document.createElement("p");
        phone_p2.setAttribute("class","pro-price");
        var phone_p2Value = document.createTextNode("￥");
        phone_p2.appendChild(phone_p2Value);
        var phone_strong = document.createElement("strong");
        phone_strong.innerHTML = price;
        phone_p2.appendChild(phone_strong);
        var phone_b = document.createElement("b");
        phone_b.innerHTML = ".00";
        phone_p2.appendChild(phone_b);
        phone_li.appendChild(phone_p2);

        phone_list.appendChild(phone_li);
    }
    outer_ul.replaceChild(phone_list,phone_list_before);
  }
};
xmlforgoods.send();

//code for click the search button
var search_btn = document.getElementById("search-btn");
var search_box = document.getElementById("search-box");
// var resultlist = document.getElementById("sr_resultlist");

search_btn.onclick = function(){
    var keyword = search_box.value.trim();
    //transport the parameter to the page by get
    window.location.href = "/shop/searchresults.html?keyword="+keyword;
    // var keyword = search_box.value.trim();
    // var queryxml;
    // if(window.XMLHttpRequest){
    //   queryxml = new XMLHttpRequest();
    // }else{
    //   queryxml = new ActiveXObject("Microsoft.XMLHTTP");
    // }
    //
    // queryxml.open("GET","/shop/searchresults.html?keyword="+keyword);
    // queryxml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    // queryxml.onreadystatechange = function(){
    //     if(queryxml.readyState == 4 && queryxml.status == 200 ){
    //         var xml = queryxml.responseXML;
    //         //xml should has the format like the follow :
    //         //<items><div></div></items>
    //         //i should get the <div>
    //         var items = xml.getElementsByTagName("items")[0];  //获得items
    //         var divs = xml.getElementsByTagName("div");
    //         for(i=0;i<divs.length;i++){
    //             resultlist.appendChild(divs[i]);
    //         }
    //     }
    // };
    // queryxml.send();
};
