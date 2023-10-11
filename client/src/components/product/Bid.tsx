import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Client } from "webstomp-client";
import { AUCTION, MAX, MIN, REQUIRED } from "../../constants/systemMessage";
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

  const sendWebSocketMessage = async (bidData: FieldValues) => {
    if (stompClient) {
      stompClient.send(`/app/bid/${data.productId}`, JSON.stringify(bidData));
      setIsOpen(false);
    }
  };
  const { mutate } = useMutation(sendWebSocketMessage);

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
    confirmSubmit();
  };

  const confirmSubmit = () => {
    reset();
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
              <Button $design="black" $text="입찰" type="button" onClick={handleSubmit(onSubmit)} />
            </>
          )}
        </>
      </Modal>
    </>
  );
};

export default Bid;
