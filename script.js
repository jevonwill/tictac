function Gameboard() {
    const rows = 6;
    const columns = 7;
    const board = []

    //Create 2d array which represents gameboard
    //row 0 represents the top row
    // column 0 represents ther leftmost column

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }
}

function Cell() {
    let value = 0;
}