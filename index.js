const cells = document.querySelectorAll(".cell");
let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;
let winner = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
intializeGame();
function intializeGame(){
    cells.forEach(element => {
        element.addEventListener("click",selectCell);
    });
    running = true;
    document.querySelector(".text-status").textContent = `${currentPlayer} Turn`;
    document.querySelector(".restart").addEventListener("click",restart);
}


function selectCell() {
    let index = this.getAttribute("index");
    if(options[index]!="" || !running)
        return;
    updateCell(this,index);
    checkWin();
}
function updateCell(cell,index) {
    options[index]=currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer() {
    currentPlayer = (currentPlayer=="X") ? "O":"X";
    document.querySelector(".text-status").textContent = `${currentPlayer} Turn`;
}
function checkWin() {
    let roundwon =false;
    for (let i = 0; i < winner.length; i++) {
        let cellA=options[winner[i][0]];
        let cellB=options[winner[i][1]];
        let cellC=options[winner[i][2]];
        if(cellA === cellB && cellB === cellC && cellA !=""){
            roundwon =true;
            break;
        }
    }
    if(roundwon){
        document.querySelector(".text-status").textContent = `${currentPlayer} wins`;
        running=false;
    }
    else if(!options.includes("")){
        document.querySelector(".text-status").textContent = "Draw";
        running=false;
    }else{
        changePlayer();
    }
}
function restart() {
    options = ["","","","","","","","",""];
    currentPlayer = "X";
    cells.forEach(element => element.textContent="");
    document.querySelector(".text-status").textContent = `${currentPlayer} Turn`;
    running = true;
}