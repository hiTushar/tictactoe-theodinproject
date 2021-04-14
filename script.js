const boardDOM = document.getElementById('gameboard');

/* has access to gameboard state */
const gameBoard = (function(){
    const state =  [['', '', ''], ['', '', ''], ['', '', '']]; // keep state private
    const fetchState = function() {
        return state; 
    }
    const modifyState = function(i, j, marker) {
            state[i][j] = marker; 
    }
    const resetState = function(){
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                modifyState(i, j, ''); 
                
            }
        }
        displayController.displayBoard();   
        displayController.displayNextTurn(gameplay.checkState());
    }
    return {
        fetchState,  
        modifyState, 
        resetState
    }
    
  })();

/* has game logic */
const gameplay = (() => { 
                let {fetchState}  = gameBoard;           
                let currentState = fetchState(); 
                const MIN_TURNS = 5; // minimum No. of turns for someone to win
                const markers = ['O', 'X']; 

                let turnCount = 0; 
                const getTurn = function(){ // get turn - 'x' or 'o'  
                    return markers[turnCount % 2]; 
                }; 
                const getNextTurn = function() {
                    return markers[(++turnCount) % 2];
                }
                const checkState = function(){ // game over or draw
                    if(turnCount >= MIN_TURNS) { // minimum turns for the first player to reach a win..
                        for(let i = 0; i < 3; i++) {
                            if(currentState[i][0]){ // is not empty
                                if(currentState[i][0] === currentState[i][1] && currentState[i][1] === currentState[i][2]) // win detected over a row
                                {
                                    return getTurn(); // return winner
                                }
                            }
                            
                            if(currentState[0][i]){
                                if(currentState[0][i] === currentState[1][i] && currentState[1][i] === currentState[2][i]) // win detected over a column
                                {
                                    return getTurn(); // return winner
                                }
                            }
                        }

                        if(currentState[1][1]){
                            if ((currentState[0][0] === currentState[1][1] && currentState[1][1] === currentState[2][2]) // win detected over forward diagonal
                            || (currentState[0][2] === currentState[1][1] && currentState[1][1] === currentState[2][0])) // win detected over reverse diagonal
                            {
                                return getTurn(); // return winner
                            }
                        }
                        

                        
                        if(currentState.flat().every(block => block)) {  // all blocks are filled i.e. game is draw
                            return 'draw'; 
                        }

                       
                    }  
                    return 0; // game is not over yet
                }

                const resetState = function(){
                    turnCount = 0; 
                    displayController.displayNextTurn(0); 
                }

                return {
                    getTurn, 
                    getNextTurn,
                    checkState, 
                    resetState,
                };

             })();

/* has access to DOM to display the board */
const displayController = (() => {
                            let gridBlocks = Array.from(boardDOM.children); 
                            const state = (gameBoard.fetchState)(); 

                            function displayBoard() {
                                gridBlocks.forEach(block => {
                                                    let row = block.getAttribute('data-loc')[0]; 
                                                    let col = block.getAttribute('data-loc')[1];
                                                    block.innerHTML = `<p>${state[row][col]}</p>`; 
                                                })
                            }

                            
                            function displayNextTurn(result) {
                                
                                if(!result) { // if no result is reached yet
                                    document.querySelector('#meta span').innerText = `Next Turn: ${gameplay.getNextTurn()}`;     
                                }
                                else { // game over

                                    if(result === 'draw') {
                                        document.querySelector('#meta span').innerText = `It's a Draw !`;
                                    }
                                    else {
                                        document.querySelector('#meta span').innerText = `Winner: ${result} !`;
                                    }
                                }
                                
                            }

                            return {
                                displayBoard, 
                                displayNextTurn
                            };
                          })()


function player(name, marker){
    return {name, marker}; 
}

function init() {
    let gridBlocks = Array.from(boardDOM.children); 
    gridBlocks.forEach(block => block.addEventListener('click', ()=> {getInput(block); }));
    displayController.displayNextTurn(0); 

    document.querySelector('#meta button').addEventListener('click', () => {gameBoard.resetState(); gameplay.resetState()});
}


function getInput(block) {
    let row = block.getAttribute('data-loc')[0]; 
    let col = block.getAttribute('data-loc')[1];
    if(!gameBoard.fetchState()[row][col] && !Boolean(gameplay.checkState())){ // that location is empty and checkState function returns 0 (incase of a win before board fills up)
        gameBoard.modifyState(row, 
                              col, 
                              gameplay.getTurn());
        displayController.displayBoard();   
        displayController.displayNextTurn(gameplay.checkState());
    }
    
}

 window.onload = function(){
                    init(); 
                    displayController.displayBoard();
                };