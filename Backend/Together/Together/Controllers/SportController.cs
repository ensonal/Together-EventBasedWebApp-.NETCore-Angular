using Microsoft.AspNetCore.Mvc;
using Together.Contracts;
using Together.Core.DTO.SportDTOs;
using Together.Core.Models.SportModels;
using Together.DataAccess.Entities;

namespace Together.Controllers;

[ApiController]
[Route("[controller]")]
public class SportController : ControllerBase
{
    private readonly ISportService _sportService;

    public SportController(ISportService sportService)
    {
        _sportService = sportService;
    }
    
    [HttpGet]
    [Route("GetAllSports")]
    public async Task<List<Sport>> GetAllSports()
    {
        return await _sportService.GetAllSports();
    }
    
    [HttpPost]
    [Route("AddUserSport")]
    public async Task<bool> AddUserSport(AddUserSportDto request)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        return await _sportService.AddUserSport(request, token);
    }
    
    [HttpGet]
    [Route("GetAllUserSport")]
    public async Task<UserSportResponseModel[]> GetAllUserSport()
    { 
        var token = HttpContext.Request.Headers.Authorization.ToString();
        return await _sportService.GetAllUserSport(token);
    }
    
    [HttpGet]
    [Route("GetUserSportsByUserId/{userId}")]
    public async Task<UserSportResponseModel[]> GetUserSportsByUserId(string userId)
    { 
        var userSports =  await _sportService.GetUserSportsByUserId(userId);
        return userSports;
    }
    
    [HttpPost]
    [Route("DeleteUserSport/{userSportId}")]
    public async Task<bool> DeleteUserSport(int userSportId)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        return await _sportService.DeleteUserSport(userSportId, token);
    }
    
    [HttpGet]
    [Route("GetAllSportExperience")]
    public async Task<List<SportExperience>> GetAllSportExperience()
    { 
        return await _sportService.GetAllSportExperience();
    }
    
}