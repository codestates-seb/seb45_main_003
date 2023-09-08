import { styled } from "styled-components";
import Button from "../common/Button";
import S3 from "../../aws-config";
import ImageInput from "../common/ImageInput";
import { useImageUpload } from "../../hooks/useImageUpload";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { authInstance } from "../../interceptors/interceptors";
import { REQUIRED } from "../../constants/systemMessage";

const FormContainer = styled.div`
  .field {
    & > p:first-child {
      display: none;
    }
    input[type="file"] {
      display: none;
    }
  }
`;

const ProfileImgRegisterForm = (): JSX.Element => {
  const { register, handleSubmit, formState, setError, clearErrors } = useForm<FieldValues>();
  const { images, handleChange } = useImageUpload({ setError, clearErrors });
  const mutation = useMutation((data: FieldValues) => authInstance.post("url", data));
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
        handleChange={handleChange}
        formState={formState}
      />
      <Button
        type="button"
        $text="이미지 등록"
        $design="black"
        onSubmit={handleSubmit(onSubmitImg)}
      />
    </FormContainer>
  );
};

export default ProfileImgRegisterForm;
