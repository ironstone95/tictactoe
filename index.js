// Styling the HTML
$(".box").mouseenter(function() {
  $(this).toggleClass("box-hover");
}).mouseout(function() {
  $(this).toggleClass("box-hover");
});
$(".box")
  .mousedown(function() {
    $(this).removeClass("box-hover").addClass("box-click");
  }).mouseup(function() {
    $(this).addClass("box-hover").removeClass("box-click");
  });
$("p").text("Press Any Key To Start The Game.");
//TIC TAC TOE
var gameStart = false;
var turn = "null";
var xCells = [];
var oCells = [];
var win = false;
var xClick = new Audio("sounds/X-Click.mp3");
var oClick = new Audio("sounds/O-Click.mp3");
var winner = new Audio("sounds/won.mp3");
var gameOver = new Audio("sounds/gameover.mp3");

function checkRankX() {
  if (xCells.length > 2) {
    //Vertical Check
    for (var i = 0; i < 3; i++) {
      if (xCells.includes(i)) {
        if (xCells.includes(i + 3)) {
          if (xCells.includes(i + 6)) {
            $("p").text("X WINS!!!");
            animate(i, i + 3, i + 6);
            youWin();
          }
        }
      }
    }
    //Diagonal Check from 0 to 8
    for (i = 0; i < 3; i++) {
      if (xCells.includes(i)) {
        if (xCells.includes(i + 4)) {
          if (xCells.includes(i + 8)) {
            $("p").text("X WINS!!!");
            animate(i, i + 4, i + 8);
            youWin();
          }
        }
      }
    }
    //Diagonal Check from 2 to 6
    for (i = 2; i < 3; i++) {
      if (xCells.includes(i)) {
        if (xCells.includes(i + 2)) {
          if (xCells.includes(i + 4)) {
            $("p").text("X WINS!!!");
            animate(i, i + 2, i + 4);
            youWin();
          }
        }
      }
    }
    //Horizontal Check
    for (i = 0; i < 7; i += 3) {
      if (xCells.includes(i)) {
        if (xCells.includes(i + 1)) {
          if (xCells.includes(i + 2)) {
            $("p").text("X WINS!!!");
            animate(i, i + 1, i + 2);
            youWin();
          }
        }
      }
    }
    if ((xCells.length + oCells.length) === 9 && win === false) {
      $("p").text("GAME OVER");
      gameOver.play();
      setTimeout(function() {
        startOver();
      }, 2000);
    }
  }
}

function checkRankO() {
  if (oCells.length > 2) {
    //Vertical Check
    for (var i = 0; i < 3; i++) {
      if (oCells.includes(i)) {
        if (oCells.includes(i + 3)) {
          if (oCells.includes(i + 6)) {
            $("p").text("O WINS!!!");
            animate(i, i + 3, i + 6);
            youWin();
          }
        }
      }
    }
    //Diagonal Check from 0 to 8
    for (i = 0; i < 3; i++) {
      if (oCells.includes(i)) {
        if (oCells.includes(i + 4)) {
          if (oCells.includes(i + 8)) {
            $("p").text("O WINS!!!");
            animate(i, i + 4, i + 8);
            youWin();
          }
        }
      }
    }
    //Diagonal Check from 2 to 6
    for (i = 2; i < 3; i++) {
      if (oCells.includes(i)) {
        if (oCells.includes(i+2)) {
          if (oCells.includes(i+4)) {
            $("p").text("O WINS!!!");
            animate(i, i + 2, i + 4);
            youWin();
          }
        }
      }
    }
    //Horizontal Check
    for (i = 0; i < 7; i += 3) {
      if (oCells.includes(i)) {
        if (oCells.includes(i + 1)) {
          if (oCells.includes(i + 2)) {
            $("p").text("O WINS!!!");
            animate(i, i + 1, i + 2);
            youWin();
          }
        }
      }
    }
  }
}

function youWin() {
  win = true;
  winner.play();
  setTimeout(function() {
    startOver();
  }, 1500);
}

function animate(a, b, c) {
  $("#" + a).addClass("won");
  $("#" + b).addClass("won");
  $("#" + c).addClass("won");
}

function startOver() {
  $(".box").text("");
  xCells = [];
  oCells = [];
  gameStart = false;
  $("p").text("Press Any Key To Start The Game.");
  $(".box").removeClass("clicked").removeClass("won").removeClass("turn-x").removeClass("turn-o");
  turn = "null";

}

$(document).on("keypress", function(event) {
  if (gameStart === false) {
    turn = "X";
    $("p").text("TURN OF " + turn);
    gameStart = true;
  }
});


$(".box").on("click", function() {
  if (turn === "X" && $(this).hasClass("clicked") === false) {
    $(this).text("X").toggleClass("turn-x").toggleClass("clicked");
    turn = "O";
    $("p").text("TURN OF " + turn);
    xCells.push($(this).index(".box"));
    console.log(xCells);
    xClick.play();
    checkRankX();
  }
  if (turn === "O" && $(this).hasClass("clicked") === false) {
    $(this).text("O").toggleClass("turn-o").toggleClass("clicked");
    turn = "X";
    $("p").text("TURN OF " + turn);
    oCells.push($(this).index(".box"));
    console.log(oCells);
    oClick.play();
    checkRankO();
  }
});
