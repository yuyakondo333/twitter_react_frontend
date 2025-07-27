import React, { useState } from 'react';
import axios from 'axios';
import { TextField } from '../field/TextField';
import { EmailField } from '../field/EmailField';
import { PasswordField } from '../field/PasswordField';
import { BirthdayField } from '../field/BirthdayField';

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
      await axios.post('http://localhost:8000/api/v1/auth/register', formData);
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

  const isFormValid =
    formData.username.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.password1.trim() !== '' &&
    formData.password2.trim() !== '' &&
    formData.password1 === formData.password2;

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
            <TextField value={formData.username} onChange={handleInputChange} errors={errors.username}/>
            <EmailField value={formData.email} onChange={handleInputChange} errors={errors.email}/>
            <PasswordField
              name="password1"
              value={formData.password1}
              onChange={handleInputChange}
              errors={errors.password1}
            />
            <PasswordField
              name="password2"
              value={formData.password2}
              onChange={handleInputChange}
              errors={errors.password2}
            />
            <BirthdayField value={formData.birthday} onChange={handleInputChange} errors={errors.birthday}/>
            <div className="flex justify-between px-7">
              <button
                onClick={handleSubmit}
                disabled={isLoading || !isFormValid}
                className='rounded-full my-6 px-6 py-2 bg-blue-500 w-40 cursor-pointer
                            disabled:bg-blue-300 disabled:text-white/70 disabled:cursor-not-allowed'
              >
                {isLoading ? '送信中' : '新規登録'}
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

