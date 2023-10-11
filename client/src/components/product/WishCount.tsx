import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as HeartIcon } from "../../assets/images/Heart.svg";
import { API_PATHS } from "../../constants/path";
import { FAIL, SUCCESS } from "../../constants/systemMessage";
import { useModal } from "../../hooks/useModal";
import { authInstance } from "../../interceptors/interceptors";
import { getUserId } from "../../util/auth";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { ProductData } from "../productList/List";

type WishCountProps = {
  data: ProductData;
  isLogin: boolean;
};

const WishCount = (props: WishCountProps) => {
  const { data, isLogin } = props;
  const { isOpen, setIsOpen, closeModal, toggleModal } = useModal();
  const userid = getUserId();
  const queryClient = useQueryClient();
  const [modalMessage, setModalMessage] = useState({ title: "", description: "" });
  const submitData = async (id: number) => {
    data.loginMembersWish
      ? await authInstance.delete(API_PATHS.wishes.default(id))
      : await authInstance.post(API_PATHS.wishes.add, { productId: id });
  };
  const { mutate, error } = useMutation(submitData);
  const location = useLocation();

  const addWishlist = async (id: number) => {
    mutate(id);

    setIsOpen(true);

    if (!error) {
      if (typeof data !== "undefined" && typeof data.wishCount !== "undefined") {
        const modifiedData = {
          ...data,
          loginMembersWish: true,
          wishCount: data.wishCount + 1,
        };
        queryClient.setQueryData(["productData", location], modifiedData);
      }

      setModalMessage({ title: "찜하기 성공", description: SUCCESS.addWishlist });
    } else {
      setModalMessage({ title: "찜하기 실패", description: FAIL.addWishlist });
    }
  };

  const removeWishlist = async (id: number) => {
    mutate(id);
    setIsOpen(true);

    if (!error) {
      if (typeof data !== "undefined" && typeof data.wishCount !== "undefined") {
        const modifiedData = {
          ...data,
          loginMembersWish: false,
          wishCount: data.wishCount - 1,
        };
        queryClient.setQueryData(["productData", location], modifiedData);
      }

      setModalMessage({ title: "찜 삭제 성공", description: SUCCESS.removeWishlist });
    } else {
      setModalMessage({ title: "찜 삭제 실패", description: FAIL.removeWishlist });
    }
  };

  return (
    <>
      <div className="wishlist_box">
        <div className="gray icon_box">
          <HeartIcon />
          <span>{data.wishCount}</span>
        </div>
      </div>
      {isLogin && Number(userid) !== data.memberId && (
        <Button
          $icon={<HeartIcon />}
          $text={data.loginMembersWish ? "찜 삭제" : "찜"}
          $design="yellow"
          type="button"
          onClick={() => {
            data.loginMembersWish ? removeWishlist(data.productId) : addWishlist(data.productId);
          }}
        />
      )}
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

export default WishCount;
