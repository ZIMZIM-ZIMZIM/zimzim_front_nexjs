import Image from 'next/image';
import React, { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from '#/components/common/Button';

interface ModalProps {
  closeModal: () => void;
  children: ReactNode;
}

const Modal = ({ closeModal, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal relative bg-white p-6 rounded-md shadow-lg w-1/3"
        ref={modalRef}
      >
        <Button
          onClick={closeModal}
          className="absolute top-2 right-2 text-white px-2 py-1 rounded-md"
          aria-label="close modal"
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
