// import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
// import { API_PATHS } from "../../constants/path";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import { FAIL, REQUIRED, SUCCESS } from "../../constants/systemMessage";
import { useModal } from "../../hooks/useModal";
import { authInstance, defaultInstance } from "../../interceptors/interceptors";
import Button from "../common/Button";
import Modal from "../common/Modal";
import SelectInput from "../common/SelectInput";
import TextArea from "../common/TextArea";
import TextInput from "../common/TextInput";

interface image {
  imageId: number;
  path: string;
}

interface productInfoForReview {
  title: string;
  images: image[];
  auction: boolean;
  closedAt: string;
  immediatelyBuyPrice: number;
  currentAuctionPrice: number;
}

interface partner {
  name: string;
  picture: image;
}

const StyledUploadForm = styled.section`
  padding: 2.5rem 8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
  .pageTitle {
    font-size: ${FONT_SIZE.font_32};
    color: ${COLOR.darkText};
    font-weight: bold;
  }
  .reviewFormContent {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid ${COLOR.border};
    .formInfo {
      background-color: ${COLOR.gray_100};
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      .infoTitle {
        font-size: ${FONT_SIZE.font_24};
        color: ${COLOR.darkText};
        font-weight: bold;
      }
      .infoSummary {
        color: ${COLOR.mediumText};
      }
    }
    .description {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 2rem;
      padding: 1rem;
      .productImg {
        width: 150px;
        height: 150px;
      }
      .reviewInfo {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .productTitle {
          font-size: ${FONT_SIZE.font_24};
          color: ${COLOR.darkText};
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
    .field {
      padding: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 2rem;
      .input {
        min-width: calc(100% - 5.75rem);
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
        &.inline {
          min-width: 15rem;
        }
      }
      .textarea {
        width: calc(100% - 5.75rem);
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
      }
    }
    .error {
      border: 1px solid ${COLOR.invalid};
    }
    .error_message {
      color: ${COLOR.invalid};
    }
  }
  .submitReviewButtonContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 1rem;
    border: 1px solid ${COLOR.border};
  }
`;
const REPUTATION = {
  "1": {
    id: 1,
    value: "1",
    path: "",
  },
  "2": {
    id: 2,
    value: "2",
    path: "",
  },
  "3": {
    id: 3,
    value: "3",
    path: "",
  },
  "4": {
    id: 4,
    value: "4",
    path: "",
  },
  "5": {
    id: 5,
    value: "5",
    path: "",
  },
};

const ReviewForm = () => {
  const { register, handleSubmit, formState, control } = useForm<FieldValues>();
  const { isOpen, setIsOpen, closeModal, toggleModal } = useModal();
  const [submitResult, setSubmitResult] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const loginUserId = localStorage.getItem("Id");
  const productId = new URLSearchParams(location.search).get("productId");
  const reviewId = new URLSearchParams(location.search).get("reviewId");
  const getProductInfo = useQuery<productInfoForReview>(["productInfo"], async () => {
    const res = await defaultInstance.get(`/products/${productId}`);
    return res.data;
  });
  const productInfo = getProductInfo.data;

  const getPartnerInfo = useQuery<partner>(["partnerinfo"], async () => {
    const res = await authInstance.get(`/reviews/products/${productId}`);
    return res.data;
  });
  const partnerInfo = getPartnerInfo.data;

  const mutation = useMutation(
    (data: FieldValues) =>
      authInstance.post(`/reviews`, {
        productId: productId,
        title: data.title,
        content: data.content,
        score: Number(data.reputation),
      }),
    {
      onSuccess: () => navigate(`/member/${loginUserId}?menu=profile&tabmenu=leaveReview&page=1`),
    },
  );
  const modifyMutation = useMutation(
    (data: FieldValues) =>
      authInstance.patch(`/reviews/${reviewId}`, {
        title: data.title,
        content: data.content,
        score: Number(data.reputation),
      }),
    {
      onSuccess: () => navigate(-1),
    },
  );

  const onSubmit = async (data: FieldValues) => {
    try {
      if (reviewId) {
        await modifyMutation.mutateAsync(data);
      } else {
        await mutation.mutateAsync(data);
      }
      setSubmitResult(true);
    } catch (error) {
      setSubmitResult(false);
    } finally {
      //상품 등록을 누르면 작업 결과를 알려주는 모달 출현
      setIsOpen(true);
    }
  };
  const navigateProduct = () => {
    navigate(`/product/${productId}`);
  };
  const getReview = useQuery(["originalReview"], async () => {
    const res = await authInstance.get(`/reviews/${reviewId}`);
    return res.data;
  });
  const reviewInfo = getReview.data;

  return (
    <>
      <StyledUploadForm>
        <p className="pageTitle">후기 {reviewId ? "수정하기" : "등록하기"}</p>

        <section className="reviewFormContent">
          <div className="formInfo">
            <p className="infoTitle">거래 정보</p>
            <p className="infoSummary">거래 상품과 상대방에 대한 정보입니다.</p>
          </div>
          <div className="description">
            <img src={productInfo?.images[0].path} className="productImg" alt="product image" />
            <div className="reviewInfo">
              <p
                className="productTitle"
                onClick={() => navigateProduct()}
              >{`거래 상품: ${productInfo?.title}`}</p>
              <p className="partnerName">{`거래 상대: ${partnerInfo?.name}`}</p>
            </div>
          </div>
          <div className="formInfo">
            <p className="infoTitle">리뷰 작성 폼</p>
            <p className="infoSummary">리뷰 작성에 필수적인 정보입니다.</p>
          </div>
          <TextInput
            register={register}
            options={{
              required: REQUIRED.title,
            }}
            title="후기 제목"
            id="title"
            formState={formState}
            defaultValue={reviewInfo ? reviewInfo.reviewTitle : ""}
          />

          <TextArea
            register={register}
            options={{
              required: REQUIRED.review,
            }}
            title="후기 내용"
            id="content"
            formState={formState}
            defaultValue={reviewInfo ? reviewInfo.content : ""}
          />
          <Controller
            name="reputation"
            control={control}
            defaultValue={reviewInfo ? reviewInfo.score.toString() : ""}
            rules={{ required: REQUIRED.reputation }}
            render={({ field }) => (
              <SelectInput
                title="평점"
                id="reputation"
                field={field}
                selectoptions={REPUTATION}
                formState={formState}
              />
            )}
          />
          <div className="submitReviewButtonContainer">
            <Button
              $text={reviewId ? "후기 수정" : "후기 작성"}
              type="submit"
              $design="black"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </section>
      </StyledUploadForm>

      <Modal {...{ isOpen, setIsOpen, closeModal, toggleModal }}>
        <>
          {submitResult ? (
            <>
              <h4>등록 성공</h4>
              <p>{SUCCESS.post}</p>
            </>
          ) : (
            <>
              <h4>등록 실패</h4>
              <p>{FAIL.review}</p>
            </>
          )}
          <Button
            $size="big"
            $design="black"
            $text="확인"
            type="button"
            onClick={() => {
              submitResult ? navigate("/product") : setIsOpen(!isOpen);
            }}
          />
        </>
      </Modal>
    </>
  );
};

export default ReviewForm;
