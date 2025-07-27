import React, { useState } from 'react';
import axios from 'axios';

export const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
    birthday: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitted || isLoading) return;
    setIsLoading(true);
    setErrors({});

    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/register', formData);
      setIsSubmitted(true);
      onClose();
    } catch (error) {
      setErrors(error.response?.data || {});
    } finally {
      setIsLoading(false);
      setIsSubmitted(false);

      setTimeout(() => {
      }, 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-90">
      <div className="relative p-4 w-full max-w-md">
        <div className="relative text-center rounded-lg bg-black">
          <h2 className='text-3xl p-3 mt-2 font-bold'>アカウント作成</h2>
          {errors.non_field_errors && (
            <div className="px-3 mb-2">
              {errors.non_field_errors.map((error, index) => (
                <p key={index} className="text-red-500 text-sm">{error}</p>
              ))}
            </div>
          )}
          <ul>
            <li className='p-3 mt-2'>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder='名前'
                className='p-2 border border-gray-600 rounded-lg w-90 bg-black text-white placeholder-gray-400 autofill:bg-black autofill:text-white'
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username[0]}</p>
              )}
            </li>
            <li className='p-3 mt-2'>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder='メール'
                className='p-2 border border-gray-600 rounded-lg w-90 bg-black text-white placeholder-gray-400 autofill:bg-black autofill:text-white'
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
              )}
            </li>
            <li className='p-3 mt-2'>
              <input
                type='password'
                name="password1"
                value={formData.password1}
                onChange={handleInputChange}
                placeholder='パスワード（英数字9文字以上）'
                autoComplete="new-password"
                className='p-2 border border-gray-600 rounded-lg w-90 bg-black text-white placeholder-gray-400'
              />
              {errors.password1 && (
                <p className="text-red-500 text-sm mt-1">{errors.password1[0]}</p>
              )}
            </li>
            <li className='p-3 mt-2'>
              <input
                type='password'
                name="password2"
                value={formData.password2}
                onChange={handleInputChange}
                placeholder='パスワード（確認用）'
                autoComplete="new-password"
                className='p-2 border border-gray-600 rounded-lg w-90 bg-black text-white placeholder-gray-400'
              />
              {errors.password2 && (
                <p className="text-red-500 text-sm mt-1">{errors.password2[0]}</p>
              )}
            </li>
            <li className='p-3 mt-2'>
              <label htmlFor="birthday" className='block p-4 font-bold text-left'>生年月日（任意）</label>
              <input
                type="date"
                name="birthday"
                id="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                className='p-2 border border-gray-600 rounded-lg w-90 bg-black text-white placeholder-gray-400'
              />
              {errors.birthday && (
                <p className="text-red-500 text-sm mt-1">{errors.birthday[0]}</p>
              )}
            </li>
            <div className="flex justify-between px-7">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className='rounded-full my-6 px-6 py-2 bg-blue-500 w-40 cursor-pointer'
              >
                Debug: {isLoading ? '送信中...' : '新規登録'} (Loading: {isLoading.toString()})
              </button>
              <button
                onClick={onClose}
                className='rounded-full my-6 px-6 py-2 bg-gray-500 w-40 cursor-pointer'
              >
                閉じる
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

