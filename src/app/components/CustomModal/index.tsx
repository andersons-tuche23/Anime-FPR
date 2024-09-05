import React, { useState, useEffect } from "react";
import { ModalBackground,  CloseButton, ModalContent } from "./styles";

type ModalProps = {
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function CustomModal({ showModal, onClose, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(showModal);

  useEffect(() => {
    setIsOpen(showModal);
  }, [showModal]);

  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalBackground onClick={handleBackgroundClick}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalContent>{children}</ModalContent>
    </ModalBackground>
  );
}
