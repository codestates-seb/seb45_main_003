import {
  DeepMap,
  FieldError,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { ReactComponent as UploadImageIcon } from "../../assets/images/uploadImage.svg";

type ImageInputProps = {
  register: UseFormRegister<FieldValues>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  images: File[];
  options?: RegisterOptions;
  errors?: DeepMap<FieldValues, FieldError>;
};

const ImageInput = (props: ImageInputProps) => {
  return (
    <div className="box">
      <h4>이미지</h4>
      <label htmlFor="images">
        <UploadImageIcon />
        <p>이미지 등록</p>
      </label>
      {props.images.length > 0 &&
        props.images.map((image: File, index: number) => {
          return (
            <img
              className="image-preview"
              key={index}
              src={URL.createObjectURL(image)}
              alt="미리보기"
            />
          );
        })}
      <input
        {...props.register("images")}
        onChange={props.handleChange}
        id="images"
        type="file"
        accept="image/*"
        multiple
      />
      {props.errors?.images?.message && <p>{props.errors.images.message}</p>}
    </div>
  );
};

export default ImageInput;
