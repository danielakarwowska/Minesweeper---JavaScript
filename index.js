const button = document.querySelector("button");
const showBoard = document.querySelector("#board");
showBoard.innerHTML = text;
const arr = [];

const show = () => {
  let text = "";
  for (y = 0; y < 8; y++) {
    for (x = 0; x < 8; x++) {
      text += arr[y][y] + "";
    }
    text += ""; //after each line, to the next line
  }
};

const start = () => {
  arr = []; //clearing the board
  for (let y = 0; x < 8; x++) {
    //lines 0 through 8
    arr[y] = [];
    for (let x = 0; x < 8; x++) {
      //columns 0 to 8
      arr[y][x] = 0; //reset each field of the board
    }
  }
  show();
};
