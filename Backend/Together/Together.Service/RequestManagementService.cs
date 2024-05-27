using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Together.Contracts;
using Together.Core.Models.RequestManagementModels;
using Together.DataAccess;
using Together.DataAccess.Entities;

namespace Together.Service;

public class RequestManagementService : IRequestManagementService
{
    private readonly IJwtService _jwtService;
    private readonly TogetherDbContext _context;
    private readonly IHubContext<NotificationHub> _hubContext;
    
    public RequestManagementService(IJwtService jwtService, TogetherDbContext context, IHubContext<NotificationHub> hubContext)
    {
        _jwtService = jwtService;
        _context = context;
        _hubContext = hubContext;
    }

    public async Task<bool> SendRequestToJoinEvent(JoinEventRequestModel request, string token)
    {
        var guestUserId = _jwtService.GetUserIdFromJWT(token);
        
        if(guestUserId == request.UserId)
        {
            return false;
        }
        
        var joinRequest = new UserEventRequest()
        {
            UserEventId = request.EventId,
            OwnerUserId = request.UserId,
            GuestUserId = guestUserId,
            EventRequestStatusId = 2,
            RequestDate = DateTime.Now
        };  
        
        await _context.UserEventRequests.AddAsync(joinRequest);
        await _context.SaveChangesAsync();
        
        var userEvent = await _context.UserEvents.FirstOrDefaultAsync(x => x.UserEventId == request.EventId);
        var userInfo = await _context.UserInfo.FirstOrDefaultAsync(x => x.UserID == guestUserId);
        
        var message = "You have a new request to join your event named " 
                      + userEvent.Title  +" from " + userInfo.Name + " " + userInfo.Surname + "!";


        var notification = new Notification()
        {
            UserId = request.UserId,
            UserEventId = request.EventId,
            Message = message,
            IsRead = false,
            CreatedAt = DateTime.Now
        };
        
        await _context.Notifications.AddAsync(notification);
        await _context.SaveChangesAsync();
        
        await _hubContext.Clients.Group($"user_{request.UserId}").SendAsync("ReceiveNotification", message);
        
        return true;
    }
    
    public async Task<bool> AcceptRequestToJoinEvent(int requestId, string token)
    {
        var request = await _context.UserEventRequests
            .Include(userEventRequest => userEventRequest.UserEvent)
            .FirstOrDefaultAsync(x => x.UserEventRequestId == requestId);
        
        var ownerUserId = _jwtService.GetUserIdFromJWT(token);
        
        if (request == null)
        {
            return false;
        }
        
        if (request.OwnerUserId != ownerUserId)
        {
            return false;
        }
        
        request.EventRequestStatusId = 1;
        
        await _context.SaveChangesAsync();
        
        var message = "Your request to join the event named " + request.UserEvent.Title + " has been accepted!";
        
        var notification = new Notification()
        {
            UserId = request.GuestUserId,
            UserEventId = request.UserEventId,
            Message = message,
            IsRead = false,
            CreatedAt = DateTime.Now
        };
        
        await _context.Notifications.AddAsync(notification);
        await _context.SaveChangesAsync();
        
        await _hubContext.Clients.Group($"user_{request.GuestUserId}").SendAsync("ReceiveNotification", message);
        
        return true;
    }
    
    public async Task<bool> RejectRequestToJoinEvent(int requestId, string token)
    {
        var request = await _context.UserEventRequests
            .Include(userEventRequest => userEventRequest.UserEvent)
            .FirstOrDefaultAsync(x => x.UserEventRequestId == requestId);
        var ownerUserId = _jwtService.GetUserIdFromJWT(token);
        
        if (request == null)
        {
            return false;
        }
        
        if (request.OwnerUserId != ownerUserId)
        {
            return false;
        }
        
        request.EventRequestStatusId = 3;
        
        await _context.SaveChangesAsync();
        
        var message = "Your request to join the event named " + request.UserEvent.Title + " has been rejected!";
        
        var notification = new Notification()
        {
            UserId = request.GuestUserId,
            UserEventId = request.UserEventId,
            Message = message,
            IsRead = false,
            CreatedAt = DateTime.Now,
        };
        
        await _context.Notifications.AddAsync(notification);
        await _context.SaveChangesAsync();
        
        await _hubContext.Clients.Group($"user_{request.GuestUserId}").SendAsync("ReceiveNotification", message);
        
        return true;
    }
    
    public async Task<List<IncomingRequestResponseModel>> GetIncomingRequest(string token)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        
        var requests = await _context.UserEventRequests
            .Where(x => x.OwnerUserId == userId && x.EventRequestStatusId == 2)
            .Select(x => new IncomingRequestResponseModel()
            {
                UserEventRequestId = x.UserEventRequestId,
                UserEventId = x.UserEventId,
                OwnerUserId = x.OwnerUserId,
                GuestUserId = x.GuestUserId,
                EventRequestStatusId = x.EventRequestStatusId,
                RequestDate = x.RequestDate,
                EventView = new EventViewModel()
                {
                    UserEventId = x.UserEvent.UserEventId,
                    Title = x.UserEvent.Title,
                    EventDate = x.UserEvent.EventDate,
                    EventHour = x.UserEvent.EventHour,
                    City = x.UserEvent.City,
                    Country = x.UserEvent.Country,
                    EventImageUrl = x.UserEvent.EventImageUrl
                },
                UserInfoView = new UserInfoViewModel()
                {
                    UserID = x.GuestUserInfo.UserID,
                    Name = x.GuestUserInfo.Name,
                    Surname = x.GuestUserInfo.Surname,
                    City = x.GuestUserInfo.City,
                    Country = x.GuestUserInfo.Country,
                    ProfileImageUrl = x.GuestUserInfo.ProfileImageUrl
                }
            })
            .ToListAsync();
        
        return requests;
    }

    public async Task<List<OutgoingRequestResponseModel>> GetOutgoingRequest(string token)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        
        var requests = await _context.UserEventRequests
            .Where(x => x.GuestUserId == userId)
            .Select(x => new OutgoingRequestResponseModel()
            {
                UserEventRequestId = x.UserEventRequestId,
                UserEventId = x.UserEventId,
                OwnerUserId = x.OwnerUserId,
                GuestUserId = x.GuestUserId,
                EventRequestStatusId = x.EventRequestStatusId,
                RequestDate = x.RequestDate,
                EventView = new EventViewModel()
                {
                    UserEventId = x.UserEvent.UserEventId,
                    Title = x.UserEvent.Title,
                    EventDate = x.UserEvent.EventDate,
                    EventHour = x.UserEvent.EventHour,
                    City = x.UserEvent.City,
                    Country = x.UserEvent.Country,
                    EventImageUrl = x.UserEvent.EventImageUrl
                }
            })
            .ToListAsync();
        
        return requests;
    }
}