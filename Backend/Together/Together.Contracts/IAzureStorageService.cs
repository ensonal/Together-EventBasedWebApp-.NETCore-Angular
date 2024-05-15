using Microsoft.AspNetCore.Http;

namespace Together.Contracts;

public interface IAzureStorageService
{
    Task<string> UploadFilesToBlobStorage(IFormFile[] fileRequestDto);
}