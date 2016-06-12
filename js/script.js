
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

    var playerOne = "Player One";
    var playerTwo = "Player Two";
    var currentPlayer = playerOne;

    var playerOneScore = 0;
    var playerTwoScore = 0;
    var gameCounter = 0;

    var $playerOneColor = "teal";
    var $playerTwoColor = "white";

    var playerOneScorebox = $('.display-player1-score');
    var playerTwoScorebox = $('.display-player2-score');
    playerOneScorebox.text(playerOneScore);
    playerTwoScorebox.text(playerTwoScore);
    var $colorBoxOne = $('.color-one');
    var $colorBoxTwo = $('.color-two');

    $colorBoxOne.css({
        'background-color': $playerOneColor,
        'border': $border
    });
    $colorBoxTwo.css({
        'background-color': $playerTwoColor,
        'border': $border
    });

    var $displayMessage = $('.message-update');
    $displayMessage.text("Welcome To Dots!");
    var winBox;

    var $startButton = $('button');
    $startButton.addClass('animated pulse infinite');


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
var allBoxes = $('.incomplete');
    function checkWin() {
        var allBoxes = $('.incomplete');
        var $fadeIn = $('.fadeIn');
        winBox = false;
        for (let i = 0; i < allBoxes.length; i++) {

            if (allBoxes.eq(i).attr('data-top') && allBoxes.eq(i).attr('data-right') && allBoxes.eq(i).attr('data-bottom') && allBoxes.eq(i).attr('data-left')) {
                var $thisBox = allBoxes.eq(i);
                $thisBox.removeClass('incomplete');
                incrementPlayerCount();
                winBox = true;
                if (currentPlayer === playerOne) {
                    $thisBox.css('background', $playerOneColor);
                    gameCounter++;
                } else {
                    $thisBox.css('background', $playerTwoColor);
                    gameCounter++;
                }
            } //end if

        } //end for loop allBoxes

        return winBox;
    } //end CheckWin


    function winMessage() {

            if (playerOneScore > playerTwoScore) {
                $displayMessage.text("Congrats " + playerOne + " wins!");
            } else if (playerTwoScore > playerOneScore) {
                $displayMessage.text("Congrats " + playerTwo + " wins!");
            } else {
                $displayMessage.html("A tie! Want to Play Again?");
            }
            $startButton.fadeIn('slow', boardReset());
    }

    //PlayerSwitch


    function assignPlayer() {
        if (winBox === true && gameCounter <= 15) {
           currentPlayer = currentPlayer;
            $displayMessage.text(currentPlayer + " you got a box! Go again!");
        } else if(winBox === true && gameCounter === 16 ){
            winMessage();
        }else {
          switchPlayer();
        }

    } //end assignPlayer

    function switchPlayer() {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
        $displayMessage.text(currentPlayer + " it's your turn!");
    } //end switchPLayer

    //player Count

    function incrementPlayerCount() {
        if (currentPlayer === playerOne) {
            playerOneScore++;
            playerOneScorebox.text(playerOneScore);
        } else {
            playerTwoScore++;
            playerTwoScorebox.text(playerTwoScore);
        }
    } // end incrementPlayerCounter

    function boardReset (){
            $box.css({'background-color': 'transparent', 'border': '1px solid transparent'});
            $box.addClass('incomplete');
            playerOneScore = 0;
            playerTwoScore = 0;
            gameCounter = 0;
    }

    $box.on('click', function(e){


        var offset = $(this).offset();
        var xLocation = (e.pageX - offset.left);
        var yLocation = (e.pageY - offset.top);
        console.log(xLocation, " X and Y ", yLocation);
    });

    //Get the position of mouse on click event

    $box.on('click', function(e) {

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
                $(this).attr('data-left', true); //sets left border for box clicked in
                $(this).prev().attr('data-right', true); //sets right border for previous sibling shared border
                $(this).prev().off('mouseenter', hoverRight);
                $(this).off('mouseenter', hoverLeft);
                removeHoverSide($(this), "left");


            }
        } else if (($xLocation <= $boxSize && $xLocation >= $boxHigh) && ($yLocation >= $boxZero && $yLocation <= $boxSize)) {
            //FAR RIGHT
            if ($(this).hasClass('fourth')) {
                addBorder($(this), "right");
                $(this).off('mouseenter', hoverRight);
                removeHoverSide($(this), 'right');
                $(this).attr('data-right', true);


            } else { //RIGHT
                $(this).off('mouseenter', hoverRight);
                removeHoverSide($(this), 'right');
                $(this).attr('data-right', true); //sets right border

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
            if ($(this).hasClass("fourth-row")) {
                addBorder($(this), 'bottom');
                $(this).off('mouseenter', hoverBottom);
                $(this).attr('data-bottom', true);
                removeHoverSide($(this), 'bottom');


            } else {
                $(this).off('mouseenter', hoverBottom);
                $(this).attr('data-bottom', true);
                removeHoverSide($(this), 'bottom');

            } //end inside if

        } else {
            console.log(currentPlayer);
            $displayMessage.text(currentPlayer + " stay between the lines...the lines...the lines are our friends...");
            return;
        } //end outside if
        checkWin();
        assignPlayer();

    }); //end box Click event

    $displayMessage.text("Welcome to Dots. Ready to Play? Click the button!");
    $startButton.on('click', function() {
            $displayMessage.text("Player One - Choose a line between two dots on the X or Y axis.");
            $box.hover(hoverLeft, hoverOff);
            $box.hover(hoverRight, hoverOff);
            $box.hover(hoverTop, hoverOff);
            $box.hover(hoverBottom, hoverOff);
            $(this).fadeOut('slow');


        }); // end startButton




    //DO NOT DELETE
}); //end script
