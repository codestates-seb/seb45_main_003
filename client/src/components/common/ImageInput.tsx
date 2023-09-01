import { DeepMap, FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { ReactComponent as UploadImageIcon } from "../../assets/images/uploadImage.svg";

type ImageInputProps = {
  register: UseFormRegister<FieldValues>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  images: File[];
  errors: DeepMap<FieldValues, FieldError>;
};

const ImageInput = (props: ImageInputProps) => {
  return (
    <div className="box">
      <h4>이미지</h4>
      <label htmlFor="image">
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
        {...props.register("image")}
        onChange={props.handleChange}
        id="image"
        type="file"
        accept="image/*"
        multiple
      />
      {props.errors.image?.message && <p>{props.errors.image.message}</p>}
    </div>
  );
};

export default ImageInput;
