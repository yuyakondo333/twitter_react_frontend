import React from 'react'

export const Button = ({ onClick, children, ...props }) => {
  return (
    <button onClick={onClick} {...props} className="rounded-full bg-blue-500 px-6 py-2 cursor-pointer">
      {children || "アカウント作成"}
    </button>
  );
};
