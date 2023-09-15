import { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { loginState } from "../../atoms/atoms";
import { API_PATHS } from "../../constants/path";
import { CONFIRM, FAIL, SUCCESS } from "../../constants/systemMessage";
import { useModal } from "../../hooks/useModal";
import { authInstance } from "../../interceptors/interceptors";
import { getUserId } from "../../util/auth";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { ProductData } from "./List";

type BuyNowProps = {
  data: ProductData;
};

const BuyNow = ({ data }: BuyNowProps) => {
  const { isOpen, setIsOpen, closeModal, toggleModal } = useModal();
  const { mutate, error } = useMutation(async (id: number) => {
    await authInstance.post(API_PATHS.products.buyItNow(id));
  });
  const isLogin = useRecoilValue(loginState);
  const userid = getUserId();
  const [modalMessage, setModalMessage] = useState({ title: "", description: "" });
  const openConfirmModal = (modalMessage: { title: string; description: string }) => {
    setIsOpen(true);
    setModalMessage(modalMessage);
  };

  const handleBuyNow = async (id: number) => {
    mutate(id);

    if (!error) {
      setModalMessage({ title: "즉시 구매 성공", description: SUCCESS.buyItNow });
    } else {
      setModalMessage({ title: "즉시 구매 실패", description: FAIL.buyItNow });
    }
  };

  return (
    <>
      <div className="buy_it_now_price">
        <div className="price">
          <span className="price_number_title gray">즉시 구매가</span>
          <span className="price_number">{data.immediatelyBuyPrice.toLocaleString() + "원"}</span>
        </div>
        {isLogin && Number(userid) !== data.memberId && data.productStatus === "BEFORE" && (
          <Button
            $text="즉시구매"
            $design="black"
            type="button"
            onClick={() => {
              openConfirmModal({ title: "즉시 구매", description: CONFIRM.buyItNow });
            }}
          />
        )}
      </div>

      <Modal {...{ isOpen, closeModal, toggleModal }}>
        <>
          <h4>{modalMessage.title}</h4>
          <p>{modalMessage.description}</p>
          {modalMessage.title === "즉시 구매" && (
            <div className="button">
              <Button
                $design="outline"
                $text="취소"
                type="button"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
              <Button
                $design="black"
                $text="확인"
                type="button"
                onClick={() => {
                  handleBuyNow(data.productId);
                }}
              />
            </div>
          )}
          {modalMessage.title !== "즉시 구매" && (
            <Button
              $design="black"
              $text="확인"
              type="button"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          )}
        </>
      </Modal>
    </>
  );
};

export default BuyNow;
