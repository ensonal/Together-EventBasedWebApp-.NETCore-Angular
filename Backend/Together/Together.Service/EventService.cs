using Microsoft.EntityFrameworkCore;
using Together.Contracts;
using Together.Core.DTO.EventDTOs;
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
            Location = request.Location,
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
    
    public async Task<List<UserEvent>> GetAllEvents()
    {
        var userEvents = await _context.UserEvents.ToListAsync();
        return userEvents;
    }
    
}