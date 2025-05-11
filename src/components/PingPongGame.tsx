import React, { useEffect, useRef } from 'react';

const PingPongGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Game variables
    let animationFrameId: number;
    const paddleHeight = 40; // Smaller paddle height
    const paddleWidth = 6; // Smaller paddle width
    const ballRadius = 3; // Smaller ball radius
    let player1Score = 0;
    let player2Score = 0;
    const winningScore = 7;
    let gameOver = false;
    let resetTimeout: ReturnType<typeof setTimeout> | null = null;
    
    // Anti-stuck variables
    let stuckCounter = 0;
    let lastBallX = 0;
    let lastBallY = 0;

    // Ball object
    let ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      dx: 2, // Slower ball speed
      dy: 2,
      speed: 2,
      radius: ballRadius
    };

    // Paddle objects with AI
    let paddle1 = {
      x: 0,
      y: canvas.height / 2 - paddleHeight / 2,
      width: paddleWidth,
      height: paddleHeight,
      dy: 0,
      speed: 2
    };

    let paddle2 = {
      x: canvas.width - paddleWidth,
      y: canvas.height / 2 - paddleHeight / 2,
      width: paddleWidth,
      height: paddleHeight,
      dy: 0,
      speed: 2
    };

    // Draw functions
    function drawBall() {
      if (!context) return;
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      context.fillStyle = '#9b87f5';
      context.fill();
      context.closePath();
    }

    function drawPaddle(paddle: typeof paddle1) {
      if (!context) return;
      context.beginPath();
      context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
      context.fillStyle = '#FFFFFF';
      context.fill();
      context.closePath();
    }

    function drawScore() {
      if (!context || !canvas) return;
      context.font = '16px Arial'; // Smaller font
      context.fillStyle = '#FFFFFF';
      context.textAlign = 'center';
      context.fillText(player1Score.toString(), canvas.width / 4, 20); // Adjusted position
      context.fillText(player2Score.toString(), 3 * canvas.width / 4, 20);
    }

    // AI for paddles
    function updateAI() {
      // AI for paddle 1
      const paddle1TargetY = ball.y - paddle1.height / 2;
      
      // Add some difficulty by limiting the AI's reaction time
      if (ball.dx < 0 && ball.x < canvas.width / 2) {
        // Only move when ball is coming towards this paddle and in its half
        if (paddle1.y < paddle1TargetY - 10) {
          paddle1.y += paddle1.speed;
        } else if (paddle1.y > paddle1TargetY + 10) {
          paddle1.y -= paddle1.speed;
        }
      }
      
      // AI for paddle 2
      const paddle2TargetY = ball.y - paddle2.height / 2;
      
      if (ball.dx > 0 && ball.x > canvas.width / 2) {
        // Only move when ball is coming towards this paddle and in its half
        if (paddle2.y < paddle2TargetY - 10) {
          paddle2.y += paddle2.speed;
        } else if (paddle2.y > paddle2TargetY + 10) {
          paddle2.y -= paddle2.speed;
        }
      }
      
      // Make sure paddles don't go out of bounds
      if (paddle1.y < 0) paddle1.y = 0;
      if (paddle1.y + paddle1.height > canvas.height) paddle1.y = canvas.height - paddle1.height;
      
      if (paddle2.y < 0) paddle2.y = 0;
      if (paddle2.y + paddle2.height > canvas.height) paddle2.y = canvas.height - paddle2.height;
    }

    // Anti-stuck detection
    function checkIfStuck() {
      // If ball position hasn't changed much over several frames, it might be stuck
      const deltaX = Math.abs(ball.x - lastBallX);
      const deltaY = Math.abs(ball.y - lastBallY);
      
      if (deltaX < 0.5 && deltaY < 0.5) {
        stuckCounter++;
        
        // If ball appears stuck for too many frames, reset it
        if (stuckCounter > 90) { // ~1.5 seconds at 60fps
          // Give the ball a new direction to break it free
          ball.dx = (Math.random() > 0.5 ? 1 : -1) * 3;
          ball.dy = (Math.random() * 6 - 3);
          stuckCounter = 0;
        }
      } else {
        stuckCounter = 0;
      }
      
      lastBallX = ball.x;
      lastBallY = ball.y;
    }

    // Collision detection
    function detectCollision() {
      // Collision with top and bottom walls
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
      }

      // Collision with paddles
      if (ball.dx < 0 && ball.x - ball.radius < paddle1.x + paddle1.width && ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height) {
        ball.dx = -ball.dx;
        const hitPosition = (ball.y - (paddle1.y + paddle1.height / 2)) / (paddle1.height / 2);
        ball.dy = hitPosition * 5; // Adjust angle based on hit position
      } else if (ball.dx > 0 && ball.x + ball.radius > paddle2.x && ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
        ball.dx = -ball.dx;
        const hitPosition = (ball.y - (paddle2.y + paddle2.height / 2)) / (paddle2.height / 2);
        ball.dy = hitPosition * 5; // Adjust angle based on hit position
      }

      // Scoring
      if (ball.x - ball.radius < 0) {
        player2Score++;
        resetBall();
      } else if (ball.x + ball.radius > canvas.width) {
        player1Score++;
        resetBall();
      }

      // Check for game over
      if (player1Score >= winningScore || player2Score >= winningScore) {
        gameOver = true;
        
        // Auto-restart after 3 seconds
        if (resetTimeout === null) {
          resetTimeout = setTimeout(() => {
            resetGame();
            resetTimeout = null;
          }, 3000);
        }
      }
    }

    function resetBall() {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.dx = -ball.dx;
      ball.dy = Math.random() * 6 - 3; // Random vertical direction
      stuckCounter = 0; // Reset stuck counter
    }

    function resetGame() {
      player1Score = 0;
      player2Score = 0;
      gameOver = false;
      resetBall();
    }

    function drawGameOver() {
      if (!context || !canvas) return;
      
      context.fillStyle = 'rgba(0, 0, 0, 0.5)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      context.font = '16px Arial'; // Smaller font
      context.fillStyle = '#FFFFFF';
      context.textAlign = 'center';
      context.fillText(`${player1Score > player2Score ? 'Left' : 'Right'} player wins!`, canvas.width / 2, canvas.height / 2);
      context.font = '12px Arial'; // Smaller font
      context.fillText('Restarting game...', canvas.width / 2, canvas.height / 2 + 20); // Adjusted position
    }

    function draw() {
      if (!context || !canvas) return;
      
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw elements
      drawBall();
      drawPaddle(paddle1);
      drawPaddle(paddle2);
      drawScore();
      
      if (!gameOver) {
        // Update AI
        updateAI();
        
        // Move the ball
        ball.x += ball.dx;
        ball.y += ball.dy;
        
        // Detect collisions
        detectCollision();
        
        // Check if ball is stuck
        checkIfStuck();
      } else {
        drawGameOver();
      }
      
      requestIdRef.current = requestAnimationFrame(draw);
    }

    // Start the game
    requestIdRef.current = requestAnimationFrame(draw);

    // Resize function to keep the game responsive
    function handleResize() {
      if (!canvas) return;
      
      const parentWidth = canvas.parentElement?.clientWidth || canvas.width;
      const scale = Math.min(1, parentWidth / 220); // Adjusted base width for smaller cards
      
      canvas.style.transform = `scale(${scale})`;
      canvas.style.transformOrigin = 'top left';
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
      if (resetTimeout) {
        clearTimeout(resetTimeout);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="relative bg-black rounded-lg overflow-hidden w-full h-full">
        <canvas ref={canvasRef} width={220} height={140} className="bg-black w-full h-full" />
      </div>
    </div>
  );
};

export default PingPongGame;
