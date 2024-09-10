import Image from 'next/image';
import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from '#/components/common/Button';

import useBox from '#/hooks/useBox';

interface ModalProps {
  closeModal: () => void;
  children: ReactNode;
}

const Modal = ({ closeModal, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { handleClcikWithoutBox, handleEscape } = useBox(closeModal, 'modal');

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClcikWithoutBox);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClcikWithoutBox);
    };
  }, [handleClcikWithoutBox]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="modal relative bg-white p-6 rounded-md shadow-lg w-1/3"
        ref={modalRef}
      >
        <Button
          onClick={closeModal}
          className="absolute top-2 right-2 text-white px-2 py-1 rounded-md"
        >
          <Image
            src="/icon/delete.svg"
            alt="delete icon"
            width={16}
            height={16}
          />
        </Button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
