var  search_btn = document.getElementById("search-btn");
var searchbox = document.getElementById("searchbox");

//set the three parameters "";
var para_price = "全部",para_sort = "全部",para_network="全部";

var a_sorts = document.getElementsByClassName("a_sort");
var a_prices = document.getElementsByClassName("a_price");
var a_networks = document.getElementsByClassName("a_network");

for(var i=0;i<a_sorts.length;i++){
    a_sorts[i].addEventListener("click",function(event){
        event.preventDefault();  //cancel the default event

        for(var j=0;j<a_sorts.length;j++){
          a_sorts[j].setAttribute("class","a_sort");
        }
        this.setAttribute("class","a_sort para_checked");
        para_sort = this.innerHTML;
    },false);
}
for(var i=0;i<a_prices.length;i++){
    a_prices[i].addEventListener("click",function(event){
        event.preventDefault();
        for(var j=0;j<a_prices.length;j++){
          a_prices[j].setAttribute("class","a_price");
        }
        this.setAttribute("class","a_price para_checked");
        para_price = this.innerHTML;
    },false);
}
for(var i=0;i<a_networks.length;i++){
    a_networks[i].addEventListener("click",function(event){
        event.preventDefault();
        for(var j=0;j<a_networks.length;j++){
            a_networks[j].setAttribute("class","a_network");
        }
        this.setAttribute("class","a_network para_checked");
        para_network = this.innerHTML;
    },false);
}
//now i have get the three parameters ,then should use them in the ajax

search_btn.onclick = function(){
  switch (para_sort) {
    case "华为(HUAWEI)":
      para_sort = "华为";
      break;
    case "三星(SamSung)":
      para_sort = "三星";
      break;
    case "小米(XIAOMI)":
      para_sort= "小米";
      break;
    case "苹果(iPhone)":
      para_sort= "苹果";
      break;
    case "魅族(MEIZU)":
      para_sort= "魅族";
      break;
    case "努比亚(nubia)":
      para_sort= "努比亚";
      break;
    case "乐视(Le)":
      para_sort= "乐视";
      break;
    case "中兴(ZTE)":
      para_sort= "中兴";
      break;
    default:break;
  }
  //window.location = "searchresults.html";
    var searchword = searchbox.value.trim();
    //next we should search the result by transport the searchword to the php file
    var searchAjax;
    if(window.XMLHttpRequest){
        searchAjax = new XMLHttpRequest();
    }else{
        searchAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }

    searchAjax.open("POST","/shop/php/results.php",true);
    searchAjax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    searchAjax.onreadystatechange = function(){
        if(searchAjax.readyState == 4 && searchAjax.status == 200){

            var xml = searchAjax.responseXML;
            var rootnode_items = xml.getElementsByTagName("items");
            var node_items = xml.getElementsByTagName("item");

            var body = document.getElementsByTagName("body")[0];
            var resultlist_before = document.getElementById("sr_resultlist");

            var resultlist = document.createElement("div");
            resultlist.setAttribute("class","innerdiv paramdiv");
            resultlist.setAttribute("id","sr_resultlist");
            body.replaceChild(resultlist,resultlist_before);
            // var resultlist = document.getElementById("sr_resultlist");
            if(node_items.length == 0){
              var node_div = document.createElement("div");
              // node_div.setAttribute("class","sr_resultitem");
              node_div.innerHTML= "未找到相关商品！";
              resultlist.appendChild(node_div);
            }else {
              for(var i =0;i<node_items.length;i++){

                  var name = node_items[i].childNodes[0].innerHTML;
                  var price = node_items[i].childNodes[1].innerHTML+".00";
                  var number = node_items[i].childNodes[2].innerHTML;
                  var p200 = node_items[i].childNodes[3].innerHTML;
                  var id = node_items[i].childNodes[4].innerHTML;

                  var node_div = document.createElement("div");
                  node_div.setAttribute("class","sr_resultitem");

                  var node_a1 = document.createElement("a");
                  node_a1.setAttribute("href","goodsdetail.html?q="+id);           //should altered after
                  var a_img = document.createElement("img");
                  a_img.setAttribute("src",p200);
                  a_img.setAttribute("alt",name);
                  node_a1.appendChild(a_img);
                  node_div.appendChild(node_a1);

                  var node_div1 = document.createElement("div");
                  node_div1.setAttribute("class","sr_goodsprice");
                  node_div.appendChild(node_div1);
                  var node_em = document.createElement("em");
                  node_em.innerHTML = "￥";
                  node_div1.appendChild(node_em);
                  var node_i_1 = document.createElement("i");
                  node_i_1.innerHTML = price;
                  node_div1.appendChild(node_i_1);

                  var node_a2 = document.createElement("a");
                  node_a2.setAttribute("class","goodsname");
                  node_a2.setAttribute("href","/shop/goodsdetail.html?q="+id);           //should be altered
                  var node_i_2 = document.createElement("i");
                  node_i_2.innerHTML = name;
                  node_a2.appendChild(node_i_2);
                  node_div.appendChild(node_a2);

                  var node_div2 = document.createElement("div");
                  node_div2.setAttribute("class","commentperson");
                  var node_span1 = document.createElement("span");
                  node_span1.innerHTML = "已有";
                  node_div2.appendChild(node_span1);
                  var node_strong = document.createElement("strong");
                  node_strong.innerHTML = number;
                  node_div2.appendChild(node_strong);
                  var node_span2 = document.createElement("span");
                  node_span2.innerHTML = "人评价";
                  node_div2.appendChild(node_span2);
                  node_div.appendChild(node_div2);

                  resultlist.appendChild(node_div);
              }
            }
        }
    };
    searchAjax.send("keyword="+searchword+"&sort="+para_sort+"&price="+para_price+"&network="+para_network);
}

var href = window.location.href;
// alert(href);
var index = null;
if(index = href.indexOf("?") > 0 )
{
    var querystring = href.substring(index+1);
    var strings = querystring.split("=");
    var keyword = strings[1];
    var ajax;
    // alert(keyword);
    if(window.XMLHttpRequest){
      ajax = new XMLHttpRequest();
    }else{
      ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajax.open("POST","/shop/php/results.php",true);
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.onreadystatechange = function(){
      if(ajax.readyState == 4 && ajax.status == 200){
          var xml = ajax.responseXML;
          var rootnode_items = xml.getElementsByTagName("items");
          var node_items = xml.getElementsByTagName("item");

          var body = document.getElementsByTagName("body")[0];
          var resultlist_before = document.getElementById("sr_resultlist");

          var resultlist = document.createElement("div");
          resultlist.setAttribute("class","innerdiv paramdiv");
          resultlist.setAttribute("id","sr_resultlist");
          body.replaceChild(resultlist,resultlist_before);

          if(node_items.length == 0){
            var node_div = document.createElement("div");
            node_div.setAttribute("class","sr_resultitem");
            node_div.innerHTML= "未找到相关商品！";
            resultlist.appendChild(node_div);
          }else {
            for(var i =0;i<node_items.length;i++){
                var name = node_items[i].childNodes[0].innerHTML;
                var price = node_items[i].childNodes[1].innerHTML+".00";
                var number = node_items[i].childNodes[2].innerHTML;
                var p200 = node_items[i].childNodes[3].innerHTML;

                var node_div = document.createElement("div");
                node_div.setAttribute("class","sr_resultitem");

                var node_a1 = document.createElement("a");
                node_a1.setAttribute("href","#");
                var a_img = document.createElement("img");
                a_img.setAttribute("src",p200);
                a_img.setAttribute("alt",name);
                node_a1.appendChild(a_img);
                node_div.appendChild(node_a1);

                var node_div1 = document.createElement("div");
                node_div1.setAttribute("class","sr_goodsprice");
                node_div.appendChild(node_div1);
                var node_em = document.createElement("em");
                node_em.innerHTML = "￥";
                node_div1.appendChild(node_em);
                var node_i_1 = document.createElement("i");
                node_i_1.innerHTML = price;
                node_div1.appendChild(node_i_1);

                var node_a2 = document.createElement("a");
                node_a2.setAttribute("class","goodsname");
                node_a2.setAttribute("href","#");           //should be altered
                var node_i_2 = document.createElement("i");
                node_i_2.innerHTML = name;
                node_a2.appendChild(node_i_2);
                node_div.appendChild(node_a2);

                var node_div2 = document.createElement("div");
                node_div2.setAttribute("class","commentperson");
                var node_span1 = document.createElement("span");
                node_span1.innerHTML = "已有";
                node_div2.appendChild(node_span1);
                var node_strong = document.createElement("strong");
                node_strong.innerHTML = number;
                node_div2.appendChild(node_strong);
                var node_span2 = document.createElement("span");
                node_span2.innerHTML = "人评价";
                node_div2.appendChild(node_span2);
                node_div.appendChild(node_div2);

                resultlist.appendChild(node_div);
            }
          }
      }
    };
    ajax.send("keyword="+keyword+"&sort="+para_sort+"&price="+para_price+"&network="+para_network);
}



//alert(href.indexOf("h"));
//alert(window.location.href);
