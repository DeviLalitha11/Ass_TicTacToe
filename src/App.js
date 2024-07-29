import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TicTacToe from './TicTacToe';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');

  const handleTap = (index) => {

    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    setTurn(turn === 'X' ? 'O' : 'X');
  };

  return (
    <>
    
      <div className='bg-slate-300 w-screen h-screen'>
        <motion.h1
          initial={{ x: 0, y: 0, scale: 0.7 }}
          whileInView={{ x: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.3 }}
          className='w-100 h-20 justify-center items-center flex overflow-hidden bg-green-400 text-2xl font-bold shadow-lg'
        >
          Tic Tac Toe
        </motion.h1>
        <div className='grid grid-cols-3 gap-3 justify-items-center mt-10'>
          {board.map((value, index) => (
            <motion.div
              key={index}
              className='flex justify-center items-center shadow-lg h-40 w-40 bg-slate-500 rounded-lg font-bold text-white text-5xl cursor-pointer'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onTap={() => handleTap(index)}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>
      
    </>
  );
}

export default App;


