import { FieldValues, FormState, RegisterOptions, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as DeleteImageIcon } from "../../assets/images/DeleteImage.svg";
import { ReactComponent as UploadImageIcon } from "../../assets/images/UploadImage.svg";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";

type ImageInputProps = {
  register: UseFormRegister<FieldValues>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (name: string) => void;
  images: File[];
  maximagecount: number;
  options?: RegisterOptions;
  formState?: FormState<FieldValues>;
};

const StyledImageInput = styled.div`
  .image_box {
    display: flex;
    flex-flow: row;
  }

  label[for="images"] {
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    width: 9.375rem;
    aspect-ratio: 1/1;
    background: #f7f7f7;
    color: ${COLOR.lightText};
    font-size: ${FONT_SIZE.font_18};
    border: 1px solid ${COLOR.border};
  }

  .image_input {
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 1rem;
  }

  .image_preview_box {
    position: relative;
    display: flex;

    &:hover {
      .delete_image {
        display: flex;
      }
    }
  }

  .image_preview {
    width: 9.375rem;
    aspect-ratio: 1/1;
    object-fit: cover;
  }

  .delete_image {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    align-items: center;
    justify-content: center;
  }
`;

const ImageInput = (props: ImageInputProps) => {
  const { register, handleDelete, handleChange, images, formState, options, maximagecount } = props;

  return (
    <StyledImageInput className="field">
      <p>이미지</p>
      <div className="input">
        <div className="image_box">
          {images.length < maximagecount && (
            <label htmlFor="images">
              <UploadImageIcon />
              <p>이미지 등록</p>
            </label>
          )}
          {images.length > 0 &&
            images.map((image: File) => {
              return (
                <div className="image_preview_box" key={uuidv4()}>
                  <div
                    className="delete_image"
                    onClick={() => {
                      handleDelete(image.name);
                    }}
                  >
                    <DeleteImageIcon />
                  </div>
                  <img className="image_preview" src={URL.createObjectURL(image)} alt="미리보기" />
                </div>
              );
            })}
          <input
            {...register("images", {
              onChange: (event) => handleChange(event),
              ...options,
            })}
            id="images"
            type="file"
            accept="image/*"
            multiple
          />
        </div>
        {formState?.errors?.images?.message && (
          <p className="error_message">{formState.errors.images.message.toString()}</p>
        )}
      </div>
    </StyledImageInput>
  );
};

export default ImageInput;
