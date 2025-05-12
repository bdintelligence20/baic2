import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

const BookTestDrivePage = () => {
  const navigate = useNavigate();
  const { openTypeformModal } = useModal();
  
  useEffect(() => {
    // Open the modal and redirect to home page
    openTypeformModal();
    navigate('/');
  }, [openTypeformModal, navigate]);
  
  // This component doesn't render anything as it redirects immediately
  return null;
};

export default BookTestDrivePage;
