var now = 0,last = 0;
var banners = document.getElementById("mslide-banners");
var bannersA = banners.getElementsByTagName("a");
var bannersindex = document.getElementsByClassName("banners-index")[0];
var lis = bannersindex.getElementsByTagName("li");

function hideandshow(){
  bannersA[last].style.display = "none";
  lis[last].className = "";
  bannersA[now].style.display = "block";
  lis[now].className = "selected";
  last = now;
  now++;
  if(now > 4){now=0;}
}
hideandshow();
var circulation = setInterval("hideandshow()",3000);

for(var j = 0;j<lis.length;j++){
  lis[j].index = j;
  lis[j].onmouseover = function(){
    clearInterval(circulation);
    last = now-1;
    if(last<0)last = 4;
    now = this.index;
    //  alert(now+"->"+last);
    hideandshow();
    circulation = setInterval("hideandshow()",3000);
  };
}

//设置导航子菜单的出现
var category_ul = document.getElementsByClassName("nav-li");
var nav_more = document.getElementsByClassName("nav-more")[0];
nav_more.onmouseover = function(){
  clearInterval(hidediv);
  this.style.display = "block";
};
nav_more.onmouseout = function(){
  this.style.display = "none";
}
var hidediv;


for(var i = 0;i<category_ul.length;i++){
  category_ul[i].onmouseover = function(){
    clearInterval(hidediv);
    var h2_value = this.getElementsByTagName("dt")[0].
    getElementsByTagName("a")[0].innerHTML;
    nav_more.getElementsByTagName("h2")[0].innerHTML = h2_value;
    //alert(h2_value);
    switch(h2_value){
      case "华为":
        huawei();
        break;
      case "三星":
        sansung();
        break;
      case "小米":
        xiaomi();
        break;
      case "iPhone":
        iPhone();
        break;
      case "魅族":
        meizu();
        break;
      case "vivo":
        vivo();
        break;
      case "努比亚":
        nubia();
        break;
      case "乐视":
        leshi();
        break;
      case "中兴":
        zte();
        break;
      case "OPPO":
        OPPO();
        break;
      case "联想":
        lenovo();
        break;
      case "摩托罗拉":
        moto();
        break;
      case "LG":
        LG();
        break;
      case "金立":
        jinli();
        break;
    }
    nav_more.style.display = "block";
  };
  category_ul[i].onmouseout = function(){
    hidediv = setInterval(hide,500);
  };
}

function hide(){
  nav_more.style.display = "none";
}

// var phone_list = document.getElementsByClassName("phone-list");
// for(var i = 0;i < phone_list.length ; i++){
//   var phonelis = phone_list[i].getElementsByTagName("li");
//   for(var j = 0; j < lis.length ; j++){
//     phonelis[j].onmouseover = function(){
//       this.style.top = "-5px";
//     };
//     phonelis[j].onmouseout = function(){
//       this.style.top = "0";
//     };
//   }
// }
