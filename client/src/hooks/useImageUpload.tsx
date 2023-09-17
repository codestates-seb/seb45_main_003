import React, { useState } from "react";
import { MAX } from "../constants/systemMessage";

type UseImageUpload = {
  setError: (name: string, error: { type: string; message?: string }) => void;
  clearErrors: (name: string) => void;
  maxImageCount: number;
};

export const useImageUpload = ({ setError, clearErrors, maxImageCount }: UseImageUpload) => {
  const MAX_IMAGE_COUNT = maxImageCount;
  const [images, setImages] = useState<File[]>([]);

  //이미지를 상태에 추가하는 이벤트 핸들러
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //이미 한계치까지 업로드했을때 추가 업로드 시도하면 막기
    if (images.length > MAX_IMAGE_COUNT - 1) {
      return;
    }

    if (event.target.files) {
      //FileList 객체를 배열화하여 images로 관리
      const imageArray = Array.from(event.target.files);

      //중복 이미지 필터링
      const uniqueImages = imageArray.filter(
        (image) => !images.some((existingImage) => existingImage.name === image.name),
      );

      //최대 이미지 업로드 수 제한
      if (uniqueImages?.length + images.length > MAX_IMAGE_COUNT) {
        setError("images", {
          type: "maxImageCount",
          message: MAX.imageSelect(MAX_IMAGE_COUNT),
        });
        setImages((prev) => [...prev, ...uniqueImages.slice(0, MAX_IMAGE_COUNT - prev.length)]);

        return;
      }

      clearErrors("images");
      setImages((prev) => [...prev, ...uniqueImages]);
    }
  };

  //이미지 상태에서 이미지를 삭제
  const handleDelete = (name: string) => {
    clearErrors("images");
    setImages(images.filter((image) => image.name !== name));
  };

  return {
    images,
    handleChange,
    handleDelete,
  };
};
