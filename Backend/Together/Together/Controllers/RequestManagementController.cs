using Microsoft.AspNetCore.Mvc;
using Together.Contracts;
using Together.Core.Models.RequestManagementModels;

namespace Together.Controllers;

[ApiController]
[Route("[controller]")]
public class RequestManagementController : ControllerBase
{
    private readonly IRequestManagementService _requestManagementService;
    
    public RequestManagementController(IRequestManagementService requestManagementService)
    {
        _requestManagementService = requestManagementService;
    }
    
    [HttpPost("sendRequestToJoinEvent")]
    public async Task<IActionResult> SendRequestToJoinEvent(JoinEventRequestModel request)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        var result = await _requestManagementService.SendRequestToJoinEvent(request, token);
        return Ok(result);
    }
    
    [HttpPost("acceptRequestToJoinEvent/{requestId}")]
    public async Task<IActionResult> AcceptRequestToJoinEvent(int requestId)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        var result = await _requestManagementService.AcceptRequestToJoinEvent(requestId, token);
        return Ok(result);
    }
    
    [HttpPost("rejectRequestToJoinEvent/{requestId}")]
    public async Task<IActionResult> RejectRequestToJoinEvent(int requestId)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        var result = await _requestManagementService.RejectRequestToJoinEvent(requestId, token);
        return Ok(result);
    }
    
    [HttpGet("getIncomingRequest")]
    public async Task<IActionResult> GetRequestsForUser()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        var result = await _requestManagementService.GetIncomingRequest(token);
        return Ok(result);
    }
    
    [HttpGet("getOutgoingRequest")]
    public async Task<IActionResult> GetRequestForGuest()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        var result = await _requestManagementService.GetOutgoingRequest(token);
        return Ok(result);
    }
}