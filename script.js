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

const game = ((board) => {
                let {fetchState, modifyState}  = board;           
                let currentState = fetchState(); 
                let turnCount = 0; 
                const MIN_TURNS = 5; // minimum No. of turns for someone to win
                const markers = ['x', 'o']; 

                const getTurn = function(){ // get turn - 'x' or 'o'  
                    return markers[turnCount++ % 2]; // starts with 'x'
                }; 
                const checkState = function(){ // game over or draw
                    if(turnCount >= MIN_TURNS) {

                        if(currentState.flat.every(block => block)) { 
                            // draw 
                        }
                    }
                    
                     
                }
                const resetGame = function(){

                }

             })(gameBoard);




function player(name, marker){
    return {name, marker}; 
}

gameBoard.display(); 