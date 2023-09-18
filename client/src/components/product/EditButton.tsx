import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as EditIcon } from "../../assets/images/Edit.svg";
import { FAIL } from "../../constants/systemMessage";
import { useModal } from "../../hooks/useModal";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { ProductData } from "../productList/List";

type EditButtonProps = {
  data: ProductData;
};

const EditButton = ({ data }: EditButtonProps) => {
  const [modalMessage, setModalMessage] = useState({ title: "", description: "" });
  const { isOpen, setIsOpen, closeModal, toggleModal } = useModal();
  const MODAL_TITLE = "상품 수정 불가";

  //거래 상태에 따른 상품 수정 페이지 이동 막기
  const pauseRedirect = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!data.auction) {
      return;
    }

    if (!data.buyerId) {
      return;
    }

    event.preventDefault();
    setIsOpen(true);

    switch (data.productStatus) {
      case "BEFORE":
        setModalMessage({
          title: MODAL_TITLE,
          description: FAIL.edit.before,
        });

        break;
      case "TRADE":
        setModalMessage({
          title: MODAL_TITLE,
          description: FAIL.edit.trade,
        });
        break;
      case "AFTER":
        setModalMessage({
          title: MODAL_TITLE,
          description: FAIL.edit.after,
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Link
        onClick={pauseRedirect}
        to={{ pathname: "/write" }}
        state={{ isUpdateMode: true, updateModeData: data }}
      >
        <EditIcon />
      </Link>
      <Modal {...{ isOpen, closeModal, toggleModal }}>
        <>
          <h4>{modalMessage.title}</h4>
          <p>{modalMessage.description}</p>
          <Button
            $design="black"
            $text="확인"
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </>
      </Modal>
    </>
  );
};

export default EditButton;
