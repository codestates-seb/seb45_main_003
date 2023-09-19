import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../../atoms/atoms";
import { API_PATHS } from "../../constants/path";
import { CONFIRM, SUCCESS } from "../../constants/systemMessage";
import { useModal } from "../../hooks/useModal";
import { authInstance } from "../../interceptors/interceptors";
import { getUserId } from "../../util/auth";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { ProductData } from "../productList/List";

type BuyNowProps = {
  data: ProductData;
};

const BuyNow = ({ data }: BuyNowProps) => {
  const { isOpen, setIsOpen, closeModal, toggleModal } = useModal();

  const postData = async (id: number) => {
    await authInstance.post(API_PATHS.products.buyItNow(id));
  };

  const { mutate } = useMutation(postData, {
    onSuccess: () => {
      setModalMessage({ title: "즉시 구매 성공", description: SUCCESS.buyItNow });

      const modifiedData = {
        ...data,
        productStatus: "TRADE",
        buyerId: Number(userid),
      };
      queryClient.setQueryData(["productData", location], modifiedData);
    },

    onError: (error) => {
      const axiosError = error as AxiosError;
      setModalMessage({
        title: "즉시 구매 실패",
        description: String(axiosError.response?.data),
      });
    },
  });
  const isLogin = useRecoilValue(loginState);
  const userid = getUserId();
  const queryClient = useQueryClient();
  const [modalMessage, setModalMessage] = useState({ title: "", description: "" });
  const openConfirmModal = (modalMessage: { title: string; description: string }) => {
    setIsOpen(true);
    setModalMessage(modalMessage);
  };
  const location = useLocation();

  const handleBuyNow = async (id: number) => {
    mutate(id);
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
