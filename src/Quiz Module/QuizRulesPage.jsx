import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import './QuizRulesPage.css'; 

const QuizRulesPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuiz = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/quizpage');
    }, 1000);
  };

  return (
    <div className="quiz-rules-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <h1 className="quiz-title">Quiz Rules</h1>
          </header>

          <main>
            <section className="rules-section">
              <p className="welcome-text">
                Welcome to the JavaScript Quiz Contest! Before you begin, please read the rules
                carefully:
              </p>

              <ol className="rules-list">
                <li>This quiz consists of multiple-choice questions related to JavaScript.</li>
                <li>You will have 4 options for each question. Choose the correct option by clicking on it.</li>
                <li>Once you select an option, it will be highlighted as correct or wrong.</li>
                <li>After answering, click "Next" to move to the next question. You cannot go back to previous questions.</li>
                <li>You will see your progress at the bottom showing which question you are on.</li>
                <li>The quiz ends after 10 questions. Your score will be displayed at the end.</li>
              </ol>

              <p className="ready-text">Are you ready to test your JavaScript knowledge?</p>

              <button className="start-quiz-button" onClick={handleStartQuiz}>
                Start Quiz
              </button>
            </section>
          </main>
        </>
      )}
    </div>
  );
};

export default QuizRulesPage;
