import React, { createContext, useContext, useState } from 'react';

interface Modal {
  id: string;
  component: JSX.Element;
  props?: Record<string, string>;
}

interface ModalContextProps {
  modals: Modal[];
  createModal: (modal: Modal) => void;
  deleteModal: (id: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const createModal = (modal: Modal) => {
    setModals((prev) => [...prev, modal]);
  };

  const deleteModal = (id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  };

  return (
    <ModalContext.Provider value={{ modals, createModal, deleteModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
