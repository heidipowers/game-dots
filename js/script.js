$(document).ready(function(){
console.log("Ready");

//Globals
var $box = $('.box');
var $boxSize = parseFloat($('.box').css('width'));
var $boxZero = $boxSize - $boxSize;
var $boxHigh = $boxSize * .90;
var $boxLow = $boxSize - $boxHigh;

var $border = "2px solid red";

var $topRow = $('.row.one');
console.log($topRow);
//Functions

function addBorder(box, borderSide){
  box.css("border-"+borderSide, $border);
  console.log(box);
}

//Hover Over
function hoverOn(e) {

 var $offset = $(this).offset();
  var $xLocation = (e.pageX - $offset.left);
  var $yLocation = (e.pageY - $offset.top);

  console.log("X: " + $xLocation + "  Y: " + $yLocation);
  if(($xLocation >= $boxZero && $xLocation <= $boxLow) && ($yLocation >= $boxZero && $yLocation <= $boxSize )){
    $(this).addClass('hover-left');
  }else if(($xLocation <= $boxSize && $xLocation >= $boxHigh) && ($yLocation >= $boxZero && $yLocation <= $boxSize )){
    console.log('Right Side');
    if($(this).hasClass('fourth')){
      $(this).addClass('hover-right');
    }else{
    $(this).addClass('hover-transparent');
  }
  }else if(($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation >= $boxZero && $yLocation <= $boxLow )){
        $(this).addClass('hover-top');
  }else if(($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation <= $boxSize && $yLocation >= $boxHigh)){
    if($(this).hasClass('fourth-row')){
      $(this).addClass('hover-bottom');
    }else{
       $(this).addClass('hover-transparent');
    }
  }

}

//Hover Off
function hoverOff() {
$(this).removeClass('hover-left');
$(this).removeClass('hover-right');
$(this).removeClass('hover-top');
$(this).removeClass('hover-bottom');
$(this).removeClass('hover-transparent');
}

//Get the position of mouse on click event

$($box).on('click', function(e) {

  var $offset = $(this).offset();
  var $xLocation = (e.pageX - $offset.left);
  var $yLocation = (e.pageY - $offset.top);

  console.log("X: " + $xLocation + "  Y: " + $yLocation);
  if(($xLocation >= $boxZero && $xLocation <= $boxLow) && ($yLocation >= $boxZero && $yLocation <= $boxSize )){
    console.log("Left Side");
    addBorder($(this),"left");
  }else if(($xLocation <= $boxSize && $xLocation >= $boxHigh) && ($yLocation >= $boxZero && $yLocation <= $boxSize )){
    console.log('Right Side');
    $(this).css("border-right", $border);
  }else if(($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation >= $boxZero && $yLocation <= $boxLow )){
    console.log('Top Side');
  }else if(($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation <= $boxSize && $yLocation >= $boxHigh)){
    console.log('Bottom Side');
  }


});//end box Click Function

  $($box).hover(hoverOn, hoverOff);



































//DO NOT DELETE
});//end script
