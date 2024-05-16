using Microsoft.AspNetCore.Http;
using Together.Core.Models.AzureStorage;

namespace Together.Contracts;

public interface IAzureStorageService
{
    Task<string> UploadFilesToBlobStorage(UploadBlobRequestModel requestModel,IFormFile file);
}