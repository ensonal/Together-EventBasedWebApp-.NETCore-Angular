import React, { Dispatch, useRef, SetStateAction } from "react";
import { UserEvent } from "../../../api/models/UserEvent";
import { uploadImage } from "../../../api/services/AzureStorageService";

export function UploadEventImage({
  setUserEvent,
  event,
}: {
  setUserEvent: Dispatch<SetStateAction<any>>;
  event?: any;
}) {
  const [eventImageUrl, setEventImageUrl] = React.useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      try {
        const response = await uploadImage(selectedFile, "usereventimages");
        if (response) {
          setEventImageUrl(response);
          setUserEvent((prevUserEvent: any) => ({
            ...prevUserEvent,
            eventImageUrl: response,
          }));
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
    <div className="d-flex flex-column gap-2 mt-5">
      <p className="fs-5">Event image</p>
      <img
        className="rounded-3 border m-0"
        src={
          event?.eventImageUrl ||
          eventImageUrl ||
          "https://archive.org/download/placeholder-image/placeholder-image.jpg"
        }
        width="350"
        height="250"
        alt="Event"
        style={{
          objectFit: "cover",
          cursor: "pointer",
          boxShadow: "0 0 5px 0 #ccc",
        }}
        onClick={handleUpload}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
