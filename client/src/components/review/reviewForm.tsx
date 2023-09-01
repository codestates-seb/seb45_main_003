import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useModal } from "../../hooks/useModal";
import Button from "../common/Button";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";

const StyledUploadForm = styled.section`
  padding: 2.5rem 0 4rem;
  gap: 1rem;
`;

const UploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const { isOpen, setIsOpen, closeModal, toggleModal } = useModal();
  const [submitResult, setSubmitResult] = useState(false);
  const navigate = useNavigate();
  const mutation = useMutation((data: FieldValues) => axios.post("/api/test", data, {}));

  const onSubmit = async (data: FieldValues) => {
    //이미지를 같이 전송하기 위해 formData로 변환

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
        <h1>후기 등록하기</h1>

        <section>
          <div className="description">
            <img src="" alt="" />
            <div>
              <h3>후기 대상자 이름</h3>
              <p>판매한 제품</p>
            </div>
          </div>

          <TextInput
            register={register}
            options={{
              required: "제목은 필수입니다.",
            }}
            title="제목"
            id="title"
            errors={errors}
          />

          <TextInput
            register={register}
            options={{
              required: "후기 내용은 필수입니다.",
            }}
            title="후기 내용"
            id="content"
            errors={errors}
          />
        </section>

        <Button text="후기 등록" type="submit" onClick={handleSubmit(onSubmit)} />
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
