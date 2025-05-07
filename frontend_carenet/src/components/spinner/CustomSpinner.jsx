import React from 'react';
import './CustomSpinner.css';

const CustomSpinner = () => {
   return (
      <div className="spinner-container">
         <div className="spinner">
            <div className="spinner-circle"></div>
            <div className="spinner-circle"></div>
            <div className="spinner-circle"></div>
            <div className="spinner-circle"></div>
         </div>
         <div className="spinner-text">Đang tải...</div>
      </div>
   );
};

export default CustomSpinner; 