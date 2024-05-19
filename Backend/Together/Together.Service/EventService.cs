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
    
    public EventService(TogetherDbContext context, IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
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
        
        await _context.UserEvents.AddAsync(userEvent);
        await _context.SaveChangesAsync();
        
        return true;
    }
    
    public async Task<bool> DeleteUserEvent(int userEventId)
    {
        var userEvent = await _context.UserEvents.FindAsync(userEventId);
        if (userEvent == null)
        {
            return false;
        }
        
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
    
    public async Task<PagedResponse<UserEvent>> GetAllEvents(EventFilterDto filter)
    {
        var userEventView = _context.UserEvents.AsQueryable();
        userEventView = ApplyFilters(userEventView, filter);
        
        var userEvents = await userEventView
            .Skip((filter.PageNumber - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .ToListAsync();
        
        var totalCount = await userEventView.CountAsync();
        
        var pagedResponse = new PagedResponse<UserEvent>()
        {
            PageNumber = filter.PageNumber,
            PageSize = filter.PageSize,
            TotalCount = totalCount,
            Data = userEvents
        };
        
        return pagedResponse;
    }
    
    private IQueryable<UserEvent> ApplyFilters(IQueryable<UserEvent> userEvents, EventFilterDto filter)
    {
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

    public async Task<List<UserEvent>> GetUserEventsByUserId(string userId)
    {
        var userEvents = await _context.UserEvents.Where(x => x.UserId == userId).ToListAsync();
        return userEvents;
    }
    
    public async Task<UserEventResponseModel> GetEventById(int userEventId)
    {
        var userEvent = await _context.UserEvents
            .Include(x => x.UserInfo)
            .FirstOrDefaultAsync(x => x.UserEventId == userEventId);
        
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
            UserInfo = new UserInfo()
            {
                UserID = userEvent.UserInfo.UserID,
                Name = userEvent.UserInfo.Name,
                Surname = userEvent.UserInfo.Surname,
                UserName = userEvent.UserInfo.UserName,
                ProfileImageUrl = userEvent.UserInfo.ProfileImageUrl,
                Country = userEvent.UserInfo.Country,
                City = userEvent.UserInfo.City,
            }
        };
        
        return userEventResponseModel;
    }
    
}