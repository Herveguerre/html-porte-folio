document.addEventListener('DOMContentLoaded', function() {
    const gameBoard = document.getElementById('game-board');
    const player = document.createElement('div');
    const bullets = [];
    const invaders = [];
    
  let score = 0;

  function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = 'Score: ' + score;
  }

  function increaseScore() {
    score += 10;
    updateScore();
  }
  
    player.id = 'player';
    gameBoard.appendChild(player);
  
    const playerWidth = player.offsetWidth;
    const playerHeight = player.offsetHeight;
    const gameBoardWidth = gameBoard.offsetWidth;
  
    let playerPosition = (gameBoardWidth - playerWidth) / 2;
    let isMovingLeft = false;
    let isMovingRight = false;
    let isSpacePressed = false;
  
    function updatePlayerPosition() {
      if (isMovingLeft && playerPosition > 0) {
        playerPosition -= 5;
      }
      if (isMovingRight && playerPosition < (gameBoardWidth - playerWidth)) {
        playerPosition += 5;
      }
      player.style.left = playerPosition + 'px';
    }
  
    function createBullet() {
      const bullet = document.createElement('div');
      bullet.className = 'bullet';
      bullet.style.left = (playerPosition + (playerWidth / 2) - 2.5) + 'px';
      bullet.style.bottom = (playerHeight + 10) + 'px';
      gameBoard.appendChild(bullet);
      bullets.push(bullet);
    }
  
    function updateBulletPositions() {
      bullets.forEach(function(bullet, index) {
        const top = bullet.offsetTop;
        if (top > 0) {
          bullet.style.top = (top - 5) + 'px';
        } else {
          bullet.remove();
          bullets.splice(index, 1);
        }
      });
    }
  
    function createInvader() {
      const invader = document.createElement('div');
      invader.className = 'invader';
      invader.style.left = Math.floor(Math.random() * (gameBoardWidth - 20)) + 'px';
      invader.style.top = '0px';
      gameBoard.appendChild(invader);
      invaders.push(invader);
    }
  
    function updateInvaderPositions() {
      invaders.forEach(function(invader, index) {
        const top = invader.offsetTop;
        if (top < (gameBoard.offsetHeight - 20)) {
          invader.style.top = (top + 2) + 'px';
        } else {
          invader.remove();
          invaders.splice(index, 1);
        }
      });
    }
  
    
    function checkCollision() {
        bullets.forEach(function(bullet, bulletIndex) {
          invaders.forEach(function(invader, invaderIndex) {
            const bulletRect = bullet.getBoundingClientRect();
            const invaderRect = invader.getBoundingClientRect();
            if (
              bulletRect.bottom >= invaderRect.top &&
              bulletRect.top <= invaderRect.bottom &&
              bulletRect.right >= invaderRect.left &&
              bulletRect.left <= invaderRect.right
            ) {
              bullet.remove();
              bullets.splice(bulletIndex, 1);
              invader.remove();
              invaders.splice(invaderIndex, 1);
            }
          });
        });
      }
    
      function gameLoop() {
        updatePlayerPosition();
        updateBulletPositions();
        updateInvaderPositions();
        checkCollision();
    
        if (isSpacePressed) {
          createBullet();
        }
    
        if (Math.random() < 0.01) {
          createInvader();
        }
    
        requestAnimationFrame(gameLoop);
      }
    
      function handleKeyDown(event) {
        if (event.code === 'ArrowLeft') {
          isMovingLeft = true;
        }
        if (event.code === 'ArrowRight') {
          isMovingRight = true;
        }
        if (event.code === 'Space') {
          isSpacePressed = true;
        }
      }
    
      function handleKeyUp(event) {
        if (event.code === 'ArrowLeft') {
          isMovingLeft = false;
        }
        if (event.code === 'ArrowRight') {
          isMovingRight = false;
        }
        if (event.code === 'Space') {
          isSpacePressed = false;
        }
      }
    
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
    
      gameLoop();
    });
    