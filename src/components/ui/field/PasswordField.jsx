import React from 'react'

export const PasswordField = ({ name, value, onChange, errors }) => {
  return (
    <li className='p-3 mt-2'>
      <input
        type="password"
        name={name}
        value={value}
        onChange={onChange}
        placeholder='パスワード（英数字9文字以上）'
        autoComplete="new-password"
        className='p-2 border border-gray-600 rounded-lg w-90 bg-black text-white placeholder-gray-400'
      />
      {errors && (
        <p className="text-red-500 text-left text-sm mt-1 px-5">{errors}</p>
      )}
    </li>
  )
}

