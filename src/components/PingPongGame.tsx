
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const PingPongGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Game variables - scale based on screen size
    const paddleHeight = isMobile ? 40 : 50; 
    const paddleWidth = isMobile ? 8 : 10;
    const ballRadius = isMobile ? 4 : 5;
    let player1Score = 0;
    let player2Score = 0;
    const winningScore = 7;
    let gameOver = false;
    let resetTimeout: ReturnType<typeof setTimeout> | null = null;
    
    // Anti-stuck variables
    let stuckCounter = 0;
    let lastBallX = 0;
    let lastBallY = 0;

    // Calculate game speed based on screen size
    const gameSpeed = isMobile ? 2 : 2.5;
    
    // Increased paddle speed (from gameSpeed to 1.5x gameSpeed)
    const paddleSpeed = gameSpeed * 1.5;
    
    // Speed increase percentage per hit
    const speedIncreasePerHit = 0.045; // 4.5%

    // Ball object
    let ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      dx: gameSpeed,
      dy: gameSpeed,
      speed: gameSpeed,
      radius: ballRadius
    };

    // Paddle objects with AI
    let paddle1 = {
      x: 0,
      y: canvas.height / 2 - paddleHeight / 2,
      width: paddleWidth,
      height: paddleHeight,
      dy: 0,
      speed: paddleSpeed
    };

    let paddle2 = {
      x: canvas.width - paddleWidth,
      y: canvas.height / 2 - paddleHeight / 2,
      width: paddleWidth,
      height: paddleHeight,
      dy: 0,
      speed: paddleSpeed
    };

    // Draw functions
    function drawBall() {
      if (!context) return;
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      context.fillStyle = '#FFFFFF';
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

    function drawDottedLine() {
      if (!context || !canvas) return;
      
      context.beginPath();
      context.setLineDash([5, 10]);
      context.moveTo(canvas.width / 2, 0);
      context.lineTo(canvas.width / 2, canvas.height);
      context.strokeStyle = '#FFFFFF';
      context.stroke();
      context.setLineDash([]);
    }

    function drawScore() {
      if (!context || !canvas) return;
      const fontSize = isMobile ? '24px' : '32px';
      context.font = `${fontSize} Arial`;
      context.fillStyle = '#FFFFFF';
      context.textAlign = 'center';
      context.fillText(player1Score.toString(), canvas.width / 4, 50);
      context.fillText(player2Score.toString(), 3 * canvas.width / 4, 50);
    }

    // AI for paddles
    function updateAI() {
      // AI for paddle 1
      const paddle1TargetY = ball.y - paddle1.height / 2;
      
      // Add some difficulty by limiting the AI's reaction time
      if (ball.dx < 0 && ball.x < canvas.width / 2) {
        // Only move when ball is coming towards this paddle and in its half
        if (paddle1.y < paddle1TargetY - 15) {
          paddle1.y += paddle1.speed;
        } else if (paddle1.y > paddle1TargetY + 15) {
          paddle1.y -= paddle1.speed;
        }
      }
      
      // AI for paddle 2
      const paddle2TargetY = ball.y - paddle2.height / 2;
      
      if (ball.dx > 0 && ball.x > canvas.width / 2) {
        // Only move when ball is coming towards this paddle and in its half
        if (paddle2.y < paddle2TargetY - 15) {
          paddle2.y += paddle2.speed;
        } else if (paddle2.y > paddle2TargetY + 15) {
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
          ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
          ball.dy = (Math.random() * 6 - 3);
          stuckCounter = 0;
        }
      } else {
        stuckCounter = 0;
      }
      
      lastBallX = ball.x;
      lastBallY = ball.y;
    }

    // Function to increase ball speed
    function increaseBallSpeed() {
      // Increase speed by 4.5%
      ball.speed *= (1 + speedIncreasePerHit);
      
      // Update dx and dy while preserving direction
      const directionX = ball.dx > 0 ? 1 : -1;
      const directionY = ball.dy > 0 ? 1 : -1;
      
      // Calculate new dx and dy based on speed and current angle
      const angle = Math.atan2(Math.abs(ball.dy), Math.abs(ball.dx));
      ball.dx = Math.cos(angle) * ball.speed * directionX;
      ball.dy = Math.sin(angle) * ball.speed * directionY;
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
        increaseBallSpeed(); // Increase ball speed on paddle hit
      } else if (ball.dx > 0 && ball.x + ball.radius > paddle2.x && ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
        ball.dx = -ball.dx;
        const hitPosition = (ball.y - (paddle2.y + paddle2.height / 2)) / (paddle2.height / 2);
        ball.dy = hitPosition * 5; // Adjust angle based on hit position
        increaseBallSpeed(); // Increase ball speed on paddle hit
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
      ball.dy = Math.random() * 4 - 2; // Random vertical direction
      // Reset ball speed to initial speed when a point is scored
      ball.speed = gameSpeed;
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
      
      const titleFontSize = isMobile ? '18px' : '24px';
      const subFontSize = isMobile ? '14px' : '16px';
      
      context.font = `${titleFontSize} Arial`;
      context.fillStyle = '#FFFFFF';
      context.textAlign = 'center';
      context.fillText(`${player1Score > player2Score ? 'Left' : 'Right'} wins!`, canvas.width / 2, canvas.height / 2);
      context.font = `${subFontSize} Arial`;
      context.fillText('Restarting...', canvas.width / 2, canvas.height / 2 + 30);
    }

    function draw() {
      if (!context || !canvas) return;
      
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw elements
      drawDottedLine();
      drawScore();
      drawBall();
      drawPaddle(paddle1);
      drawPaddle(paddle2);
      
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
      const parentHeight = canvas.parentElement?.clientHeight || canvas.height;
      
      // Set canvas dimensions to match container
      canvas.width = parentWidth;
      canvas.height = parentHeight;
      
      // Reset paddle positions and ball after resize
      paddle1.x = 0;
      paddle1.y = canvas.height / 2 - paddleHeight / 2;
      
      paddle2.x = canvas.width - paddleWidth;
      paddle2.y = canvas.height / 2 - paddleHeight / 2;
      
      resetBall();
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
  }, [isMobile]);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-full"
    />
  );
};

export default PingPongGame;
