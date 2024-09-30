import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loader from '../Components/Loader';

const QuizRulesPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { courseName: paramsCourse } = useParams();
  const [titleName, setTitleName] = useState('');
  
  const courseName = paramsCourse || localStorage.getItem('courseName');

  useEffect(() => {
    setTitleName(courseName);
  }, [courseName]);

  const handleStartQuiz = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/quizpage');
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12"> 
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <motion.div 
          className="container mx-auto px-4 py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.header variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl font-bold text-black">Quiz Rules</h1>
          </motion.header>

          <motion.main variants={itemVariants} className="bg-white rounded-lg shadow-lg p-8">
            <section>
              <motion.p variants={itemVariants} className="text-xl mb-6">
                Welcome to the <span className="font-semibold text-black">{titleName}</span> Quiz Contest! Before you begin, please read the rules carefully:
              </motion.p>

              <motion.ol variants={itemVariants} className="list-decimal list-inside space-y-4 mb-8">
                <li>This quiz consists of multiple-choice questions related to {titleName}.</li>
                <li>You will have 4 options for each question. Choose the correct option by clicking on it.</li>
                <li>Once you select an option, it will be highlighted as correct or wrong.</li>
                <li>After answering, click "Next" to move to the next question. You cannot go back to previous questions.</li>
                <li>You will see your progress at the bottom showing which question you are on.</li>
                <li>The quiz ends after 10 questions. Your score will be displayed at the end.</li>
              </motion.ol>

              <motion.p variants={itemVariants} className="text-xl mb-8">
                Are you ready to test your <span className="font-semibold text-black">{titleName}</span> knowledge?
              </motion.p>

              <motion.button
                variants={itemVariants}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                onClick={handleStartQuiz}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Quiz
              </motion.button>
            </section>
          </motion.main>
        </motion.div>
      )}
    </div>
  );
};

export default QuizRulesPage;