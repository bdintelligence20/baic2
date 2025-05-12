import React, { createContext, useState, useContext } from 'react';

// Create the context
const ModalContext = createContext();

// Create a provider component
export const ModalProvider = ({ children }) => {
  const [isTypeformModalOpen, setIsTypeformModalOpen] = useState(false);

  const openTypeformModal = () => {
    setIsTypeformModalOpen(true);
  };

  const closeTypeformModal = () => {
    setIsTypeformModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isTypeformModalOpen,
        openTypeformModal,
        closeTypeformModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Create a custom hook to use the modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
