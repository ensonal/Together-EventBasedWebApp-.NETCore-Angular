using Microsoft.AspNetCore.Http;

namespace Together.Core.Models.AzureStorage;

public class UploadBlobRequestModel
{
    public string ContainerName { get; set; }
}