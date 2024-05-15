import React, { useRef } from "react";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Skeleton from "@mui/material/Skeleton";
import { uploadProfileImage } from "../../../../../api/services/AzureStorageService";
import { changeProfileImageUrl } from "../../../../../api/services/UserService";

export function UploadProfileImage({ profileImageUrl }: { profileImageUrl: string }){
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const selectedFile = files[0];
      // Implement your file upload logic here
      console.log("Selected file:", selectedFile);
      const formData = new FormData();
      formData.append("file", selectedFile);
      uploadProfileImage(formData)
      .then((response) => {
        if (response) {
            changeProfileImageUrl(response)
                .then((profileImageUrl) => {
                    console.log("Profile image changed:", profileImageUrl);
                })
                .catch((error) => {
                    console.error("Failed to change profile image:", error);
                });
        }    
        })
        .catch((error) => {
          console.error("Failed to upload file:", error);
        });
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
            src={profileImageUrl}
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
          onClick={() => handleUpload()}
        >
          <CloudUploadIcon />
        </IconButton>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e.target.files)}
        />

    </div>
  );
}