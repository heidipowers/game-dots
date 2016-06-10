$(document).ready(function() {
            console.log("Ready");

            //Globals
            var $box = $('.box');
            var $boxSize = parseFloat($('.box').css('width'));
            var $boxZero = $boxSize - $boxSize;
            var $boxHigh = $boxSize * 0.90;
            var $boxLow = $boxSize - $boxHigh;

            var $border = "2px solid red";


            //Functions


            //Add border on click
            function addBorder(box, borderSide) {
                box.css("border-" + borderSide, $border);

            }

            //Hover Over

            function hoverLeft(e) {
                var $offset = $(this).offset();
                var $xLocation = (e.pageX - $offset.left);
                var $yLocation = (e.pageY - $offset.top);

                if (($xLocation >= $boxZero && $xLocation <= $boxLow) && ($yLocation >= $boxZero && $yLocation <= $boxSize)) {
                    addHoverSide($(this), 'left');
                }
            } //end hoverLeft

            function hoverRight(e) {
                var $offset = $(this).offset();
                var $xLocation = (e.pageX - $offset.left);
                var $yLocation = (e.pageY - $offset.top);

                if (($xLocation <= $boxSize && $xLocation >= $boxHigh) && ($yLocation >= $boxZero && $yLocation <= $boxSize)) {
                    if ($(this).hasClass('fourth')) {
                        addHoverSide($(this), 'right');
                    } else {
                        $(this).addClass('hover-transparent');
                    }
                }
            } //end hoverRight

            function hoverTop(e) {
                var $offset = $(this).offset();
                var $xLocation = (e.pageX - $offset.left);
                var $yLocation = (e.pageY - $offset.top);

                if (($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation >= $boxZero && $yLocation <= $boxLow)) {
                    $(this).addClass('hover-top');
                }
            } //end hoverTop

            function hoverBottom(e) {
                var $offset = $(this).offset();
                var $xLocation = (e.pageX - $offset.left);
                var $yLocation = (e.pageY - $offset.top);

                if (($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation <= $boxSize && $yLocation >= $boxHigh)) {
                    if ($(this).hasClass('fourth-row')) {
                        addHoverSide($(this), 'bottom');
                    } else {
                        $(this).addClass('hover-transparent');
                    }
                }

            } // end hoverBottom




            function addHoverSide(box, side) {
                box.addClass('hover-' + side);
            } // end addHoverSide

            function removeHoverSide(box, side) {
                box.removeClass('hover-' + side);
            } //removeHoverSide


            //Hover Off
            function hoverOff() {
                $(this).removeClass('hover-left');
                $(this).removeClass('hover-right');
                $(this).removeClass('hover-top');
                $(this).removeClass('hover-bottom');
                $(this).removeClass('hover-transparent');
            }

            //Check win

            function checkWin(box){
              if(box.attr('data-top') && box.attr('data-right') && box.attr('data-bottom') && box.attr('data-top')){
                console.log("true");
                console.log(box);
                box.css('background', "black");
              } else {
                console.log(false);
                console.log(box);
              }
            }//end CheckWin

            //Get the position of mouse on click event

            $($box).on('click', function(e) {

                    var $offset = $(this).offset();
                    var $xLocation = (e.pageX - $offset.left);
                    var $yLocation = (e.pageY - $offset.top);

                    //console.log("X: " + $xLocation + "  Y: " + $yLocation);
                    if (($xLocation >= $boxZero && $xLocation <= $boxLow) && ($yLocation >= $boxZero && $yLocation <= $boxSize)) {

                        if ($(this).hasClass('first')) {
                          //LEFT FAR LEFT
                          addBorder($(this), "left");
                            $(this).attr('data-left', true);
                            $(this).off('mouseenter', hoverLeft);
                            removeHoverSide($(this), "left");
                        } else {
                            //LEFT
                            addBorder($(this), "left");
                            $(this).attr('data-left', true);
                            var realBox= $(this).prev();
                            $(this).prev().attr('data-right', true);
                            $(this).off('mouseenter', hoverLeft);
                            removeHoverSide($(this), "left");
                        }
                    } else if (($xLocation <= $boxSize && $xLocation >= $boxHigh) && ($yLocation >= $boxZero && $yLocation <= $boxSize)) {
                        //RIGHT
                        $(this).off('mouseenter', hoverRight);
                        removeHoverSide($(this), 'right');
                        $(this).attr('data-right', true);
                        //FAR RIGHT
                        if ($(this).hasClass('fourth')) {
                            $(this).css("border-right", $border);
                            }
                        } else if (($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation >= $boxZero && $yLocation <= $boxLow)) {
                            //TOP
                            addBorder($(this), 'top');
                            $(this).off('mouseenter', hoverTop);
                            $(this).attr('data-top', true);
                            removeHoverSide($(this), 'top');
                            var realBox= $(this).parent().prev().children().eq($(this).index())
                            $(this).parent().prev().children().eq($(this).index()).attr('data-bottom', true);
                        } else if (($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation <= $boxSize && $yLocation >= $boxHigh)) {
                            //BOTTOM
                            addBorder($(this), 'bottom');
                            $(this).off('mouseenter', hoverBottom);
                            $(this).attr('data-bottom', true);
                            removeHoverSide($(this), 'bottom');
                        }

                        if (realBox== false){
                          checkWin($(this));
                        } else{
                          console.log("check first box")
                          checkWin(realBox);
                          checkWin($(this));
                        }


                    }); //end box Click Function

                $box.hover(hoverLeft, hoverOff); $box.hover(hoverRight, hoverOff); $box.hover(hoverTop, hoverOff); $box.hover(hoverBottom, hoverOff);




                //DO NOT DELETE
            }); //end script
