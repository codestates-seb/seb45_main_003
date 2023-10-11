import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import { styled } from "styled-components";
import S3 from "../../aws-config";
import { REQUIRED } from "../../constants/systemMessage";
import { useImageUpload } from "../../hooks/useImageUpload";
import { authInstance } from "../../interceptors/interceptors";
import Button from "../common/Button";
import ImageInput from "../common/ImageInput";

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
  const queryClient = useQueryClient();
  const Id = localStorage.getItem("Id");
  const mutation = useMutation(
    async (data: FieldValues) => await authInstance.post(`/members/${Id}/image`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile"]);
        props.setMode(false);
      },
    },
  );
  //성공시 모드 변경후 프로필 다시 로딩
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
        path: imagePaths[0],
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
        <Button type="submit" $text="적용" $design="black" onClick={handleSubmit(onSubmitImg)} />
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
