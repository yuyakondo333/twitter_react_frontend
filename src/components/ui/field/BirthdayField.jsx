import React from 'react'

export const BirthdayField = ({ value, onChange, errors }) => {
  return (
    <li className='p-3 mt-2'>
      <label htmlFor="birthday" className='block p-4 font-bold text-left'>生年月日（任意）</label>
      <input
        type="date"
        name="birthday"
        id="birthday"
        value={value}
        onChange={onChange}
        className='p-2 border border-gray-600 rounded-lg w-90 bg-black text-white placeholder-gray-400'
      />
      {errors && (
        <p className="text-red-500 text-left text-sm mt-1 px-5">{errors}</p>
      )}
    </li>
  )
}

