import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  className = '',
  disabled = false 
}) => {
  const baseClasses = 'px-6 py-2 rounded-lg font-medium transition duration-300';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-green-700',
    secondary: 'bg-secondary text-white hover:bg-green-600',
    accent: 'bg-accent text-gray-800 hover:bg-yellow-500',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button;