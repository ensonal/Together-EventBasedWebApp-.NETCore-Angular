using System.Net;
using Microsoft.AspNetCore.Mvc;
using Together.Contracts;
using Together.Core.DTO;
using Together.Core.Models;
using Together.Core.Models.Common;


namespace Together.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    #region User Requests

    [HttpPost]
    [Route("register")]
    public async Task<BaseResponseModel> Register(UserRegisterDto request)
    {
        try
        {
            var isSucceed = await _userService.Register(request);
            var response = new BaseResponseModel();

            if (!isSucceed) return response;
            response.Succeeded = true;
            response.StatusCode = (int)HttpStatusCode.Created;
            response.Message = "User registered . ";
            response.Error = "No error";

            return response;
        }
        catch (ExceptionResponseModel ex)
        {
            var response = new BaseResponseModel
            {
                Succeeded = false,
                StatusCode = (int)HttpStatusCode.BadRequest,
                Message = "User registration failed.",
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
                Message = "User registration failed.",
                Error = ex.Message
            };
            return response;
        }
    }

    [HttpPost("login")]
    public async Task<LoginResponseModel> Login(AuthenticationRequest request)
    {
        var user = await _userService.Login(request, GenerateIpAddress());
        
        var response = new LoginResponseModel(user)
        {
            StatusCode = 200,
            Message = "Logged in",
            Succeeded = true
        };
        
        return response;
    }
    
    [HttpGet("isLoginSuccessful")]
    public async Task<BaseResponseModel> IsLoginSuccessful() {
        var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);
        var isSucceed = _userService.IsLoginSuccessful(token);
        var result = new BaseResponseModel
        {
            Succeeded = isSucceed
        };
        
        if (isSucceed)
        {
            result.Message = "Successfully";
            result.StatusCode = 200;
        }
        else
        {
            result.StatusCode = (int)HttpStatusCode.Unauthorized;
            result.Message = "Invalid Token";
            result.Error = "Unauthorized";
        }
        return result;

    }
    
    [HttpGet]
    [Route("GetCurrentUserInfo")]
    public async Task<UserInfoResponseModel> GetCurrentUserInfo()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        var userInfo = await _userService.GetUserInfoAsync(token);
        return new UserInfoResponseModel(userInfo,true, "User Info ready",200);            

    }
    
    [HttpPost]
    [Route("editUserInfo")]
    public async Task<UserInfoResponseModel> UserInfo(UserInfoDTO userInfoDTO)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        var userInfo = await _userService.SettingUserInfo(userInfoDTO, token);
        return new UserInfoResponseModel(userInfo, true, "User info edited.", 200);


    }

    #endregion

    private string GenerateIpAddress()
    {
        if (Request.Headers.ContainsKey("X-Forwarded-For"))
        {
            return Request.Headers["X-Forwarded-For"]!;
        }

        return HttpContext.Connection.RemoteIpAddress == null
            ? "127.0.0.1"
            : HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
    }
}