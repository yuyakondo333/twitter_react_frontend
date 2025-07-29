import React from 'react'

export const EmailField = ({ value, onChange, errors }) => {
  return (
    <li className='p-3 mt-2'>
      <input
        type="email"
        name="email"
        value={value}
        onChange={onChange}
        placeholder='メール'
        className='p-2 border border-gray-600 rounded-lg w-90 bg-black text-white placeholder-gray-400 autofill:bg-black autofill:text-white'
      />
      {errors && (
        <p className="text-red-500 text-left text-sm mt-1 px-5">{errors}</p>
      )}
    </li>
  )
}

