//add selectors for rock paper and scissors elements
let rock= document.querySelector(".rock-player");
let paper= document.querySelector(".paper-player");
let scissors= document.querySelector(".scissors-player");
let rockComputer= document.querySelector(".rock-pc");
let paperComputer= document.querySelector(".paper-pc");
let scissorsComputer= document.querySelector(".scissors-pc");
let winningText= document.querySelector("#winningText");
let playerScoreDisplay= document.querySelector("#playerScore");
let computerScoreDisplay= document.querySelector("#computerScore");


// create function to select computer move
function selectComputerMove(){

	//initiate variable to hold computer move
	let computerMove;

	//create an array with three values: rock paper scissors 	
	const choicesArr = ['ROCK', 'PAPER', 'SCISSORS'];
	
	//declare variable randomNum and assign a random number from 0-3 
	let randomNum = Math.floor(Math.random()*3);

	//select computer move
	computerMove = choicesArr[randomNum];

	//adjust opacity of selected move
	switch (computerMove){
		case "ROCK":
			rockComputer.style.opacity = 1;
			paperComputer.style.opacity = 0.5;
			scissorsComputer.style.opacity = 0.5;
			break;
		case "PAPER":
			rockComputer.style.opacity = 0.5;
			paperComputer.style.opacity = 1;
			scissorsComputer.style.opacity = 0.5;
			break;
		default:
			rockComputer.style.opacity = 0.5;
			paperComputer.style.opacity = 0.5;
			scissorsComputer.style.opacity = 1;
	}

        //return the value of the array at index randomNum
	return computerMove;
}

//create function to declare winner of round of RPS, needs two choices as parameters
function declareWinner(computerMove, playerMove){
	
	//use switch statement to decide winner
	switch(computerMove+playerMove){
		case "ROCKSCISSORS":
		case "PAPERROCK":
		case "SCISSORSPAPER":
			return "Computer"
		case "SCISSORSROCK":
		case "ROCKPAPER":
		case "PAPERSCISSORS":
			return "Player"
		default:
			return "Draw"
	}
}



//create function to store/increment player score
function playerScore(point, computerMove, rockMethod, paperMethod, scissorsMethod){	

	//create variable to serve as player score 
	let playerScore = 0;

	//return function with parameter (point, computerMove, rockMethod, paperMethod, scissorsMethod)
	return function(point, computerMove, rockMethod, paperMethod, scissorsMethod) {
		//check that point exist, 
		if (point){
			//if yes increment player score 
			++playerScore
			
			//display player score
			playerScoreDisplay.textContent = `${playerScore}/5`;
			
		} 

		//call stop game function if score >= 5, pass winner and methods
		if (playerScore >= 5){
			stopGame("player", rockMethod, paperMethod, scissorsMethod)
		}
		//if no, return current score
		return playerScore
	}
}

//create function to store/increment computer score
function computerScore(point, computerMove, rockMethod, paperMethod, scissorsMethod){

	//create variable to serve as computer score 
	let computerScore = 0;

	//return function with parameter (point, computerMove, rockMethod, paperMethod, scissorsMethod)
	return function(point, computerMove, rockMethod, paperMethod, scissorsMethod) {
		//check that point exist, 
		if (point){
			//if yes increment computer score
			++computerScore;

			//display computer score
			computerScoreDisplay.textContent = `${computerScore}/5`;

		} 
		
		//call stop game function if score >= 5, pass winner
		if (computerScore >= 5){
			stopGame("computer", rockMethod, paperMethod, scissorsMethod)	
			
		}
		//if no, return current computer score
		return computerScore
	}
}	


//create function to play a round of RPS 

//create function to play a round of R, P , S, pass in functions to increment score
function playRound(playerMove, currentPlayerScore, currentComputerScore, rockMethod, paperMethod, scissorsMethod){

	//initiate variable for round winner
	let roundWinner;

	//initiate variable for computer move and call function to select computer move
	let computerMove = selectComputerMove();

	//if player move is null, cancel game
	if (playerMove == null){
		return null
	}

	//call function to declare winner and store in winner variable, pass computer and player moves
	roundWinner = declareWinner(computerMove, playerMove);
	
	//if draw, declare a draw and call the play round function again
	if (roundWinner == "Draw"){
		winningText.textContent = `Computer chose ${computerMove}, it's a draw!`;
		//return playRound(currentPlayerScore, currentComputerScore)
	
	//if player wins, call player increment function and return result, pass in computer move
	}else if (roundWinner == "Player"){
		winningText.textContent = `Computer chose ${computerMove}, you win!`;
		currentPlayerScore("point", "computerMove", rockMethod, paperMethod, scissorsMethod);
		//return currentPlayerScore("Player", computerMove)
	
	//else call computer increment function and return result, pass in computer move
	}else{
		winningText.textContent = `Computer chose ${computerMove}, you lose!`;
		currentComputerScore("point", "computerMove", rockMethod, paperMethod, scissorsMethod);
		//return currentComputerScore("Player", computerMove)

	}
	


}

//create function to add play again button
function addPlayAgainButton(winner){
	//create button
	let button = document.createElement("button");

	//add button text
	button.innerHTML =  (winner == "player") ? "You win! Play again?": "Computer wins, play again?";

	//add button class
	button.classList.add("playAgainButton")
	//Object.assign(button.style, buttonStyle);

	//apend child
	document.body.appendChild(button);

	//create function to call reset game, pass method and button
	let resetMethod = () => resetGame(button, resetMethod)

	//start listening to add play again button and pass in the funciton that calls reset game
	button.addEventListener("click", resetMethod);
}

//create function to stop game
function stopGame(winner, rockMethod, paperMethod, scissorsMethod){

	//set icons opacity to 1
	rock.style.opacity = 1;
	paper.style.opacity = 1;	
	scissors.style.opacity = 1;	
	rockComputer.style.opacity = 1;
	paperComputer.style.opacity = 1;	
	scissorsComputer.style.opacity = 1;	
	
	
	//stop icon listeners
	rock.removeEventListener("click", rockMethod);
	paper.removeEventListener("click", paperMethod);
	scissors.removeEventListener("click", scissorsMethod);

	//call function to add play again button
	addPlayAgainButton(winner)

}

//create function to reset game, pass play again method
function resetGame(button, resetMethod){
	
	//reset scores to 0
	playerScoreDisplay.textContent = `0/5`;
	computerScoreDisplay.textContent = `0/5`;

	//set icons opacity to 0.5
	rock.style.opacity = 0.5;
	paper.style.opacity = 0.5;	
	scissors.style.opacity = 0.5;	
	rockComputer.style.opacity = 0.5;
	paperComputer.style.opacity = 0.5;	
	scissorsComputer.style.opacity = 0.5;	

	//stops listening to play again button
	button.removeEventListener("click", resetMethod);

	//unappend button from page
	document.body.removeChild(button)

	//calls function to start listeners
	startListening()
}


	

//create function to start listeners
function startListening(){

	let currentPlayerScore = playerScore();
	let currentComputerScore = computerScore();

	//add methods
	let rockMethod = () => playRound("ROCK", currentPlayerScore, currentComputerScore, rockMethod, paperMethod, scissorsMethod);
	let paperMethod = () => playRound("PAPER", currentPlayerScore, currentComputerScore, rockMethod, paperMethod, scissorsMethod);
	let scissorsMethod = () => playRound("SCISSORS", currentPlayerScore, currentComputerScore, rockMethod, paperMethod, scissorsMethod);


	//add event listeners
	rock.addEventListener("click", rockMethod);
	paper.addEventListener("click", paperMethod);
	scissors.addEventListener("click", scissorsMethod);

}

startListening();
