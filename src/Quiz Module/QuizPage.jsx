import React, { useState } from 'react';
import QuizData from '../Components/QuizData.json';

const QuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    
    const quiz = QuizData[0].quizzes[0];  
    const totalQuestions = quiz.questions.length;

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < totalQuestions) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowResult(true);
        }
    };

    return (
        <div>
            <h1>{quiz.quizTitle}</h1>
            {showResult ? (
                <div>
                    <h2>Your Score: {score} / {totalQuestions}</h2>
                </div>
            ) : (
                <div>
                    <h3>{quiz.questions[currentQuestion].questionsText}</h3>
                    <div>
                        {quiz.questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerOptionClick(option === quiz.questions[currentQuestion].correctAnswer)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
