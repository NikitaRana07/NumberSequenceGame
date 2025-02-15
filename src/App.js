import React, { useState, useEffect } from "react";
import "./App.css";

const generateGrid = (startNumber) => {
  const numbers = Array.from({ length: 25 }, (_, i) => startNumber + i);
  return numbers.sort(() => Math.random() - 0.5);
};

export default function App() {
  const [startNumber, setStartNumber] = useState(1);
  const [grid, setGrid] = useState(generateGrid(startNumber));
  const [currentNumber, setCurrentNumber] = useState(startNumber);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [chosenNumbers, setChosenNumbers] = useState(new Set());

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleNumberClick = (num) => {
    if (num === currentNumber) {
      setScore(score + 1);
      setCurrentNumber(currentNumber + 1);
      setChosenNumbers(new Set(chosenNumbers).add(num));
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    const newStart = Math.floor(Math.random() * 50) + 1;
    setStartNumber(newStart);
    setGrid(generateGrid(newStart));
    setCurrentNumber(newStart);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setChosenNumbers(new Set());
  };

  // Determine animation class based on score
  const getAnimationClass = () => {
    if (score >= 15) return "celebration-high";
    else if (score >= 5) return "celebration-medium";
    else return "celebration-low";
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Number Sequence Game</h1>
        <p className="info">
          Find numbers in sequence starting from: <strong>{startNumber}</strong>
        </p>
        <p className="info">
          Time Left: <strong>{timeLeft}</strong> seconds
        </p>
        <div className="grid">
          {grid.map((num, index) => (
            <button
              key={index}
              className={`grid-btn ${chosenNumbers.has(num) ? "chosen" : ""}`}
              onClick={() => handleNumberClick(num)}
              disabled={gameOver || chosenNumbers.has(num)}
            >
              {num}
            </button>
          ))}
        </div>
        {gameOver && (
          <div className={`game-over ${getAnimationClass()}`}>
            <p className="score">Game Over! Your Score: {score}</p>
            <button className="restart-btn" onClick={restartGame}>
              Restart Game
            </button>
          </div>
        )}
      </header>
    </div>
  );
}
