import React, { useEffect, useRef, useState } from 'react';
import './QuizPage.css';
import { JavaScript } from '../Components/QuizData';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(JavaScript[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(30);
  const [showAnswer, setShowAnswer] = useState(false);

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
  }, [ lock, timer]);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('Correct');
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('Wrong');
        highlightAnswer();
      }
      setLock(true);
      setShowAnswer(true);
    }
  };

  const highlightAnswer = () => {
    option_array[question.ans - 1].current.classList.add('Correct');
  };

  const ChangeQuestion = () => {
    if (lock) {
      if (index === JavaScript.length - 1) {
        setResult(true);
        return;
      }
      const newIndex = index + 1;
      setIndex(newIndex);
      setQuestion(JavaScript[newIndex]);
      setLock(false);
      setShowAnswer(false);
      setTimer(30);
      option_array.forEach((option) => {
        if (option.current) {
          option.current.classList.remove('Wrong');
          option.current.classList.remove('Correct');
        }
      });
    }
  };

  const movetoHome = () => {
    navigate('/');
  };

  return (
    <div className="quiz-container">
      <header>
        <h1 className="quiz-title">JavaScript Quiz Contest</h1>

        {result ? (
          <div className="result">
            <h1>You have Scored {score} out of {JavaScript.length}</h1>
            <button onClick={movetoHome}>Back to Home</button>
          </div>
        ) : (
          <section>
            <h2 className="question">
              {index + 1}. {question.question}
            </h2>
            <p className="timer">Time remaining: {timer} seconds</p>
            <ul className="options-list">
              <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
                {question.option1}
              </li>
              <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
                {question.option2}
              </li>
              <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
                {question.option3}
              </li>
              <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
                {question.option4}
              </li>
            </ul>
            {showAnswer && (
              <p className="answer-message">
                The correct answer is{' '}
                {option_array[question.ans - 1].current.textContent}
              </p>
            )}
            <button onClick={ChangeQuestion} className="next-button">
              Next
            </button>
            <p className="question-counter">
              {index + 1} of {JavaScript.length} questions
            </p>
          </section>
        )}
      </header>
    </div>
  );
};

export default QuizPage;