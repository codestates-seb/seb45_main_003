import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../../assets/images/Close.svg";

interface ModalProp {
  isOpen: boolean;
  closeModal?: (event: React.MouseEvent<HTMLElement>) => void;
  toggleModal?: () => void;
  children: JSX.Element;
}

const StyledModal = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;

  section {
    position: relative;
    max-width: 37.5rem;
    background: #fff;
    padding: 1.5rem;

    .close-button {
      position: absolute;
      padding: 1rem;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
`;

const Modal = ({ isOpen, closeModal, toggleModal, children }: ModalProp): JSX.Element => {
  return (
    <>
      {isOpen && (
        <StyledModal onClick={closeModal}>
          <section className="modal">
            <div className="close-button" onClick={toggleModal}>
              <CloseIcon />
            </div>
            {children}
          </section>
        </StyledModal>
      )}
    </>
  );
};

export default Modal;
