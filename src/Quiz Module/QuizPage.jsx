import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { JavaScript } from "../Components/Quizz Questions/QuizData";
import { ReactJs } from '../Components/Quizz Questions/ReactQuiz';
import { Java } from '../Components/Quizz Questions/Java';
import { Nodejs } from '../Components/Quizz Questions/NodeQuiz';
import { AndroidDevelopment } from '../Components/Quizz Questions/AndroidQuiz';
import { Python } from '../Components/Quizz Questions/Python';

const QuizPage = () => {
  const { courseName: paramCourseName } = useParams();
  const courseName = paramCourseName || localStorage.getItem("courseName");
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState({});
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(30);
  const [showAnswer, setShowAnswer] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  let questions = [];
  switch (courseName) {
    case 'Python Course':
      questions = Python;
      break;
    case 'Java':
      questions = Java;
      break;
    case 'React Js':
      questions = ReactJs;
      break;
    case 'Node Js':
      questions = Nodejs;
      break;
    case 'Android Development':
      questions = AndroidDevelopment;
      break;
    case 'JavaScript':
    default:
      questions = JavaScript;
      break;
  }

  useEffect(() => {
    setQuestion(questions[index]);
  }, [index, questions]);

  useEffect(() => {
    let interval;
    if (!lock) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(interval);
      setLock(true);
      setShowAnswer(true);
      highlightAnswer();
    }

    return () => clearInterval(interval);
  }, [lock, timer]);

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('bg-green-500', 'text-white'); 
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('bg-red-500', 'text-white');    
        highlightAnswer();
      }
      setLock(true);
      setShowAnswer(true);
    }
  };
  
  const highlightAnswer = () => {
    option_array[question.ans - 1].current.classList.add('bg-green-500', 'text-white'); 
  };

  const ChangeQuestion = () => {
    if (lock) {
      if (index === questions.length - 1) {
        setResult(true);
        return;
      }
      const newIndex = index + 1;
      setIndex(newIndex);
      setLock(false);
      setShowAnswer(false);
      setTimer(30);
      option_array.forEach((option) => {
        if (option.current) {
          option.current.classList.remove('bg-black', 'text-white', 'bg-white', 'text-black');
        }
      });
    }
  };

  const movetoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-16 pt-32 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-md"
      >
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-black">{courseName} Quiz Contest</h1>
          </div>
          {result ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-xl font-semibold mb-4 text-black">Quiz Completed!</h2>
              <p className="text-lg mb-6 text-black">You scored {score} out of {questions.length}</p>
              <button
                onClick={movetoHome}
                className="w-full bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800 transition duration-300"
              >
                Back to Home
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-medium text-black mb-2">
                  {index + 1}. {question.question}
                </h2>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                  <motion.div
                    className="bg-black h-2.5 rounded-full"
                    initial={{ width: '100%' }}
                    animate={{ width: `${(timer / 30) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">Time remaining: {timer} seconds</p>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {['option1', 'option2', 'option3', 'option4'].map((opt, i) => (
                    <motion.button
                      key={i}
                      ref={option_array[i]}
                      onClick={(e) => checkAns(e, i + 1)}
                      className="w-full text-left px-4 py-2 border border-black rounded-md hover:bg-gray-100 transition duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {question[opt]}
                    </motion.button>
                  ))}
                </motion.div>
              </AnimatePresence>
              {showAnswer && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm text-gray-600"
                >
                  The correct answer is:{' '}
                  <span className="font-medium">{option_array[question.ans - 1].current.textContent}</span>
                </motion.p>
              )}
            </>
          )}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-600">
              Question {index + 1} of {questions.length}
            </p>
            <motion.button
              onClick={ChangeQuestion}
              disabled={!lock && !result}
              className={`bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                (!lock && !result) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
              } transition duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {index === questions.length - 1 ? 'Finish' : 'Next'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizPage;