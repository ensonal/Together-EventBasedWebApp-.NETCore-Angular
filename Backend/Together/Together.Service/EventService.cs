using Microsoft.EntityFrameworkCore;
using Together.Contracts;
using Together.Core.DTO.EventDTOs;
using Together.Core.Models.Common;
using Together.Core.Models.EventModels;
using Together.Core.Models.FilterModels;
using Together.DataAccess;
using Together.DataAccess.Entities;

namespace Together.Service;

public class EventService : IEventService
{
    private readonly TogetherDbContext _context;
    private readonly IJwtService _jwtService;
    private readonly IChatService _chatService;
    
    public EventService(TogetherDbContext context, IJwtService jwtService, IChatService chatService)
    {
        _context = context;
        _jwtService = jwtService;
        _chatService = chatService;
    }
    
    public async Task<bool> AddUserEvent(AddUserEventDto request, string token)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        var userEvent = new UserEvent()
        {
            UserId = userId,
            SportId = request.SportId,
            EventStatusId = 1,
            SportExperienceId = request.SportExperienceId,
            Title = request.Title,
            Description = request.Description,
            EventDate = request.EventDate,
            EventHour = request.EventHour,
            City = request.City,
            Country = request.Country,
            EventImageUrl = request.EventImageUrl
        };
        
        var userEventFromDb = await _context.UserEvents.AddAsync(userEvent);
        await _context.SaveChangesAsync();
        
        await SaveEventLocation(request.Latitude, request.Longitude, userEventFromDb.Entity.UserEventId );
        
        var chatRoom = await _chatService.CreateRoom(userEventFromDb.Entity.UserEventId, request.Title);
        await _chatService.AddUserToRoom(chatRoom.ChatRoomId, userId);
        
        return true;
    }
    
    public async Task<bool> DeleteUserEvent(int userEventId)
    {
        var userEvent = await _context.UserEvents.FindAsync(userEventId);
        if (userEvent == null)
        {
            return false;
        } 
        
        _context.UserEventRequests.RemoveRange(_context.UserEventRequests.Where(x => x.UserEventId == userEventId));
        _context.UserFavoriteEvents.RemoveRange(_context.UserFavoriteEvents.Where(x => x.EventId == userEventId));
        _context.Notifications.RemoveRange(_context.Notifications.Where(x => x.UserEventId == userEventId));
        _context.UserEventLocations.RemoveRange(_context.UserEventLocations.Where(x => x.UserEventId == userEventId));

        await _context.SaveChangesAsync();
                
        _context.UserEvents.Remove(userEvent);
        await _context.SaveChangesAsync();
        
        return true;
    }
    
    public async Task<List<UserEvent>> GetUserEvents(string token)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        var userEvents = await _context.UserEvents.Where(x => x.UserId == userId).ToListAsync();
        return userEvents;
    }
    
    public async Task<PagedResponse<UserEventDto>> GetAllEvents(EventFilterDto filter, string token)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        var userEventView = _context.UserEvents.AsQueryable();
        userEventView = ApplyFilters(userEventView, filter);
        
        var userFavoriteEventIds = await _context.UserFavoriteEvents
            .Where(ufe => ufe.UserId == userId)
            .Select(ufe => ufe.EventId)
            .ToListAsync();
        
        var userEvents = await userEventView
            .Skip((filter.PageNumber - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .Select(ue => new UserEventDto
            {
                UserEventId = ue.UserEventId,
                UserId = ue.UserId,
                SportId = ue.SportId,
                EventStatusId = ue.EventStatusId,
                SportExperienceId = ue.SportExperienceId,
                Title = ue.Title,
                Description = ue.Description,
                EventDate = ue.EventDate,
                EventHour = ue.EventHour,
                City = ue.City,
                Country = ue.Country,
                EventImageUrl = ue.EventImageUrl,
                IsFavorite = userFavoriteEventIds.Contains(ue.UserEventId)
            })
            .ToListAsync();
        
        var totalCount = await userEventView.CountAsync();
        
        var pagedResponse = new PagedResponse<UserEventDto>()
        {
            PageNumber = filter.PageNumber,
            PageSize = filter.PageSize,
            TotalCount = totalCount,
            Data = userEvents
        };
        
        return pagedResponse;
    }

    public async Task<List<UserEvent>> GetUserEventsByUserId(string userId)
    {
        var userEvents = await _context.UserEvents.Where(x => x.UserId == userId).ToListAsync();
        return userEvents;
    }
    
    public async Task<UserEventResponseModel> GetEventById(int userEventId, string token)
    {
        var clientUserId = _jwtService.GetUserIdFromJWT(token);
        
        var userEvent = await _context.UserEvents
            .Include(x => x.UserInfo)
            .Include(userEvent => userEvent.UserEventRequest)
            .FirstOrDefaultAsync(x => x.UserEventId == userEventId);
        
        var isFavoriteEvent = await _context.UserFavoriteEvents
            .AnyAsync(x => x.EventId == userEventId);
        
        var userEventResponseModel = new UserEventResponseModel()
        {
            UserEventId = userEvent!.UserEventId,
            UserId = userEvent.UserId,
            SportId = userEvent.SportId,
            EventStatusId = userEvent.EventStatusId,
            SportExperienceId = userEvent.SportExperienceId,
            Title = userEvent.Title,
            Description = userEvent.Description,
            EventDate = userEvent.EventDate,
            EventHour = userEvent.EventHour,
            City = userEvent.City,
            Country = userEvent.Country,
            EventImageUrl = userEvent.EventImageUrl,
            IsFavorite = isFavoriteEvent,
            UserInfo = new UserInfo()
            {
                UserID = userEvent.UserInfo.UserID,
                Name = userEvent.UserInfo.Name,
                Surname = userEvent.UserInfo.Surname,
                UserName = userEvent.UserInfo.UserName,
                ProfileImageUrl = userEvent.UserInfo.ProfileImageUrl,
                Country = userEvent.UserInfo.Country,
                City = userEvent.UserInfo.City,
            },
        };

        var userEventRequest = await _context.UserEventRequests
            .Where(x => x.UserEventId == userEventId && x.GuestUserId == clientUserId)
            .FirstOrDefaultAsync();

        if (userEventRequest != null)
        {
            var userEventRequestView = new UserEventRequestView
            {
                IsJoined = true,
                StatusId = userEventRequest.EventRequestStatusId
            };
            
            userEventResponseModel.UserEventRequestView = userEventRequestView;
        }
        
        var joinedUsers = await _context.UserEventRequests
            .Where(x => x.UserEventId == userEventId && x.EventRequestStatusId == 1)
            .Select(x => new GuestsView
            {
                UserID = x.GuestUserId,
                UserName = x.GuestUserInfo.UserName,
                Name = x.GuestUserInfo.Name,
                Surname = x.GuestUserInfo.Surname,
                ProfileImageUrl = x.GuestUserInfo.ProfileImageUrl
            })
            .ToListAsync();

        if (joinedUsers.Count > 0)
        {
            userEventResponseModel.Guests = joinedUsers;
        }
        
        var userEventLocation = await _context.UserEventLocations
            .FirstOrDefaultAsync(x => x.UserEventId == userEventId);

        if (userEventLocation != null)
        {
            userEventResponseModel.Location = new Location()
            {
                Latitude = userEventLocation.Latitude,
                Longitude = userEventLocation.Longitude
            };
        }

        return userEventResponseModel;
    }
    
    private IQueryable<UserEvent> ApplyFilters(IQueryable<UserEvent> userEvents, EventFilterDto filter)
    {
        if (!string.IsNullOrEmpty(filter.SearchQuery))
        {
            var searchQueryLower = filter.SearchQuery.ToLower();
            userEvents = userEvents.Where(x => 
                x.Title.ToLower().Contains(searchQueryLower) 
                || x.Description.ToLower().Contains(searchQueryLower)
                || x.City.ToLower().Contains(searchQueryLower)
                || x.Country.ToLower().Contains(searchQueryLower));
        }
        
        if (filter.SportId != null)
        {
            userEvents = userEvents.Where(x => x.SportId == filter.SportId);
        }
        
        if (filter.SportExperienceId != null)
        {
            userEvents = userEvents.Where(x => x.SportExperienceId == filter.SportExperienceId);
        }
        
        if (filter.DateFrom != null)
        {
            userEvents = userEvents.Where(x => x.EventDate >= filter.DateFrom);
        }
        
        if (filter.DateTo != null)
        {
            userEvents = userEvents.Where(x => x.EventDate <= filter.DateTo);
        }
        
        return userEvents;
    }

    private async Task SaveEventLocation(double latitude, double longitude, int eventId)
    {
        var userEventLocation = new UserEventLocation()
        {
            UserEventId = eventId,
            Latitude = latitude,
            Longitude = longitude
        };

        _context.UserEventLocations.Add(userEventLocation);
        await _context.SaveChangesAsync();
    }
}