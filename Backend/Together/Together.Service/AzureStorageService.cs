using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Together.Contracts;
using Together.DataAccess;

namespace Together.Service;

public class AzureStorageService : IAzureStorageService
{
    private readonly string storageConnectionString;
    private readonly ILogger<AzureStorageService> logger;
    private readonly TogetherDbContext context;

    public AzureStorageService(IConfiguration configuration, ILogger<AzureStorageService> logger,
        TogetherDbContext context)
    {
        storageConnectionString = configuration.GetConnectionString("BlobConnectionString");
        this.logger = logger;
        this.context = context;
    }

    public async Task<string> UploadFilesToBlobStorage(IFormFile[] fileRequestDto)
    {
        var uploadedImageUrl = string.Empty;
        foreach (var file in fileRequestDto)
        {
            uploadedImageUrl = await UploadFileToBlobStorage(file);
        }

        return uploadedImageUrl;
    }

    private async Task<string> UploadFileToBlobStorage(IFormFile fileRequestDto)
    {
        try
        {
            var containerClient = new BlobContainerClient(storageConnectionString, "userprofileimages\n");

            var fileName = Guid.NewGuid().ToString();

            var blobClient = containerClient.GetBlobClient(fileName);

            var blobUploadOptions = new BlobUploadOptions()
            {
                HttpHeaders = new BlobHttpHeaders()
                {
                    ContentType = fileRequestDto.ContentType
                }
            };

            await using (var data = fileRequestDto.OpenReadStream())
            {
                await blobClient.UploadAsync(data, blobUploadOptions);
            }

            return blobClient.Uri.AbsoluteUri;
        }
        catch (RequestFailedException ex) when (ex.ErrorCode == BlobErrorCode.BlobAlreadyExists)
        {
            logger.LogError(
                $"File with name {fileRequestDto.FileName} already exists in container. Set another name to store the file in the container: campsiteimages.");
            throw;
        }
        catch (RequestFailedException ex)
        {
            logger.LogError($"Unhandled Exception. ID: {ex.StackTrace} - Message: {ex.Message}");
            throw;
        }
    }
}