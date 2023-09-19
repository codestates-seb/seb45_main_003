import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = (event: React.MouseEvent<HTMLElement>, callback: (() => void) | undefined) => {
    if (event.target === event.currentTarget) setIsOpen(false);
    if (callback) {
      callback();
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    setIsOpen,
    closeModal,
    toggleModal,
  };
};
