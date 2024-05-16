import { postWithAddHeader } from "../axios";

export async function uploadImage(
  file: File,
  containerName: string
): Promise<string> {
  const url = "/AzureStorage/UploadFile";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("containerName", containerName);

  const response = await postWithAddHeader(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}
