using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using Together.Contracts;
using Together.Core.Models.Common;

namespace Together.Controllers;

    [ApiController]
    [Route("[controller]")]
    public class AzureStorageController : ControllerBase
    {
        private readonly IAzureStorageService _azureStorageService;
        private readonly ILogger<AzureStorageController> _logger;

        public AzureStorageController(IAzureStorageService azureStorageService, ILogger<AzureStorageController> logger)
        {
            _azureStorageService = azureStorageService;
            _logger = logger;
        }

        [HttpPost("UploadFile")]
        public async Task<IActionResult> UploadFile(IFormFile[] file)
        {
            try
            {
                var token = HttpContext.Request.Headers.Authorization.ToString();
                var uploadedImageUrl = await _azureStorageService.UploadFilesToBlobStorage(file);
                return Ok(uploadedImageUrl);
            }
            catch (ValidationException exception)
            {
                var response = new ErrorResponseModel(exception.Message, "Validation Error", (int)HttpStatusCode.BadRequest);
                return BadRequest(response);
            }
            catch (BadHttpRequestException exception)
            {
                var response = new ErrorResponseModel(exception.Message, "Bad Request", exception.StatusCode);
                return BadRequest(response);
            }
            catch (UnauthorizedAccessException exception)
            {
                return Unauthorized(exception.Message);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Error uploading file.");
                return StatusCode((int)HttpStatusCode.InternalServerError, "An error occurred while processing your request.");
            }
        }

    }
