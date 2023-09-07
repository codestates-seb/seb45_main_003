import { FieldValues, FormState, RegisterOptions, UseFormRegister } from "react-hook-form";
import { ReactComponent as UploadImageIcon } from "../../assets/images/uploadImage.svg";

type ImageInputProps = {
  register: UseFormRegister<FieldValues>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  images: File[];
  options?: RegisterOptions;
  formState?: FormState<FieldValues>;
};

const ImageInput = (props: ImageInputProps) => {
  const { register, handleChange, images, formState, options } = props;

  return (
    <div className="field">
      <p>이미지</p>

      <div className="input">
        <div className="image_box">
          <label htmlFor="images">
            <UploadImageIcon />
            <p>이미지 등록</p>
          </label>
          {images.length > 0 &&
            images.map((image: File, index: number) => {
              return (
                <img
                  className="image_preview"
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt="미리보기"
                />
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
    </div>
  );
};

export default ImageInput;
