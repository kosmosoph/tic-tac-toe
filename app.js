//getting collection of HTML elements (liCollection), converting liCollection into Array and adding eventListener to every element of array
const liCollection = document.getElementsByClassName("field");
const liArray = Array.from(liCollection);
liArray.map(el => el.addEventListener("click", () => handleClick(el.id)));

//New Game button call to resetGame() function
document.getElementById("newgame").addEventListener("click", () => resetGame());

//display message field
let message = document.getElementById("message");

//declaring and initialising clickArr to hold array of clicked moves
let clickedFields = [];
let endGame = false;
let activePlayer = "player1";

//object with winning combinations
const combinations = {
  v1: [0, 1, 2],
  v2: [3, 4, 5],
  v3: [6, 7, 8],
  v4: [0, 3, 6],
  v5: [1, 4, 7],
  v6: [2, 5, 8],
  v7: [0, 4, 8],
  v8: [2, 4, 6]
};

//object to hold array of clicked fields for both players
const players = {
  player1: [],
  player2: []
};

// handleClick() is parsing passed field id parametar to number and adding that number to array of checked fields
const handleClick = id => {
  if (endGame) message.innerText = `Game is over! Start a new game!`;
  else {
    let num = parseInt(id);
    if (!clickedFields.includes(num)) {
      pushArray(activePlayer, num);

      if (clickedFields.length != 9) {
        activePlayer = "player2";
        autoPlayer();
      } else if (clickedFields.length === 9)
        message.innerText = `No winner! Start a new game!`;
    }
  }
};

// autoPlayer() is generating computer (player2) move
const autoPlayer = () => {
  let id = Math.floor(Math.random() * (9 - 0));
  if (!clickedFields.includes(id)) {
    pushArray(activePlayer, id);
    activePlayer = "player1";
  } else {
    autoPlayer();
  }
};

// pushArray() is pushing elements to clickedFields array, and players object in player1 or player2 propertie,  placing X or O in DOM
const pushArray = (actPlay, id) => {
  const field = document.getElementById(id);
  clickedFields.push(id);
  players[actPlay].push(id);
  actPlay === "player1" ? (field.textContent = "X") : (field.textContent = "O");

  players[activePlayer].length >= 3 && iterateObj();
};

// iterateObj() is calling compareArrays() for every element of combinations object and checking for match of arrays with palyers[activePlayer] array
const iterateObj = () => {
  for (arr in combinations) {
    let res = compareArrays(players[activePlayer], combinations[arr]);
    if (res) {
      message.innerText = `${activePlayer} is winner!`;
      endGame = true;
      break;
    }
  }
};

// compareArrays() is comparing the number of same elements in both arrays
const compareArrays = (playArr, combArr) => {
  let numInsideArr = 0;
  playArr.forEach(el => combArr.includes(el) && numInsideArr++);
  return numInsideArr === 3;
};

//resetGame() function resets all parameters and fields to default state
const resetGame = () => {
   players.player1 = [];
   players.player2 = [];
   clickedFields = [];
  
  message.innerText = "";
  liArray.map(el => (el.textContent = ""));
  endGame = false;
};
