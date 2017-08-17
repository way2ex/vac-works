/* page of goods detail*/
  //set the microphoto scroll when click the pre and next
var pre_span = document.getElementById("detail_prepic");
var next_span = document.getElementById("detail_nextpic");
var detail_photodiv = document.getElementById("detail_photodiv");

var deltWidth = 64;
var currentPic = 0;
var currentScroll = 0;
var preIntervarl,nextInterval;

pre_span.onclick =  function(){
  scrollPre();
  // if(detail_photodiv.scrollLeft < 192){
  //   detail_photodiv.scrollLeft += 64;
  // }
};
next_span.onclick =  function(){
  scrollNext();
  // if(0 < detail_photodiv.scrollLeft ){
  //   detail_photodiv.scrollLeft -= 64;
  // }
};

function scrollPre(){
  if(currentPic == 3){
    return;
  }
  detail_photodiv.scrollLeft = currentPic * deltWidth;
  if(preIntervarl){
    clearInterval(preIntervarl);
  }
  if(nextInterval){
    clearInterval(nextInterval);
  }
  preIntervarl = setInterval(function() {
    detail_photodiv.scrollLeft += 1;
    if(detail_photodiv.scrollLeft == (currentPic+1) * deltWidth){
      currentPic++;
      clearInterval(preIntervarl);
    }
  },5);
}

function scrollNext(){
  if(currentPic == 0){
    return;
  }
  detail_photodiv.scrollLeft = currentPic * deltWidth;
  if(preIntervarl){
    clearInterval(preIntervarl);
  }
  if(nextInterval){
    clearInterval(nextInterval);
  }
  nextIntervarl = setInterval(function() {
    detail_photodiv.scrollLeft -= 1;
    if(detail_photodiv.scrollLeft == (currentPic-1) * deltWidth){
      currentPic--;
      clearInterval(nextIntervarl);
    }
  },5);
}
