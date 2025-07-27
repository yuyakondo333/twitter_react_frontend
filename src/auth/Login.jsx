import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal/Modal'

export const Login = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 lg:h-screen items-center'>
        <div className='text-center'>
          <FontAwesomeIcon icon={faXTwitter} className='text-9xl'/>
        </div>
        <div className=''>
          <h1 className='text-6xl font-bold text-balance'>すべての話題が、ここに。</h1>
          <p className='text-3xl font-bold'>今すぐ参加しましょう。</p>
          <Button onClick={() => setOpen(true)} />
        </div>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}/>
    </>
  )
}
