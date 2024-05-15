import {post } from '../axios';

export async function uploadProfileImage(data: FormData) {
    const url = "/AzureStorage/UploadFile";
    const response = await post(url, data);
    console.log("Upload response:", response);
    return response;
}