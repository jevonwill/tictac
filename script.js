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

    //This will eventually be the method to getting the board
    const getBoard = () => board;

    const dropToken = (column, player) => {
        const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);

        if (!availableCells.length) return;

        const lowestRow = availableCells.length - 1;
        board[lowestRow][column].addToken(player);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }

    return {getBoard, dropToken, printBoard };


}

/*
** A Cell represents one "square" on the board and can have one of
** 0: no token is in the square,
** 1: Player One's token,
** 2: Player 2's token
*/


function Cell() {
    let value = 0;

    //Accept a players token to change the value of the cell.
    const addToken = (player) => {
        value = player;
    }

    //Retrieve the current value of cell
    const getValue = () => value;

    return {
        addToken,
        getValue
    }
}

/* 
** The GameController will be responsible for controlling the 
** flow and state of the game's turns, as well as whether
** anybody has won the game
*/

function GameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`It's ${getActivePlayer().name}'s turn. `);
    };

    const playRound = (column) => {
        //Drop token for current player
        console.log(
            `Dropping ${getActivePlayer().name}'s token into ${column}...`
        );

        board.dropToken(column, getActivePlayer().token)

        //Need to add win logic

        //Switch player turn
        switchPlayerTurn();
        printNewRound();
    }

    //Initial start game messsage
    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();