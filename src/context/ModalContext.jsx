import React, { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext({
  activeModal: null,
  modalProps: {},
  openModal: () => {},
  closeModal: () => {}
});

export function ModalProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null); // 'booking' | 'trial' | 'video' | null
  const [modalProps, setModalProps] = useState({});

  const openModal = useCallback((modalName, props = {}) => {
    setActiveModal(modalName);
    setModalProps(props);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalProps({});
  }, []);

  return (
    <ModalContext.Provider value={{ activeModal, modalProps, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
