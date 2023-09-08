import { styled } from "styled-components";
import Button from "../common/Button";
import S3 from "../../aws-config";
import ImageInput from "../common/ImageInput";
import { useImageUpload } from "../../hooks/useImageUpload";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { authInstance } from "../../interceptors/interceptors";
import { REQUIRED } from "../../constants/systemMessage";

interface Props {
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  mode: boolean;
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 0.5rem;
  .field {
    & > p:first-child {
      display: none;
    }
    input[type="file"] {
      display: none;
    }
  }
  .buttonContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
`;

const ProfileImgRegisterForm = (props: Props): JSX.Element => {
  const { register, handleSubmit, formState, setError, clearErrors } = useForm<FieldValues>();
  const maxImageCount = 1;
  const { images, handleChange, handleDelete } = useImageUpload({
    setError,
    clearErrors,
    maxImageCount,
  });
  const mutation = useMutation(async (data: FieldValues) => await authInstance.post("url", data));
  const onSubmitImg = async (data: FieldValues) => {
    try {
      const imagePaths: string[] = [];
      for (const image of images) {
        const params: AWS.S3.PutObjectRequest = {
          Bucket: "wonprice-test1",
          Key: `${new Date().toISOString()}-${image.name}}`,
          Body: image,
          ContentType: image.type,
        };
        const result = await S3.upload(params).promise();
        imagePaths.push(result.Location);
      }
      data = {
        ...data,
        images: imagePaths,
      };
      mutation.mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormContainer>
      <ImageInput
        register={register}
        options={{ required: REQUIRED.images }}
        images={images}
        handleDelete={handleDelete}
        handleChange={handleChange}
        formState={formState}
        maximagecount={maxImageCount}
      />
      <div className="buttonContainer">
        <Button type="button" $text="적용" $design="black" onSubmit={handleSubmit(onSubmitImg)} />
        <Button
          type="button"
          $text="취소"
          $design="black"
          onClick={() => props.setMode(!props.mode)}
        />
      </div>
    </FormContainer>
  );
};

export default ProfileImgRegisterForm;
