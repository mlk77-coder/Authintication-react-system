import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`
      bg-white p-6 md:p-8 rounded-xl shadow-lg 
      border border-gray-100 
      transform transition-all duration-300 
      hover:shadow-xl 
      ${className}
    `}>
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card;