import React from 'react';

export const Button = ({ 
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
  ...props
}) => {
  const baseClass = `rounded-full px-4 py-2 cursor-pointer text-white
    ${disabled ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}
  `;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${baseClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
