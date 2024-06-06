using Microsoft.EntityFrameworkCore;
using Together.Contracts;
using Together.Core.Models.ChatModels;
using Together.DataAccess;
using Together.DataAccess.Entities;

namespace Together.Service;

public class ChatService : IChatService
{
    private readonly TogetherDbContext _context;
    private readonly IJwtService _jwtService;

    public ChatService(TogetherDbContext context, IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    public async Task<ChatMessage> SendMessage(string token, SendMessageRequestModel request)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        
        var chatMessage = new ChatMessage
        {
            ChatRoomId = request.ChatRoomId,
            SenderId = userId,
            Content = request.Content,
            SentDate = DateTime.UtcNow
        };
        
        _context.ChatMessages.Add(chatMessage);
        await _context.SaveChangesAsync();

        return chatMessage;
    }

    public async Task AddUserToRoom(int chatRoomId, string userId)
    {
        var chatRoomUser = new ChatRoomUser
        {
            ChatRoomId = chatRoomId,
            UserId = userId,
            JoinedDate = DateTime.UtcNow
        };

        _context.ChatRoomUsers.Add(chatRoomUser);
        await _context.SaveChangesAsync();
    }

    public async Task<ChatRoom> CreateRoom(int userEventId, string roomTitle)
    {
        var chatRoom = new ChatRoom
        {
            UserEventId = userEventId,
            RoomTitle = roomTitle,
            CreatedDate = DateTime.UtcNow
        };

        _context.ChatRooms.Add(chatRoom);
        await _context.SaveChangesAsync();
        return chatRoom;
    }

    public async Task<List<ChatRoomResponseModel>> GetChatRooms(string token)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        
        var chatRooms = await _context.ChatRooms
            .Where(x => x.ChatRoomUsers!.Any(cru => cru.UserId == userId))
            .Include(x => x.ChatMessages)
            .Include(x => x.ChatRoomUsers)
            .ToListAsync();
        
        var chatRoomResponseModels = new List<ChatRoomResponseModel>();
        
        foreach (var chatRoom in chatRooms)
        {
            var chatRoomResponseModel = new ChatRoomResponseModel
            {
                ChatRoomId = chatRoom.ChatRoomId,
                UserEventId = chatRoom.UserEventId,
                RoomTitle = chatRoom.RoomTitle,
                CreatedDate = chatRoom.CreatedDate,
            };
            chatRoomResponseModels.Add(chatRoomResponseModel);
            
            var chatRoomEventView = await _context.UserEvents
                .Where(x => x.UserEventId == chatRoom.UserEventId)
                .Select(x => new ChatRoomEventView
                {
                    UserEventId = x.UserEventId,
                    EventImageUrl = x.EventImageUrl,
                    Title = x.Title
                })
                .FirstOrDefaultAsync();
            
            chatRoomResponseModel.UserEventView = chatRoomEventView;
        }
        
        return chatRoomResponseModels;
    }
    
    public async Task<RoomDetailsResponseModel?> GetRoomDetails(string token, int roomId)
    {
        var chatRoom = await _context.ChatRooms
            .Where(x => x.ChatRoomId == roomId)
            .Include(x => x.ChatRoomUsers)
            .Include(x => x.UserEvent)
            .FirstOrDefaultAsync();
        
        if (chatRoom == null)
        {
            return null;
        }
        
        var chatRoomResponseModel = new RoomDetailsResponseModel
        {
            ChatRoomId = chatRoom.ChatRoomId,
            UserEventId = chatRoom.UserEventId,
            RoomTitle = chatRoom.RoomTitle,
            CreatedDate = chatRoom.CreatedDate,
        };
        
        var eventDetails = new EventDetailView
        {
            UserEventId = chatRoom.UserEvent!.UserEventId,
            EventImageUrl = chatRoom.UserEvent.EventImageUrl,
            Title = chatRoom.UserEvent.Title,
            EventDate = chatRoom.UserEvent.EventDate,
            EventHour = chatRoom.UserEvent.EventHour,
            City = chatRoom.UserEvent.City,
            Country = chatRoom.UserEvent.Country
        };
        chatRoomResponseModel.EventDetails = eventDetails;
        
        var chatRoomUsers = new List<ChatRoomUsersView>();
        
        foreach (var chatRoomUser in chatRoom.ChatRoomUsers!)
        {
            var user = await _context.UserInfo
                .Where(x => x.UserID == chatRoomUser.UserId)
                .Select(x => new ChatRoomUsersView
                {
                    UserId = x.UserID,
                    Name = x.Name,
                    Surname = x.Surname,
                    UserName = x.UserName,
                    ProfileImageUrl = x.ProfileImageUrl
                })
                .FirstOrDefaultAsync();

            if (user != null) chatRoomUsers.Add(user);
        } 
        chatRoomResponseModel.ChatRoomUsers = chatRoomUsers;
        
        return chatRoomResponseModel;
    }
    
    public async Task<List<ChatMessageResponseModel>> GetChatMessages(string token, int roomId)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        
        var chatMessages = await _context.ChatMessages
            .Where(x => x.ChatRoomId == roomId)
            .OrderBy(x => x.SentDate)
            .ToListAsync();
        
        var chatMessagesResponse = new List<ChatMessageResponseModel>();
        
        foreach (var chatMessage in chatMessages)
        {
            var messageUserView = await _context.UserInfo
                .Where(x => x.UserID == chatMessage.SenderId)
                .Select(x => new MessageUserView
                {
                    UserId = x.UserID,
                    Name = x.Name,
                    Surname = x.Surname,
                    ProfileImageUrl = x.ProfileImageUrl
                })
                .FirstOrDefaultAsync();
            
            var chatMessageResponseModel = new ChatMessageResponseModel
            {
                ChatMessageId = chatMessage.ChatMessageId,
                ChatRoomId = chatMessage.ChatRoomId,
                SenderId = chatMessage.SenderId,
                Content = chatMessage.Content,
                SentDate = chatMessage.SentDate,
                IsMine = false,
                MessageUserView = messageUserView
            };

            if (chatMessage.SenderId == userId)
            {
                chatMessageResponseModel.IsMine = true;
            }
            
            chatMessagesResponse.Add(chatMessageResponseModel);
        }
        
        return chatMessagesResponse;
    }
}
