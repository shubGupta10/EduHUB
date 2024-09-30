import React, { useEffect, useState } from 'react';
import { useFirebase } from '../../Context/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomeChat = () => {
  const { user, matchUser } = useFirebase();
  const [userInfo, setUserInfo] = useState({ displayName: '', role: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = await matchUser(user);
        setUserInfo(currentUser);
      } catch (error) {
        console.error("Failed to get Current User", error);
      }
    };

    if (user) {
      getCurrentUser();
    }
  }, [user, matchUser]);

  const handleJoinClick = () => {
    if (userInfo.displayName.trim()) {
      console.log(`${userInfo.displayName}`);
      navigate("/chatRoom")
    } else {
      console.log("Name input is empty");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Join the Discussion
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="text-center">
            <p className="text-xl font-medium text-gray-900">Ready to participate in the discussion?</p>
            <div className="mt-4 space-y-2">
              <p className="text-lg">
                <span className="font-semibold">Name:</span> {userInfo.displayName}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Role:</span> {userInfo.role}
              </p>
            </div>
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinClick}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
            >
              Click to Join
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeChat;