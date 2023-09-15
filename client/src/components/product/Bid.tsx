import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { Client } from "webstomp-client";
import { AUCTION, CONFIRM, MAX, MIN, REQUIRED, SUCCESS } from "../../constants/systemMessage";
import { useModal } from "../../hooks/useModal";
import { getUserId } from "../../util/auth";
import { allowOnlyNumber } from "../../util/number";
import Button from "../common/Button";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";
import { ProductData } from "../productList/List";

type BidProps = {
  data: ProductData;
  stompClient: Client | null;
};

const Bid = (props: BidProps) => {
  const { data, stompClient } = props;
  const [modalMessage, setModalMessage] = useState({ title: "", description: "" });
  const { isOpen, setIsOpen, closeModal, toggleModal } = useModal();
  const { register, handleSubmit, formState, reset } = useForm<FieldValues>();
  const userid = getUserId();
  const queryClient = useQueryClient();
  const location = useLocation();
  const idArr = location.pathname.split("/");
  const productId = idArr[idArr.length - 1];

  const sendWebSocketMessage = async (bidData: FieldValues) => {
    if (stompClient) {
      stompClient.send(`/app/bid/${data.productId}`, JSON.stringify(bidData));
    }
  };
  const { mutate, error } = useMutation(sendWebSocketMessage);

  const openConfirmModal = (modalMessage: { title: string; description: string }) => {
    setIsOpen(true);
    setModalMessage(modalMessage);
  };

  //데이터 전송
  const onSubmit = (data: FieldValues) => {
    const bidData = {
      memberId: Number(userid),
      currentAuctionPrice: Number(data.currentAuctionPrice),
    };

    mutate(bidData);

    if (error) {
      setModalMessage({ title: "상품 입찰 실패", description: SUCCESS.bid });
    } else {
      setModalMessage({ title: "상품 입찰 성공", description: SUCCESS.bid });

      const modifiedData = {
        ...data,
        productStatus: "TRADE",
        buyerId: Number(userid),
      };
      queryClient.setQueryData(["productData", productId], modifiedData);
      reset();
    }
  };

  //데이터 확인
  const confirmPrice = (formData: FieldValues) => {
    if (Number(formData.currentAuctionPrice) === data.immediatelyBuyPrice) {
      setModalMessage({ title: "상품 입찰 확인", description: CONFIRM.bid });
      return;
    }

    onSubmit(data);
  };

  return (
    <>
      <Button
        $text="입찰하기"
        $design="black"
        type="button"
        onClick={() => {
          openConfirmModal({ title: "상품 입찰", description: AUCTION.bid });
        }}
      />

      <Modal {...{ isOpen, closeModal, toggleModal }}>
        <>
          <h4>{modalMessage.title}</h4>
          <p>{modalMessage.description}</p>
          {modalMessage.title === "상품 입찰" && (
            <>
              <TextInput
                type="text"
                id="currentAuctionPrice"
                register={register}
                title=""
                options={{
                  required: REQUIRED.bid,
                  onChange: (event) => allowOnlyNumber(event),
                  min: {
                    value: data.minBidPrice,
                    message: MIN.bid(5),
                  },
                  max: {
                    value: data.immediatelyBuyPrice,
                    message: MAX.bid,
                  },
                }}
                defaultValue={data.minBidPrice.toString()}
                formState={formState}
              />
              <Button
                $design="black"
                $text="입찰"
                type="button"
                onClick={handleSubmit(confirmPrice)}
              />
            </>
          )}

          {modalMessage.title === "상품 입찰 확인" && (
            <div className="button">
              <Button
                $design="outline"
                $text="취소"
                type="button"
                onClick={() => setIsOpen(false)}
              />
              <Button $design="black" $text="입찰" type="button" onClick={handleSubmit(onSubmit)} />
            </div>
          )}

          {modalMessage.title !== "상품 입찰" && modalMessage.title !== "상품 입찰 확인" && (
            <div className="button">
              <Button
                $design="black"
                $text="확인"
                type="button"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            </div>
          )}
        </>
      </Modal>
    </>
  );
};

export default Bid;