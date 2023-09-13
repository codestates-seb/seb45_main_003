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

  h4 {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
  }

  section {
    display: flex;
    flex-flow: column;

    min-width: 25rem;
    min-height: 180px;
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

    .button,
    button {
      margin: auto 0 0 auto;
      display: flex;
      flex-flow: row;
      gap: 0.5rem;
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
