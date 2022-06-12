const numOfRows = 12;
const numOfColumn = 12;
const numBombs = 45;
const bombs = "💣";
const alive = true;
let colors = [
  "blue",
  "green",
  "red",
  "purple",
  "maroon",
  "turquoise",
  "black",
  "grey",
];

window.addEventListener("load", function () {
  document.querySelector("lost").style.display = "none";
  startGame();
}); //calling startGame () each time the page is loaded

const startGame = () => {
  bombs = placeBombs();
  document.querySelector("field").append(createTable());
}; //This function is used to create a table and initialize bombs

const idCell = (x, y) => {
  return "cell-" + x + "-" + y;
};

const createTable = () => {
  let table, row, td, x, y;
  table = document.createElement("table");

  for (x = 0; x < numOfRows; x++) {
    row = document.createElement("tr");
    for (y = 0; y < numOfColumn; y++) {
      td = document.createElement("td");
      td.id = idCell(x, y);
      row.append(td);
      addCellListeners(td, x, y);
    }
    table.append(row);
  }
  return table;
};
const placeBombs = () => {
    let x,rows=[]

    for(x=0;x<numBombs;x++){
        placeSingleBombs(rows)
    }
    return rows
}

const placeSingleBomb = (bombs) => {
    let row,col,nrow,ncol;
    row=Math.floor(Math.random()*numOfRows)
    col=Math.floor(Math.random()*numOfColumn)
    row=bombs[row]

    if(!nrow){
        row=[]
        bombs[row]=row
    }
    ncol=row[col]

    if(!ncol){
        row[col]=true
        return
    }else{
        placeSingleBomb(bombs)
    }
}
