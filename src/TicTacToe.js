import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
      setHighScore(JSON.parse(storedHighScore));
    }
  }, []);

  const handleClick = (index) => {
    const newBoard = [...board];
    if (newBoard[index] || calculateWinner(newBoard)) return;

    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      const newScore = { ...score };
      newScore[winner] += 1;
      setScore(newScore);

      if (newScore[winner] > highScore) {
        setHighScore(newScore[winner]);
        localStorage.setItem('highScore', newScore[winner]);
      }
    }
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
  };

  const renderSquare = (index) => (
    <motion.div
      className="flex justify-center items-center shadow-lg h-24 w-24 md:h-32 md:w-32 bg-slate-500 rounded-lg font-bold text-white text-4xl cursor-pointer hover:bg-slate-600 transition duration-300"
      onClick={() => handleClick(index)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {board[index]}
    </motion.div>
  );

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-slate-300 p-4">
      <div className="flex flex-col items-center">
        <motion.h1
          className="text-4xl font-bold mb-5 bg-green-400 p-3 rounded shadow-lg"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Tic Tac Toe
        </motion.h1>
        <div className="text-lg mb-4">
          <div>Score X: {score.X}</div>
          <div>Score O: {score.O}</div>
          <div>High Score: {highScore}</div>
        </div>
        <div className="text-2xl font-semibold mb-4">{status}</div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {board.map((_, index) => renderSquare(index))}
        </div>
        
      </div>
      <motion.button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition duration-300"
        onClick={resetBoard}
      >
        Reset
      </motion.button>
    </div>
  );
};

export default TicTacToe;
