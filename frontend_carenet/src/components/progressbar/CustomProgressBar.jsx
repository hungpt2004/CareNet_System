import React from 'react';
import styles from '../../css/Progressbar.module.css';

const CustomProgressBar = ({ progress }) => {
  return (
    <div className={styles.progressContainer}>
      <div 
        className={styles.progressBar} 
        style={{ width: `${progress}%` }} // Thanh chạy mượt nhờ transition
      >
        <span className={styles.progressText}>{progress}%</span>
      </div>
    </div>
  );
};

export default CustomProgressBar;
