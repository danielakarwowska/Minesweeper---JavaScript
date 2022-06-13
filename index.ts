const grid:HTMLDivElement = document.querySelector(".grid");
const flagsLeft:HTMLSpanElement= document.querySelector("#flags-left");
const result:HTMLDivElement = document.querySelector("#result");
let width = 10;
let bombAmount:Number = 20;
let flags:Number|string = 0;
let squares= [];
let isGameOver:Boolean = false;
//create Board
const createBoard = () => {
  flagsLeft.innerHTML = bombAmount;

  //get shuffled game array with random bombs
  const bombsArray:Number[] = Array(bombAmount).fill("bomb");
  const emptyArray:Number[] = Array(width* width - bombAmount).fill("valid");
  const gameArray:Number[] = emptyArray.concat(bombsArray);
  const shuffledArray:Number[] = gameArray.sort(() => Math.random() - 0.5);

  for (let i:string|number = 0; i < width * width; i++) {
    const square:HTMLDivElement = document.createElement("div");
    square.setAttribute("id", i?);
    square.classList.add(shuffledArray?[i])
    grid.appendChild(square);
    squares.push(square);

    square.addEventListener("click",(e) => {
      click(square);
    });

    square.oncontextmenu = function (e) {
      e.preventDefault();
      addFlag(square);
    };
  }

  for (let i = 0; i < squares.length; i++) {
    let total = 0;
    const isLeftEdge:boolean = i % width === 0;
    const isRightEdge:boolean = i % width === width - 1;

    if (squares[i].classList.contains("valid")) {
      if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
        total++;
      if (
        i > 9 &&
        !isRightEdge &&
        squares[i + 1 - width].classList.contains("bomb")
      )
        total++;
      if (i > 10 && squares[i - width].classList.contains("bomb")) total++;
      if (
        i > 11 &&
        !isLeftEdge &&
        squares[i - 1 - width].classList.contains("bomb")
      )
        total++;
      if (i < 98 && !isRightEdge && squares[i + 1].classList.contains("bomb"))
        total++;
      if (
        i < 90 &&
        !isLeftEdge &&
        squares[i - 1 + width].classList.contains("bomb")
      )
        total++;
      if (
        i < 88 &&
        !isRightEdge &&
        squares[i + 1 + width].classList.contains("bomb")
      )
        total++;
      if (i < 89 && squares[i + width].classList.contains("bomb")) total++;
      squares[i].setAttribute("data", total);
    }
  }
};
createBoard();

const addFlag = (square: HTMLDivElement) => {
  if (isGameOver) return;
  if (!square.classList.contains("checked") && flags < bombAmount) {
    if (!square.classList.contains("flag")) {
      square.classList.add("flag");
      square.innerHTML = " 🚩";
      flags++;
      flagsLeft.innerHTML = bombAmount - flags;
      checkForWin();
    } else {
      square.classList.remove("flag");
      square.innerHTML = "";
      flags--;
      flagsLeft.innerHTML = bombAmount - flags;
    }
  }
}

const click = (square) => {
  let currentId = square.id;
  if (isGameOver) return;
  if (square.classList.contains("checked") || square.classList.contains("flag"))
    return;
  if (square.classList.contains("bomb")) {
    gameOver();
  } else {
    let total = square.getAttribute("data");
    if (total != 0) {
      square.classList.add("checked");
      if (total == 1) square.classList.add("one");
      if (total == 2) square.classList.add("two");
      if (total == 3) square.classList.add("three");
      if (total == 4) square.classList.add("four");
      square.innerHTML = total;
      return;
    }
    checkSquare(square, currentId);
  }
  square.classList.add("checked");
};

const checkSquare = (currentId) => {
  const isLeftEdge = currentId % width=== 0;
  const isRightEdge = currentId % width === width - 1;

  setTimeout(() => {
    if (currentId > 0 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) - 1].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId > 9 && !isRightEdge) {
      const newId = squares[parseInt(currentId) + 1 - width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId > 10) {
      const newId = squares[parseInt(currentId - width)].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId > 11 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) - 1 - width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 98 && !isRightEdge) {
      const newId = squares[parseInt(currentId) + 1].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 90 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) - 1 + width].id;
      //const newId = parseInt(currentId) -1 +width   ....refactor
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 88 && !isRightEdge) {
      const newId = squares[parseInt(currentId) + 1 + width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 89) {
      const newId = squares[parseInt(currentId) + width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
  }, 10);
};

//game over
const gameOver = () => {
  result.innerHTML = "BOOM! Game Over!";
  isGameOver = true;

  //show ALL the bombs
  squares.forEach((square) => {
    if (square.classList.contains("bomb")) {
      square.innerHTML = "💣";
      square.classList.remove("bomb");
      square.classList.add("checked");
    }
  });
};

const checkForWin = () => {
  let matches = 0;

  for (let i = 0; i < squares.length; i++) {
    if (
      squares[i].classList.contains("flag") &&
      squares[i].classList.contains("bomb")
    ) {
      matches++;
    }
    if (matches === bombAmount) {
      result.innerHTML = "YOU WIN!";
      isGameOver = true;
    }
  }
};
