import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useModal } from "../../hooks/useModal";
import Button from "../common/Button";
import ImageInput from "../common/ImageInput";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";

const StyledUploadForm = styled.section`
  padding: 2.5rem 0 4rem;
  gap: 1rem;

  label[for="images"] {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    max-width: 9.375rem;
    width: 100%;
    aspect-ratio: 1/1;
    background: #f7f7f7;
  }

  input[type="file"] {
    display: none;
  }

  .image-input {
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 1rem;
  }

  .image-preview {
    max-width: 9.375rem;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
`;

const UploadForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FieldValues>();

  const { isOpen, setIsOpen, closeModal, toggleModal } = useModal();
  const { images, handleChange } = useImageUpload({ setError, clearErrors });
  const [isAuction, setIsAuction] = useState(true);
  const [submitResult, setSubmitResult] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation((data: FieldValues) =>
    axios.post("https://2ee0-110-15-44-64.ngrok-free.app/products", data, {}),
  );

  const onSubmit = async (data: FieldValues) => {
    // const excludeEmptyData = pickBy(data, (el) => el.length > 0);

    try {
      await mutation.mutateAsync(data);
      setSubmitResult(true);
    } catch (error) {
      setSubmitResult(false);
    } finally {
      //상품 등록을 누르면 작업 결과를 알려주는 모달 출현
      setIsOpen(true);
    }
  };

  return (
    <>
      <StyledUploadForm>
        <h1>상품 등록하기</h1>

        <section className="basic_information">
          <div className="description">
            <h3>기본 정보</h3>
            <p>상품의 필수적인 정보입니다.</p>
          </div>
          <ImageInput
            register={register}
            options={{
              required: "이미지 등록은 필수입니다.",
            }}
            images={images}
            handleChange={handleChange}
            errors={errors}
          />

          <TextInput
            register={register}
            options={{
              required: "제목은 필수입니다.",
            }}
            title="제목"
            id="title"
            type="text"
            errors={errors}
          />
        </section>

        <section className="sales_method">
          <div className="description">
            <h3>판매 설정</h3>
            <p>경매 진행 여부를 선택할 수 있습니다.</p>
          </div>

          <div>
            <h4>판매 방식</h4>
            <input
              type="radio"
              name="sales_method"
              id="auction"
              onClick={() => {
                setIsAuction(true);
              }}
              defaultChecked={true}
            />
            <label htmlFor="auction">경매</label>
            <input
              type="radio"
              name="sales_method"
              id="buy_it_now"
              onClick={() => {
                setIsAuction(false);
              }}
            />
            <label htmlFor="buy_it_now">즉시 구매</label>
          </div>

          {isAuction && (
            <TextInput
              register={register}
              options={{
                required: "경매 시작가는 필수입니다.",
              }}
              title="경매시작가"
              id="startingPrice"
              type="number"
              errors={errors}
            />
          )}

          <TextInput
            register={register}
            options={{
              required: "즉시 구매가는 필수입니다.",
            }}
            title="즉시구매가"
            id="buyItNowprice"
            type="number"
            errors={errors}
          />

          {isAuction && (
            <div>
              <h4>경매 종료 시간</h4>
              <input
                {...register("closingDate", {
                  required: "경매 종료 날짜는 필수입니다",
                })}
                type="date"
              />
              <input
                {...register("closingTime", {
                  required: "경매 종료 시간은 필수입니다",
                })}
                type="time"
              />
              {errors.closingDate?.message && <p>{errors.closingDate.message.toString()}</p>}
              {errors.closingTime?.message && <p>{errors.closingTime.message.toString()}</p>}
            </div>
          )}
        </section>

        <section>
          <div className="description">
            <h3>상세 정보</h3>
            <p>상품 상태 등 구매에 도움이 되는 정보를 입력합니다.</p>
          </div>

          <TextInput
            register={register}
            options={{
              required: "상품 설명은 필수입니다.",
            }}
            title="상품 설명"
            id="content"
            errors={errors}
          />
        </section>

        <Button text="상품 등록" type="submit" onClick={handleSubmit(onSubmit)} />
      </StyledUploadForm>

      <Modal {...{ isOpen, setIsOpen, closeModal, toggleModal }}>
        <>
          {submitResult ? (
            <>
              <h4>등록 성공</h4>
              <p>상품 등록에 성공하였습니다.</p>
            </>
          ) : (
            <>
              <h4>등록 실패</h4>
              <p>상품 등록에 실패하였습니다.</p>
            </>
          )}
          <Button
            text="확인"
            type="button"
            onClick={() => {
              submitResult ? navigate("/product") : null;
            }}
          />
        </>
      </Modal>
    </>
  );
};

export default UploadForm;
