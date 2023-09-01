import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { styled } from "styled-components";
import { useImageUpload } from "../../hooks/useImageUpload";
import Button from "../common/Button";
import ImageInput from "../common/ImageInput";
import TextInput from "../common/TextInput";

const StyledUploadForm = styled.section`
  padding: 2.5rem 0 4rem;
  gap: 1rem;

  label[for="image"] {
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

  const { images, handleChange } = useImageUpload({ setError, clearErrors });
  const [isAuction, setIsAuction] = useState(true);
  console.log(setIsAuction);

  const onSubmit = (data: FieldValues) => {
    //배열 상태로 관리된 이미지들을 다시 FileList에 추가
    const fileList = new DataTransfer();
    for (const image of images) {
      fileList.items.add(image);
    }
    data.image = fileList.files;
    console.log(data);

    //post 전송 구현 예정입니다.
  };

  return (
    <StyledUploadForm>
      <h1>상품 등록하기</h1>

      <section className="basic-information">
        <h3>기본 정보</h3>
        <p>상품의 필수적인 정보입니다.</p>

        <ImageInput
          register={register}
          images={images}
          handleChange={handleChange}
          errors={errors}
        />

        <TextInput register={register} title="제목" id="title" type="text" />
      </section>

      <section className="sales-method">
        {isAuction && (
          <TextInput register={register} title="경매시작가" id="startingPrice" type="number" />
        )}

        <TextInput register={register} title="즉시구매가" id="buyItNowprice" type="number" />

        {isAuction && (
          <div>
            <h4>경매 종료 시간</h4>
            <input {...register("closingDate")} type="date" />
            <input {...register("closingTime")} type="time" />
          </div>
        )}
      </section>

      <TextInput register={register} title="상품 설명" id="content" />

      <Button text="상품 등록" type="submit" onClick={handleSubmit(onSubmit)} />
    </StyledUploadForm>
  );
};

export default UploadForm;
