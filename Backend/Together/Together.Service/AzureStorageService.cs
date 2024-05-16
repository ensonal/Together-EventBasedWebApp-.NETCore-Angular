using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Together.Contracts;
using Together.Core.Models.AzureStorage;
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

    public async Task<string> UploadFilesToBlobStorage(UploadBlobRequestModel request, IFormFile file)
    {
        if (file == null)
        {
            throw new ArgumentNullException("File is required.");
        }

        if (string.IsNullOrEmpty(request.ContainerName))
        {
            throw new ArgumentNullException("Container name is required.");
        }

        return await UploadFileToBlobStorage(file, request.ContainerName);
    }

    private async Task<string> UploadFileToBlobStorage(IFormFile fileRequestDto, string containerName)
    {
        try
        {
            var containerClient = new BlobContainerClient(storageConnectionString, containerName);

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