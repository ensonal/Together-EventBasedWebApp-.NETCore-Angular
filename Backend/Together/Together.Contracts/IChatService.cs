using Together.Core.Models.ChatModels;
using Together.DataAccess.Entities;

namespace Together.Contracts;

public interface IChatService
{
    Task<ChatMessage> SendMessage(string token, SendMessageRequestModel request);
    Task AddUserToRoom(int chatRoomId, string userId);
    Task<ChatRoom> CreateRoom(int userEventId, string roomTitle);
    Task<List<ChatRoomResponseModel>> GetChatRooms(string token);
    Task<RoomDetailsResponseModel?> GetRoomDetails(string token, int roomId);
    Task<List<ChatMessageResponseModel>> GetChatMessages(string token, int roomId);
}