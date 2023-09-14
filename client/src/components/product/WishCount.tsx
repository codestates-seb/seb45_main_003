import { useState } from "react";
import { useMutation } from "react-query";
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
  const [modalMessage, setModalMessage] = useState({ title: "", description: "" });
  const [loginMembersWish, setLoginMembersWish] = useState(data.loginMembersWish || false);
  const [wishCount, setwishCount] = useState(data.wishCount || 0);

  const { mutate, error } = useMutation(async (id: number) => {
    loginMembersWish
      ? await authInstance.delete(API_PATHS.wishes.default(id))
      : await authInstance.post(API_PATHS.wishes.add, { productId: id });
  });

  const addWishlist = async (id: number) => {
    mutate(id);
    setwishCount((prev) => prev + 1);
    setLoginMembersWish(true);

    setIsOpen(true);

    if (!error) {
      setModalMessage({ title: "찜하기 성공", description: SUCCESS.addWishlist });
    } else {
      setModalMessage({ title: "찜하기 실패", description: FAIL.addWishlist });
    }
  };

  const removeWishlist = async (id: number) => {
    mutate(id);
    setwishCount((prev) => prev - 1);
    setLoginMembersWish(false);

    setIsOpen(true);

    if (!error) {
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
          <span>{wishCount}</span>
        </div>
      </div>
      {isLogin && Number(userid) !== data.memberId && (
        <Button
          $icon={<HeartIcon />}
          $text={loginMembersWish ? "찜 삭제" : "찜"}
          $design="yellow"
          type="button"
          onClick={() => {
            loginMembersWish ? removeWishlist(data.productId) : addWishlist(data.productId);
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
