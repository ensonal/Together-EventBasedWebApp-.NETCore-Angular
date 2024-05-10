using System.Net;
using Microsoft.AspNetCore.Mvc;
using Together.Contracts;
using Together.Core.DTO.EquipmentDTOs;
using Together.Core.Models.Common;

namespace Together.Controllers;

[ApiController]
[Route("[controller]")]
public class EquipmentController : ControllerBase
{
    private readonly IEquipmentService _equipmentService;

    public EquipmentController(IEquipmentService equipmentService)
    {
        _equipmentService = equipmentService;
    }

    #region Equipment Requests

    [HttpPost]
    [Route("add")]
    public async Task<BaseResponseModel> AddEquipment(AddEquipmentDto request)
    {
        try
        {
            var token = HttpContext.Request.Headers.Authorization.ToString();
            var isSucceed = await _equipmentService.AddUserEquipment(request, token);
            var response = new BaseResponseModel();

            if (!isSucceed) return response;
            response.Succeeded = true;
            response.StatusCode = (int)HttpStatusCode.Created;
            response.Message = "Equipment added. ";
            response.Error = "No error";

            return response;
        }
        catch (ExceptionResponseModel ex)
        {
            var response = new BaseResponseModel
            {
                Succeeded = false,
                StatusCode = (int)HttpStatusCode.BadRequest,
                Message = "Equipment addition failed.",
                Error = ex.Message
            };
            return response;
        }
        catch (Exception ex)
        {
            var response = new BaseResponseModel
            {
                Succeeded = false,
                StatusCode = (int)HttpStatusCode.InternalServerError,
                Message = "Equipment addition failed.",
                Error = ex.Message
            };
            return response;
        }
    }

    #endregion
}