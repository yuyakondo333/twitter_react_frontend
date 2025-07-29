import React, { useState } from 'react';
import { apiClient } from '../../../utils/api';
import { TextField } from '../field/TextField';
import { EmailField } from '../field/EmailField';
import { PasswordField } from '../field/PasswordField';
import { BirthdayField } from '../field/BirthdayField';
import { Button } from '../Button';

export const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
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
      await apiClient.post('/auth/register', formData)
      setIsSubmitted(true);
      onClose();
    } catch (error) {
      setErrors(error.response?.data || {});
    } finally {
      setIsLoading(false);
      setIsSubmitted(false);
    }
  };

  const isFormValid =
    formData.username.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.password_confirmation.trim() !== '' &&
    formData.password === formData.password_confirmation;

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
            <TextField
              value={formData.username}
              onChange={handleInputChange}
              errors={errors.username}
            />
            <EmailField
              value={formData.email}
              onChange={handleInputChange}
              errors={errors.email}
            />
            <PasswordField
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              errors={errors.password}
            />
            <PasswordField
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              errors={errors.password_confirmation}
            />
            <BirthdayField
              value={formData.birthday}
              onChange={handleInputChange}
              errors={errors.birthday}
            />
            <div className="flex justify-between px-7">
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !isFormValid}
                className="my-6 w-40"
                children={isLoading ? '送信中' : '新規登録'}
              />
              <Button
                onClick={onClose}
                className='bg-gray-500 my-6 w-40 hover:bg-gray-700'
                children='閉じる'
              />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

