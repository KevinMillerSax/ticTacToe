/*---- constants -----*/
const WIN = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

/*------ app's state (variables) ------ */
let playerOne, playerTwo, selectedNum, turn, counter, pointCount1, pointCount2, oldButton; 


/*------ cached element references ------ */
const selectBox = document.querySelectorAll('#grid-box div');
const replayBtn = document.getElementById('reset');
const msgEl = document.querySelector('h2');
const gameBoardEl = document.getElementById('grid-box');

/*------ event listeners------- */
// gameBoardEl.addEventListener('click', characterClick);
replayBtn.addEventListener('click', init);

/*-------functions -------- */

init();


function init() {
    oldButton = [];
    playerOne = [];
    playerTwo = [];
    turn = true;
    counter = 0;
    replayBtn.style.visibility = 'hidden';
    gameBoardEl.addEventListener('click', characterClick);
    clearBoard();
    render();
}


function render() {
    msgEl.textContent = '';
    pointCount1 = 0;
    pointCount2 = 0;
    
    for (let i = 0; i < WIN.length; i++) {
        let combo = WIN[i];
        for (let j = 0; j < combo.length; j++) {
            let char = combo[j];
            if (playerOne.includes(char)) {
                pointCount1++;
            }
            if (playerTwo.includes(char)) {
                pointCount2++;
            }
            if (pointCount1 === 3) {
                msgEl.textContent = "Player One Wins!";
                removeListeners();
                toggleReset();
                break;
            }
            if (pointCount2 === 3) {
                msgEl.textContent = "Player Two Wins!";
                removeListeners();
                toggleReset();
                break;
            }
        }
        pointCount1 = 0;
        pointCount2 = 0;
    }
    if (counter === 9) {
        msgEl.textContent = "It's a Tie!"
        toggleReset();
    }
}


function characterClick(evt) {
   
    selectedNum = evt.target;
    
    if(selectedNum.classList.contains('clicked')){ 
        return;
    }
    let boxNum = selectedNum.id.slice(3);
 
    boxNum = Number(boxNum);


    if (turn) {
        evt.target.style.background = "url('images/X.png')";
        playerOne.push(boxNum);
        oldButton.push(boxNum);
    } else {
        evt.target.style.background = "url('images/O.png')";
        playerTwo.push(boxNum);
        oldButton.push(boxNum);
    }
    turn = !turn;
    counter++;
    selectedNum.classList.add('clicked');
   
    render();
}

function toggleReset() {
    replayBtn.style.visibility = 'visible';
    //if replay button.style.display === 'hidden' change it to visible, else hidden. 
}

function removeListeners(){
    gameBoardEl.removeEventListener('click', characterClick);
}

function clearBoard(){
    for(let i = 1; i <= selectBox.length; i++){
        let thisBox = document.getElementById(`box${i}`)
        thisBox.innerHTML = null;
        thisBox.classList.remove('clicked');
        thisBox.style.background = '';
    }
}


 


 // re-size board so it fits on browser screen
    