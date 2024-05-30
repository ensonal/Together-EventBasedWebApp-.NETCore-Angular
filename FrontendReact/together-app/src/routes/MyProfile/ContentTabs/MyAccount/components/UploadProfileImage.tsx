import React, { ChangeEvent, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Skeleton from "@mui/material/Skeleton";
import { uploadImage } from "../../../../../api/services/AzureStorageService";
import { changeProfileImageUrl } from "../../../../../api/services/UserService";

export function UploadProfileImage({ profileImageUrl }: { profileImageUrl?: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      try {
        const response = await uploadImage(selectedFile, "userprofileimages");
        if (response) {
          try {
            await changeProfileImageUrl(response);
          } catch (error) {
            console.error("Failed to change profile image:", error);
          }
        }
      } catch (error) {
        console.error("Failed to upload file:", error);
      }
    }
  };

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center pb-3">
      {profileImageUrl === null ? (
        <Skeleton variant="circular" width={100} height={100} />
      ) : (
        <img
          className="rounded-circle shadow-lg"
          src={profileImageUrl ? profileImageUrl : "https://togetherwebapp.blob.core.windows.net/userprofileimages/people.png"}
          width="100"
          height="100"
          alt="Profile"
          style={{ objectFit: "cover" }}
        />
      )}
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={handleUpload}
      >
        <CloudUploadIcon />
      </IconButton>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}
