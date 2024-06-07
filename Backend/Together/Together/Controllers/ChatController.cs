using Microsoft.AspNetCore.Mvc;
using Together.Contracts;
using Together.Core.Models.ChatModels;
using Together.DataAccess.Entities;

namespace Together.Controllers;

[ApiController]
[Route("[controller]")]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;
    
    public ChatController(IChatService chatService)
    {
        _chatService = chatService;
    }
    
    [HttpGet]
    [Route("GetChatRooms")]
    public async Task<List<ChatRoomResponseModel>> GetChatRooms()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        return await _chatService.GetChatRooms(token);
    }
    
    [HttpGet]
    [Route("GetRoomDetails/{roomId}")]
    public async Task<RoomDetailsResponseModel?> GetRoomDetails(int roomId)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        return await _chatService.GetRoomDetails(token, roomId);
    }
    
    [HttpPost]
    [Route("SendMessage")]
    public async Task<ChatMessage> SendMessage([FromBody] SendMessageRequestModel request)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        return await _chatService.SendMessage(token, request);
    }
    
    [HttpGet]
    [Route("GetChatMessages/{roomId}")]
    public async Task<List<ChatMessageResponseModel>> GetChatMessages(int roomId)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        return await _chatService.GetChatMessages(token, roomId);
    }
}