import { useMutation } from "@tanstack/react-query";
import { pickBy } from "lodash";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import S3 from "../../aws-config";
import { CATEGORY } from "../../constants/category";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import { API_PATHS } from "../../constants/path";
import { FAIL, MAX, MIN, REQUIRED, SUCCESS } from "../../constants/systemMessage";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useModal } from "../../hooks/useModal";
import { authInstance } from "../../interceptors/interceptors";
import { formatTime, getCurrentDateTime } from "../../util/date";
import { allowOnlyNumber } from "../../util/number";
import Button from "../common/Button";
import ImageInput from "../common/ImageInput";
import Modal from "../common/Modal";
import SelectInput from "../common/SelectInput";
import TextArea from "../common/TextArea";
import TextInput from "../common/TextInput";
import { ProductData } from "../productList/List";

const StyledUploadForm = styled.section`
  padding: 2.5rem 0 4rem;
  gap: 1rem;

  h1 {
    margin: 0 0 ${FONT_SIZE.font_16};
  }

  h3 {
    font-size: ${FONT_SIZE.font_24};
    margin: 0 0 0.5rem;
  }

  .basic_information {
    border: 1px solid ${COLOR.border};
    border-radius: 6px;
  }

  .description {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid ${COLOR.border};
    background: ${COLOR.gray_100};
  }

  .box {
    padding: 1.5rem 1.5rem 2.5rem;
    display: flex;
    flex-flow: column;
    border-bottom: 1px solid ${COLOR.border};
    gap: 1rem;

    &.top > .field:first-child {
      align-items: flex-start;
    }

    .field,
    .radio {
      display: flex;
      flex-flow: row;
      align-items: center;
      gap: 0.75rem;

      & > p:first-child {
        max-width: 10.125rem;
        width: 25%;
        font-size: ${FONT_SIZE.font_20};
        font-weight: 700;
      }

      .input:not(.inline, .radio) {
        width: 100%;
        position: relative;
        display: flex;
        flex-flow: column;
      }
    }

    #title {
      max-width: 37.5rem;
    }

    input[name="currentAuctionPrice"],
    input[name="immediatelyBuyPrice"] {
      max-width: 15rem;
      width: 100%;
    }
  }

  input[type="file"] {
    display: none;
  }

  #currentAuctionPrice,
  #immediatelyBuyPrice {
    padding: 0.5rem 2rem 0.5rem 0.75rem;

    & + span {
      color: ${COLOR.gray_800};
      position: absolute;
      left: 13.375rem;
      top: 0.5rem;
    }
  }

  input[type="radio"] {
    padding: 0 !important;
    vertical-align: middle;
    appearance: none;
    border: 1px solid ${COLOR.darkText};
    border-radius: 50%;
    width: 1.5rem;
    aspect-ratio: 1/1;

    &:checked {
      border: 5px solid ${COLOR.darkText};
    }

    &:hover {
      border: 5px solid ${COLOR.primary};
    }
  }

  input[type="time"] {
  }

  .select_date {
    display: flex;
    flex-flow: row;
    gap: 0.75rem;
  }

  .error_message {
    color: ${COLOR.invalid};
    margin: 0.5rem 0 0;

    & + .error_message {
      margin: 0;
    }
  }

  .error {
    border: 1px solid ${COLOR.invalid};
  }

  .textarea {
    width: 100%;

    textarea {
      width: 100%;

      min-height: 18.75rem;
    }
  }

  button {
    margin: 1.5rem 1.5rem 1.5rem auto;
  }

  @media (max-width: 64rem) {
    .box {
      padding: 1rem 1rem 1.5rem;

      .field {
        flex-flow: column;
        align-items: flex-start;

        & > p:first-child {
          width: 100%;
          max-width: unset;
        }
      }
    }
    .description {
      padding: 1rem;
    }
    button {
      width: calc(100% - 2rem);
      margin: 1rem;
    }
  }
`;

const UploadForm = () => {
  const MAX_IMAGE_COUNT = 4;
  const { watch, control, register, handleSubmit, setError, clearErrors, formState } =
    useForm<FieldValues>();
  const { isOpen, setIsOpen, closeModal, toggleModal } = useModal();
  //이미지 업로드 개수를 제한하는 커스텀 훅
  const { images, handleChange, handleDelete } = useImageUpload({
    setError,
    clearErrors,
    maxImageCount: MAX_IMAGE_COUNT,
  });
  const [isAuction, setIsAuction] = useState(true);
  const [submitResult, setSubmitResult] = useState(false);
  const navigate = useNavigate();

  const postData = async (data: FieldValues) => {
    const response = isUpdateMode
      ? await authInstance.patch(API_PATHS.products.default(updateModeData.productId), data)
      : await authInstance.post(API_PATHS.products.default(""), data);
    return response.data;
  };

  const { mutate } = useMutation(postData, {
    onSuccess: (data) => {
      setResData(data);
      setSubmitResult(true);
    },
    onError: () => {
      setSubmitResult(false);
    },
    onSettled: () => {
      setIsOpen(true);
    },
  });

  const immediatelyBuyPrice = watch("immediatelyBuyPrice");

  //Link를 통해 update mode state를 전달했을때 사용
  const location = useLocation();
  const isUpdateMode = location.state ? location.state.isUpdateMode : null;
  const updateModeData = location.state ? location.state.updateModeData : null;
  const ACTION = !isUpdateMode ? "등록" : "수정";
  const [resData, setResData] = useState<ProductData>();
  const bucket = process.env.REACT_APP_IMAGE_BUCKET_NAME;

  const onSubmit = async (data: FieldValues) => {
    if (!isUpdateMode) {
      //s3로 보낼 이미지 준비
      const imagePaths: string[] = [];

      for (const image of images) {
        const params: AWS.S3.PutObjectRequest = {
          Bucket: bucket ? bucket : "",
          Key: `${new Date().toISOString() + "-" + image.name}`,
          Body: image,
          ContentType: image.type,
        };

        //s3으로 이미지 업로드
        const result = await S3.upload(params).promise();
        imagePaths.push(result.Location);
      }

      //백엔드로 보낼 데이터 준비
      data = {
        ...data,
        auction: isAuction,
        images: imagePaths,
        closedAt: formatTime(data.closedAt),
      };
    }

    data.closedAt ? "" : delete data.closedAt;

    //값이 없는 필드 제거
    const excludeEmptyData = pickBy(data, (value, key) => key === "auction" || value.length > 0);

    //백엔드로 이미지 전송
    mutate(excludeEmptyData);
  };

  return (
    <>
      <StyledUploadForm>
        <h1>상품 {ACTION}하기</h1>

        <section className="basic_information">
          <div className="description">
            <h3>기본 정보</h3>
            <p>상품의 필수적인 정보입니다.</p>
          </div>

          <div className="box top">
            {!isUpdateMode && (
              <ImageInput
                register={register}
                options={{
                  required: REQUIRED.images,
                }}
                images={images}
                handleChange={handleChange}
                handleDelete={handleDelete}
                formState={formState}
                maximagecount={MAX_IMAGE_COUNT}
              />
            )}

            <TextInput
              register={register}
              options={{
                required: REQUIRED.title,
                maxLength: {
                  value: 40,
                  message: MAX.title(40),
                },
              }}
              title="제목"
              id="title"
              type="text"
              formState={formState}
              defaultValue={isUpdateMode ? updateModeData.title : ""}
            />

            {!isUpdateMode && (
              <Controller
                name="categoryId"
                control={control}
                defaultValue=""
                rules={{ required: REQUIRED.category }}
                render={({ field }) => (
                  <SelectInput
                    title="카테고리"
                    id="categoryId"
                    field={field}
                    selectoptions={CATEGORY}
                    formState={formState}
                  />
                )}
              />
            )}
          </div>
          {!isUpdateMode && (
            <>
              <div className="description">
                <h3>판매 설정</h3>
                <p>경매 진행 여부를 선택할 수 있습니다.</p>
              </div>

              <div className="box">
                <div className="field">
                  <p>판매 방식</p>
                  <div className="input radio">
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
                </div>

                {isAuction && (
                  <TextInput
                    register={register}
                    options={{
                      required: REQUIRED.currentAuctionPrice,
                      onChange: (event) => allowOnlyNumber(event),
                      min: {
                        value: 500,
                        message: MIN.price("500원"),
                      },
                      max: {
                        value: immediatelyBuyPrice - 1,
                        message: MAX.auctionPrice,
                      },
                    }}
                    title="경매시작가"
                    id="currentAuctionPrice"
                    type="text"
                    formState={formState}
                  />
                )}

                <TextInput
                  register={register}
                  options={{
                    required: REQUIRED.immediatelyBuyPrice,
                    onChange: (event) => allowOnlyNumber(event),
                    min: {
                      value: 1000,
                      message: MIN.price("1000원"),
                    },
                    max: {
                      value: 1000000000,
                      message: MAX.price("10억"),
                    },
                  }}
                  title="즉시구매가"
                  id="immediatelyBuyPrice"
                  type="text"
                  formState={formState}
                />

                {isAuction && (
                  <div className="field">
                    <p>경매 종료 시간</p>
                    <div className="input">
                      <div className="select_date">
                        <input
                          className={formState.errors.closedAt?.message ? "error" : ""}
                          {...register("closedAt", {
                            required: REQUIRED.closedAt,
                            min: {
                              value: getCurrentDateTime(),
                              message: MIN.date,
                            },
                          })}
                          type="datetime-local"
                        />
                      </div>
                      <div className="date_error">
                        {formState.errors.closedAt?.message && (
                          <p className="error_message">
                            {formState.errors.closedAt.message.toString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="description">
            <h3>상세 정보</h3>
            <p>상품 상태 등 구매에 도움이 되는 정보를 입력합니다.</p>
          </div>

          <div className="box top">
            <TextArea
              register={register}
              options={{
                required: REQUIRED.description,
              }}
              title="상품 설명"
              id="description"
              formState={formState}
              defaultValue={isUpdateMode ? updateModeData.description : ""}
            />
          </div>
          <Button
            $size="big"
            $design="black"
            $text={`상품 ${ACTION}`}
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        </section>
      </StyledUploadForm>

      <Modal {...{ isOpen, setIsOpen, closeModal, toggleModal }}>
        <>
          {submitResult ? (
            <>
              <h4>상품 {ACTION} 성공</h4>
              <p>{isUpdateMode ? SUCCESS.update : SUCCESS.post}</p>
            </>
          ) : (
            <>
              <h4>상품 {ACTION} 실패</h4>
              <p>{isUpdateMode ? FAIL.update : FAIL.post}</p>
            </>
          )}
          <Button
            $design="black"
            $text="확인"
            type="button"
            onClick={() => {
              submitResult && resData
                ? navigate(`/product/${resData.productId}`)
                : setIsOpen(!isOpen);
            }}
          />
        </>
      </Modal>
    </>
  );
};

export default UploadForm;
