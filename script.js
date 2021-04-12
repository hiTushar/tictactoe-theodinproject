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
    return {
        fetchState,  
        modifyState, 
    }
    
  })();

/* has game logic */
const gameplay = (() => { 
                let {fetchState, modifyState}  = gameBoard;           
                let currentState = fetchState(); 
                const MIN_TURNS = 5; // minimum No. of turns for someone to win
                const MAX_TURNS = 9; // maximum No. of turns possible
                const markers = ['x', 'o']; 

                let gameOver = 0; // == 1 if game is over

                let turnCount = 0; 
                const getTurn = function(){ // get turn - 'x' or 'o'  
                    return markers[turnCount % 2]; // starts with 'x'
                }; 
                const checkNextTurn = function() {
                    if(turnCount < MAX_TURNS){
                        return markers[++turnCount % 2];
                    }
                        
                    else 
                        return '.'; 
                    
                }
                const checkState = function(){ // game over or draw
                    if(turnCount >= MIN_TURNS) {

                        if(turnCount === MAX_TURNS) { 
                            // draw 
                            return 0; 
                        }
                    }
                    
                     
                }

                const resetState = function(){
                    for(let i = 0; i < 3; i++) {
                        for(let j = 0; j < 3; j++) {
                            modifyState(i, j, ''); 
                        }
                    }
                    turnCount = 0; 
                }

                return {
                    getTurn, 
                    checkNextTurn,
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

                            
                            function displayNextTurn() {
                                document.querySelector('#meta').innerText = gameplay.checkNextTurn(); 
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
    gridBlocks.forEach(block => block.addEventListener('click', () => {getInput(block);}));
    displayController.displayNextTurn(); 
}

function getInput(block) {
    let row = block.getAttribute('data-loc')[0]; 
    let col = block.getAttribute('data-loc')[1];
    
    if(!gameBoard.fetchState()[row][col]){ // that location is empty
        gameBoard.modifyState(row, 
                              col, 
                              gameplay.getTurn());
        displayController.displayBoard();   
        displayController.displayNextTurn();
    }
    
}

 window.onload = function(){
                    init(); 
                    displayController.displayBoard();
                };