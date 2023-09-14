import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../../assets/images/Close.svg";
import { COLOR } from "../../constants/color";

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

    .input {
      position: relative;
      margin: 1rem 0;

      input[type="text"] {
        width: 100%;
        padding: 0.5rem 2.25rem 0.5rem 0.75rem;

        & + span {
          position: absolute;
          top: 0.5rem;
          right: 0.75rem;
        }
      }
      .error_message {
        margin: 0.5rem 0 0;
        color: ${COLOR.invalid};
      }
    }
  }
`;

const Modal = ({ isOpen, closeModal, toggleModal, children }: ModalProp): JSX.Element => {
  return (
    <>
      {isOpen && (
        <StyledModal onMouseDown={closeModal}>
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
