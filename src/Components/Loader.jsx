import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
    <motion.div
      className="loader"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      style={{
        width: '100px',
        height: '100px',
        border: '8px solid black',
        borderTop: '8px solid white',
        borderRadius: '50%',
      }}
    ></motion.div>
  </div>
);

export default Loader;
