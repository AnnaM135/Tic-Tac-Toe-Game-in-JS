let ticTacToeGame = new TicTacToeGame()
ticTacToeGame.start(); 

function TicTacToeGame() {
	let board = new Board();
	let humanPlayer = new HumanPlayer(board);
	let computerPlayer = new ComputerPlayer(board);
	let turn = 0;

	this.start = function() {
	let config = { childList: true};
	let observer = new MutationObserver(() => takeTurn());
	board.positions.forEach((el) => observer.observe(el, config));
	takeTurn();
	}	

	function takeTurn(){
		if (board.checkForWinner()) {
			return;
		}
		if (turn % 2 === 0) {
			humanPlayer.takeTurn();
		}else {
			computerPlayer.takeTurn();
		}
		turn++;
	}
}

function Board() {
	this.positions = Array.from(document.querySelectorAll(".col"));
	this.checkForWinner = function() {
		let winner = false;;
		let winningCombinations = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,4,8],
			[2,4,6],
			[0,3,6],
			[1,4,7],
			[2,5,8]
		];

		let positions = this.positions;
		winningCombinations.forEach((winningCombo) => {
			let pos0InnerText = positions[winningCombo[0]].innerText;
			let pos1InnerText = positions[winningCombo[1]].innerText;
			let pos2InnerText = positions[winningCombo[2]].innerText;
			let isWinningCombo = pos0InnerText !== '' && pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;
		
			if (isWinningCombo) {
				winner = true;
				winningCombo.forEach((index) => {
					positions[index].className += ' winner';
				})
			}
		});

		return winner;
	}
}

function HumanPlayer(board) {
	this.takeTurn = function() {
		board.positions.forEach(el => el.addEventListener('click', handleTurnTaken));
	}
	function handleTurnTaken(event) {
		event.target.innerText = 'X';
		board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken))
	}
}

function ComputerPlayer(board) {
	this.takeTurn = function() {
		let availablePositions = board.positions.filter((p) => p.innerText === '');
		let move = Math.floor(Math.random() * availablePositions.length);
		availablePositions[move].innerText = 'O';
	}
}