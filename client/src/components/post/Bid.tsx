import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Client } from "webstomp-client";
import { AUCTION, MIN, REQUIRED, SUCCESS } from "../../constants/systemMessage";
import { useModal } from "../../hooks/useModal";
import { getUserId } from "../../util/auth";
import { allowOnlyNumber } from "../../util/number";
import Button from "../common/Button";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";
import { ProductData } from "./List";

type BidProps = {
  data: ProductData;
  stompClient: Client | null;
  currentAuctionPrice: number;
  setCurrentAuctionPrice: React.Dispatch<React.SetStateAction<number>>;
};

const Bid = (props: BidProps) => {
  const { data, stompClient, currentAuctionPrice, setCurrentAuctionPrice } = props;
  const [modalMessage, setModalMessage] = useState({ title: "", description: "" });
  const [minValue, setMinValue] = useState(currentAuctionPrice);
  const { isOpen, setIsOpen, closeModal, toggleModal } = useModal();
  const { register, handleSubmit, formState, reset } = useForm<FieldValues>();
  const userid = getUserId();

  const sendWebSocketMessage = async (bidData: FieldValues) => {
    if (stompClient) {
      stompClient.send(`/app/bid/${data.productId}`, JSON.stringify(bidData));
    }
    return data;
  };
  const { mutate, error } = useMutation(sendWebSocketMessage);

  //최소가 변경
  useEffect(() => {
    setMinValue(currentAuctionPrice + Math.ceil((currentAuctionPrice * 0.05) / 10) * 10);
  }, [currentAuctionPrice]);

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
      setCurrentAuctionPrice(bidData.currentAuctionPrice);
      setModalMessage({ title: "상품 입찰 성공", description: SUCCESS.bid });
      reset();
    }
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
                    value: minValue,
                    message: MIN.bid(5),
                  },
                }}
                defaultValue={minValue.toString()}
                formState={formState}
              />
              <Button $design="black" $text="입찰" type="button" onClick={handleSubmit(onSubmit)} />
            </>
          )}

          {modalMessage.title !== "상품 입찰" && (
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
