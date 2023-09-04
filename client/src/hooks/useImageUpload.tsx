import React, { useState } from "react";

interface UseImageUpload {
  setError: (name: string, error: { type: string; message?: string }) => void;
  clearErrors: (name: string) => void;
}

export const useImageUpload = ({ setError, clearErrors }: UseImageUpload) => {
  const MAX_IMAGE_COUNT = 4;
  const [images, setImages] = useState<File[]>([]);
  const [base64Img, setBase64Img] = useState<string[]>([]);

  //이미지를 상태에 추가하는 이벤트 핸들러
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //이미 한계치까지 업로드했을때 추가 업로드 시도하면 막기
    if (images.length > MAX_IMAGE_COUNT - 1) {
      return;
    }

    if (event.target.files) {
      //FileList 객체를 배열화하여 images로 관리
      const imageArray = Array.from(event.target.files);
      const base64Array: string[] = [];

      imageArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target?.result as string;
          base64Array.push(base64String);

          // 모든 파일을 변환하고 이미지 배열과 base64 배열을 업데이트
          if (base64Array.length === imageArray.length) {
            if (imageArray?.length > MAX_IMAGE_COUNT) {
              setError("images", {
                type: "maxImageCount",
                message: `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 선택 가능합니다.`,
              });
              setImages((prev) => [...prev, ...imageArray.slice(0, MAX_IMAGE_COUNT - prev.length)]);
              setBase64Img((prev) => [
                ...prev,
                ...base64Array.slice(0, MAX_IMAGE_COUNT - prev.length),
              ]);
            } else {
              clearErrors("image");
              setImages((prev) => [...prev, ...imageArray]);
              setBase64Img((prev) => [...prev, ...base64Array]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return {
    images,
    base64Img,
    handleChange,
  };
};
