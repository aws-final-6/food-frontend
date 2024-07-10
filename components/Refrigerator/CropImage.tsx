"use client";
import { Button } from "@nextui-org/button";
import React, { useState, useRef, useCallback } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const CropImage: React.FC = () => {
  const [src, setSrc] = useState<string | null>(null);
  const [newFile, setNewFile] = useState<File | undefined>(undefined);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileUrlRef = useRef<string | null>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSrc(reader.result as string);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = useCallback((image: HTMLImageElement) => {
    imageRef.current = image;
    console.log("Image loaded:", image);
  }, []);

  const onCropComplete = useCallback((crop: Crop) => {
    console.log("Crop complete:", crop);
    makeClientCrop(crop);
  }, []);

  const onCropChange = (crop: Crop) => {
    setCrop(crop);
  };

  const makeClientCrop = async (crop: Crop) => {
    console.log("imageref", imageRef.current);
    console.log("crop", crop);

    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef.current,
        crop,
        "newFile.jpeg"
      );
      console.log("Cropped image URL:", croppedImageUrl);
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (
    image: HTMLImageElement,
    crop: Crop,
    fileName: string
  ): Promise<string> => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }

    return new Promise((resolve, reject) => {
      // Get base64 data URL of the image
      const base64ImageUrl = canvas.toDataURL("image/jpeg");
      if (!base64ImageUrl) {
        reject(new Error("Failed to convert canvas to data URL"));
        return;
      }
      resolve(base64ImageUrl);
    });
  };

  const getImageText = async () => {
    if (!croppedImageUrl) return;

    try {
      // Fetch the base64 data URL
      const base64Response = await fetch(croppedImageUrl);
      const blob = await base64Response.blob();

      // Create a File object from the blob
      const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("file", file);

      // Debugging logs: Check FormData content
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      const res = await fetch("http://3.35.71.235:8000/naver/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to send image to API");
      }

      const data = await res.json();
      console.log("OCR Text:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
      </div>
      {src && (
        <ReactCrop
          crop={crop}
          ruleOfThirds
          onComplete={onCropComplete}
          onChange={onCropChange}
          className="mb-4"
        >
          <img
            src={src}
            alt="Source"
            onLoad={(event) => onImageLoaded(event.currentTarget)}
          />
        </ReactCrop>
      )}
      {croppedImageUrl && <img src={croppedImageUrl} alt="Crop" />}
      <Button onClick={getImageText} disabled={!croppedImageUrl}>
        텍스트 읽기
      </Button>
    </div>
  );
};

export default CropImage;
