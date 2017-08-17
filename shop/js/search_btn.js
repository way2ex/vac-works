var searchbox = document.getElementById("searchbox");
var search_btn = document.getElementById("search-btn");
searchbox.value  = "";
search_btn.onclick = function(){
    var keyword = searchbox.value.trim();
    window.location.href = "/shop/searchresults.html?keyword="+keyword;
    return false;
};
