using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Together.Contracts;
using Together.Core.Models.RequestManagementModels;
using Together.DataAccess;
using Together.DataAccess.Entities;

namespace Together.Service;

public class RequestManagementService : IRequestManagementService
{
    private readonly IJwtService _jwtService;
    private readonly TogetherDbContext _context;
    private readonly IHubContext<NotificationHub> _notificationHub;
    private readonly ILogger<RequestManagementService> _logger;

    public RequestManagementService(IJwtService jwtService, TogetherDbContext context, IHubContext<NotificationHub> notificationHub, ILogger<RequestManagementService> logger)
    {
        _jwtService = jwtService;
        _context = context;
        _notificationHub = notificationHub;
        _logger = logger;
    }

    public async Task<bool> SendRequestToJoinEvent(JoinEventRequestModel request, string token)
    {
        var guestUserId = _jwtService.GetUserIdFromJWT(token);

        if (guestUserId == request.UserId)
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

        _logger.LogInformation($"Sending notification to user {request.UserId} for new join request");

        await _notificationHub.Clients.User(request.UserId).SendAsync("ReceiveNotification", "You have a new request to join the event.", request.EventId);

        return true;
    }
    
    public async Task<bool> AcceptRequestToJoinEvent(int requestId, string token)
    {
        var request = await _context.UserEventRequests.FirstOrDefaultAsync(x => x.UserEventRequestId == requestId);
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

        _logger.LogInformation($"Sending notification to user {request.GuestUserId} for accepted join request");

        await _notificationHub.Clients.User(request.GuestUserId).SendAsync("ReceiveNotification", "Your request to join the event has been accepted.", request.UserEventId);

        return true;
    }
    
    public async Task<bool> RejectRequestToJoinEvent(int requestId, string token)
    {
        var request = await _context.UserEventRequests.FirstOrDefaultAsync(x => x.UserEventRequestId == requestId);
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
        
        await _notificationHub.Clients.User(request.GuestUserId).SendAsync("ReceiveNotification", "Your request to join the event has been rejected.");
        
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