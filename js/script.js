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

function hoverLeft(e) {
  var $offset = $(this).offset();
  var $xLocation = (e.pageX - $offset.left);
  var $yLocation = (e.pageY - $offset.top);

  if(($xLocation >= $boxZero && $xLocation <= $boxLow) && ($yLocation >= $boxZero && $yLocation <= $boxSize )){
    addHoverSide($(this),'left');
  }
}//end hoverLeft

function hoverRight(e){
  var $offset = $(this).offset();
  var $xLocation = (e.pageX - $offset.left);
  var $yLocation = (e.pageY - $offset.top);

  if(($xLocation <= $boxSize && $xLocation >= $boxHigh) && ($yLocation >= $boxZero && $yLocation <= $boxSize )){
    if($(this).hasClass('fourth')){
      addHoverSide($(this), 'right');
    }else{
    $(this).addClass('hover-transparent');
  }
  }
} //end hoverRight

function hoverTop(e){
  var $offset = $(this).offset();
  var $xLocation = (e.pageX - $offset.left);
  var $yLocation = (e.pageY - $offset.top);

  if(($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation >= $boxZero && $yLocation <= $boxLow )){
        $(this).addClass('hover-top');
      }
} //end hoverTop

function hoverBottom(e){
 var $offset = $(this).offset();
  var $xLocation = (e.pageX - $offset.left);
  var $yLocation = (e.pageY - $offset.top);

  if(($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation <= $boxSize && $yLocation >= $boxHigh)){
    if($(this).hasClass('fourth-row')){
      addHoverSide($(this), 'bottom');
    }else{
       $(this).addClass('hover-transparent');
    }
  }

}// end hoverBottom






function addHoverSide(box, side){
  box.addClass('hover-'+side);
}// end addHoverSide

function removeHoverSide(box, side){
  box.removeClass('hover-'+side);
} //removeHoverSide

function hoverOn(e) {

  var $offset = $(this).offset();
  var $xLocation = (e.pageX - $offset.left);
  var $yLocation = (e.pageY - $offset.top);

  console.log("X: " + $xLocation + "  Y: " + $yLocation);
  if(($xLocation >= $boxZero && $xLocation <= $boxLow) && ($yLocation >= $boxZero && $yLocation <= $boxSize )){
    addHoverSide($(this),'left');
  }else if(($xLocation <= $boxSize && $xLocation >= $boxHigh) && ($yLocation >= $boxZero && $yLocation <= $boxSize )){
    console.log('Right Side');
    if($(this).hasClass('fourth')){
      addHoverSide($(this), 'right');
    }else{
    $(this).addClass('hover-transparent');
  }
  }else if(($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation >= $boxZero && $yLocation <= $boxLow )){
        $(this).addClass('hover-top');
  }else if(($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation <= $boxSize && $yLocation >= $boxHigh)){
    if($(this).hasClass('fourth-row')){
      addHoverSide($(this), 'bottom');
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

  var $dataSides = $(this).attr('data-sides');

  var $offset = $(this).offset();
  var $xLocation = (e.pageX - $offset.left);
  var $yLocation = (e.pageY - $offset.top);

  console.log("X: " + $xLocation + "  Y: " + $yLocation);
  if(($xLocation >= $boxZero && $xLocation <= $boxLow) && ($yLocation >= $boxZero && $yLocation <= $boxSize )){
    console.log("Left Side");
    addBorder($(this),"left");
    $(this).attr('data-sides', $dataSides++);
    $(this).next().attr('data-sides', $dataSides++);
    $(this).off('mouseenter', hoverLeft);
    console.log('clicked first x')
     removeHoverSide($(this), "left");

  }else if(($xLocation <= $boxSize && $xLocation >= $boxHigh) && ($yLocation >= $boxZero && $yLocation <= $boxSize )){
    console.log('Right Side');
    $(this).off('mouseenter', hoverRight);
    removeHoverSide($(this), 'right');
    $(this).attr('data-sides', $dataSides);
     if($(this).hasClass('fourth')){
      $(this).css("border-right", $border);
      console.log('second click');

    }//else {
    //   $(this).attr('data-sides', $dataSides+=);
    //   //$(this).prev().attr('data-sides', $dataSides+=1);
    //   $(this).off('mouseenter', hoverRight);
    //   console.log('second INSIDE click');
    //   removeHoverSide($(this), 'right');
    //}
  }else if(($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation >= $boxZero && $yLocation <= $boxLow )){
    console.log('Top Side');
    addBorder($(this), 'top');
    console.log('fourth click');
    $(this).off('mouseenter', hoverTop);
     $(this).attr('data-sides', $dataSides+=1);
     removeHoverSide($(this), 'top');
  }else if(($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation <= $boxSize && $yLocation >= $boxHigh)){
    console.log('Bottom Side');
    addBorder($(this), 'bottom');
    $(this).off('mouseenter', hoverBottom);
    $(this).attr('data-sides', $dataSides+=1);
    removeHoverSide($(this), 'bottom');
  }


});//end box Click Function

  $box.hover(hoverLeft, hoverOff);
  $box.hover(hoverRight, hoverOff);
  $box.hover(hoverTop, hoverOff);
  $box.hover(hoverBottom, hoverOff);



































//DO NOT DELETE
});//end script
