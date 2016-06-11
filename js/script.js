$(document).ready(function() {
            console.log("Ready");

            //Globals
            var $box = $('.box');
            $box.addClass('incomplete');
            var $boxSize = parseFloat($('.box').css('width'));
            var $boxZero = $boxSize - $boxSize;
            var $boxHigh = $boxSize * 0.90;
            var $boxLow = $boxSize - $boxHigh;
            var $border = "2px solid orange";

            var playerOne = "Heidi";
            var playerTwo = "Kurt";
            var currentPlayer = playerOne;

            var playerOneScore = 0;
            var playerTwoScore = 0;

            var winBox;



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


              //Add side for hover
            function addHoverSide(box, side) {
                box.addClass('hover-' + side);
            } // end addHoverSide


            //Remove Side for Hover
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

            function checkWin(){
              var allBoxes = $('.incomplete');
              winBox = false;
              for(let i = 0; i < allBoxes.length; i++) {

                if(allBoxes.eq(i).attr('data-top') && allBoxes.eq(i).attr('data-right') && allBoxes.eq(i).attr('data-bottom') && allBoxes.eq(i).attr('data-left')){
                  var $thisBox = allBoxes.eq(i);
                  $thisBox.removeClass('incomplete');
                  incrementPlayerCount();
                  console.log(currentPlayer, ' gets point');
                  winBox = true;
                  console.log(winBox, ' inside');
                  if(currentPlayer === playerOne){
                    $thisBox.css('background', 'black');
                  }else {
                    $thisBox.css('background', 'red');
                  }
                }//end if

                }//end for loop allBoxes
                console.log(winBox, ' outside');
                console.log(currentPlayer, " just went");
                return winBox;
            }//end CheckWin



            //PlayerSwitch


            function assignPlayer() {
              if(winBox === true){
                currentPlayer = currentPlayer;
              }else {
                switchPlayer();
              }
              console.log(currentPlayer, " it's your turn in assignPlayer");
              }//end assignPlayer

            function switchPlayer(){
              if(currentPlayer === playerOne){
                currentPlayer = playerTwo;
              }else{
                currentPlayer = playerOne;
              }
             console.log('switching player to ', currentPlayer, " switchPlayer");
            }//end switchPLayer

            //player Count

            function incrementPlayerCount(){
              if(currentPlayer === playerOne){
                playerOneScore++;
              }else{
                playerTwoScore++;
              }
              console.log('current Score player 1: ', playerOneScore);
              console.log('current Score player 2: ', playerTwoScore);
            }




            //Get the position of mouse on click event


            console.log(currentPlayer, " your up!");
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
                            $(this).attr('data-left', true);//sets left border for box clicked in
                            $(this).prev().attr('data-right', true);//sets right border for previous sibling shared border
                            $(this).prev().off('mouseenter', hoverRight);
                            $(this).off('mouseenter', hoverLeft);
                            removeHoverSide($(this), "left");

                        }
                    } else if (($xLocation <= $boxSize && $xLocation >= $boxHigh) && ($yLocation >= $boxZero && $yLocation <= $boxSize)) {
                        //FAR RIGHT
                        if ($(this).hasClass('fourth')) {
                            $(this).css("border-right", $border);
                            $(this).off('mouseenter', hoverRight);
                             removeHoverSide($(this), 'right');
                             $(this).attr('data-right', true);

                            }else{ //RIGHT
                             $(this).off('mouseenter', hoverRight);
                             removeHoverSide($(this), 'right');
                            $(this).attr('data-right', true);//sets right border

                            }

                        } else if (($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation >= $boxZero && $yLocation <= $boxLow)) {
                            //TOP
                            addBorder($(this), 'top');
                            $(this).off('mouseenter', hoverTop);
                            $(this).attr('data-top', true);
                            removeHoverSide($(this), 'top');
                            $(this).parent().prev().children().eq($(this).index()).off('mouseenter', hoverBottom);
                            $(this).parent().prev().children().eq($(this).index()).attr('data-bottom', true);

                        } else if (($xLocation >= $boxZero && $xLocation <= $boxSize) && ($yLocation <= $boxSize && $yLocation >= $boxHigh)) {
                            //BOTTOM
                            if($(this).hasClass("fourth-row")){
                               addBorder($(this), 'bottom');
                            $(this).off('mouseenter', hoverBottom);
                            $(this).attr('data-bottom', true);
                            removeHoverSide($(this), 'bottom');

                            }else{
                            $(this).off('mouseenter', hoverBottom);
                            $(this).attr('data-bottom', true);
                            removeHoverSide($(this), 'bottom');

                            }
                        }
                        checkWin();
                        assignPlayer();
                    }); //end box Click event


                $box.hover(hoverLeft, hoverOff);
                $box.hover(hoverRight, hoverOff);
                $box.hover(hoverTop, hoverOff);
                $box.hover(hoverBottom, hoverOff);




                //DO NOT DELETE
            }); //end script
