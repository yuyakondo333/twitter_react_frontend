import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal/Modal'
import { useNavigate, useLocation } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isRegisterRoute = location.pathname === '/register';
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  useEffect(() => {
    if (open && !isRegisterRoute) {
      navigate("/register");
    } else if (!open && isRegisterRoute) {
      navigate("/login");
    }
  }, [open, isRegisterRoute, navigate]);

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <div className='container px-4 sm:px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 lg:h-screen items-center mt-8 lg:mt-0'>
        <div className='lg:text-center'>
          <FontAwesomeIcon
            icon={faXTwitter}
            className="text-[45px] lg:text-[300px]"
          />
        </div>
        <div className=''>
          <h1 className='text-6xl font-bold text-balance my-12'>すべての話題が、ここに。</h1>
          <p className='text-3xl font-bold mb-8'>今すぐ参加しましょう。</p>
          <Button onClick={handleOpen} children='アカウント作成' />
        </div>
      </div>
      <Modal isOpen={open} onClose={handleClose}/>
    </>
  )
}
