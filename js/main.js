(function(){
	"use strict";
	var failCount = 0, livesCount = 3,
		blocks, lifes, gameOver = false, overlay, title,
		titles = {
			game: 'Find a candy',
			win: 'You win!',
			loose: 'You loose:('
		};

	function getRandom(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function blockClick(block, number){
		var candyNumber = getRandom(0, 5),
			isWin = candyNumber === number,
			backSide = block.children[1];

		block.classList.add('flipped');
		if(isWin){
			backSide.classList.add('candy');
			setTitle(titles.win);
			showOverlay();
		}else{
			lifes[failCount].classList.add('spent');
			failCount++;
			backSide.classList.add('fail');
		}

		gameOver = failCount === livesCount;

		setTimeout(function(){
			if(!isWin && !gameOver){
				block.classList.remove('flipped');
				backSide.classList.remove('fail');
			}
		}, 500);

		if(gameOver){
			setTitle(titles.loose);
			showOverlay();
		}
	}

	function showOverlay(){
		overlay.classList.add('active');
	}

	function hideOverlay(){
		overlay.classList.remove('active');
	}

	function resetGame(){
		var i;
		gameOver = false;
		failCount = 0;
		for(i = 0; i < lifes.length; i++){
			lifes[i].classList.remove('spent');
		}
		for(i = 0; i < blocks.length; i++){
			blocks[i].classList.remove('flipped');
			blocks[i].children[1].classList.remove('candy');
			blocks[i].children[1].classList.remove('fail');
		}
		setTitle(titles.game);
		hideOverlay();
	}

	function setTitle(text){
		var titleText = '';
		for(var i = 0; i < text.length; i++){
			titleText += '<span class="color-' + getRandom(0, 10) + '">' + text[i] + '</span>';
		}
		title.innerHTML = titleText;
	}

	window.addEventListener('load', function(){
		blocks = document.getElementsByClassName('block');
		lifes = document.getElementsByClassName('life');
		overlay = document.getElementsByClassName('overlay')[0];
		title = document.getElementsByClassName('title')[0];

		setTitle(titles.game);

		for(var i = 0; i < blocks.length; i++){
			(function(number){
				blocks[i].addEventListener('click', function(){
					blockClick(this, number);
				});
			})(i);
		}

		overlay.addEventListener('click', function(){
			resetGame();
		})
	});
})();