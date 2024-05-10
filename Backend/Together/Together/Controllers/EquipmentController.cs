using System.Net;
using Microsoft.AspNetCore.Mvc;
using Together.Contracts;
using Together.Core.DTO.EquipmentDTOs;
using Together.Core.Models.Common;
using Together.DataAccess.Entities;

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
    [Route("AddUserEquipment")]
    public async Task<BaseResponseModel> AddUserEquipment(AddEquipmentDto request)
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
    
    [HttpGet]
    [Route("GetUserEquipments")]
    public async Task<List<UserEquipment>> GetUserEquipments()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        var equipment = await _equipmentService.GetUserEquipments(token);
        return equipment;
    }
    
    [HttpPost]
    [Route("DeleteUserEquipment/{userEquipmentId}")]
    public async Task<BaseResponseModel> DeleteUserEquipment(int userEquipmentId)
    {
        try
        {
            var token = HttpContext.Request.Headers.Authorization.ToString();
            var isSucceed = await _equipmentService.DeleteUserEquipment(userEquipmentId, token);
            var response = new BaseResponseModel();

            if (!isSucceed) return response;
            response.Succeeded = true;
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Message = "Equipment deleted. ";
            response.Error = "No error";

            return response;
        }
        catch (ExceptionResponseModel ex)
        {
            var response = new BaseResponseModel
            {
                Succeeded = false,
                StatusCode = (int)HttpStatusCode.BadRequest,
                Message = "Equipment deletion failed.",
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
                Message = "Equipment deletion failed.",
                Error = ex.Message
            };
            return response;
        }
    }

    #endregion
}