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
    
    public RequestManagementService(IJwtService jwtService, TogetherDbContext context)
    {
        _jwtService = jwtService;
        _context = context;
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