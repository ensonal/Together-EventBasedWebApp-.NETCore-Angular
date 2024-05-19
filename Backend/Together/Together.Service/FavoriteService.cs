using Microsoft.EntityFrameworkCore;
using Together.Contracts;
using Together.DataAccess;
using Together.DataAccess.Entities;

namespace Together.Service;

public class FavoriteService : IFavoriteService
{
    private readonly IJwtService _jwtService;
    private readonly TogetherDbContext _context;
    
    public FavoriteService(IJwtService jwtService, TogetherDbContext context)
    {
        _jwtService = jwtService;
        _context = context;
    }
    
    public async Task<bool> AddFavorite(string token, int eventId)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        var userFavoriteEvent = new UserFavoriteEvent
        {
            UserId = userId,
            EventId = eventId
        };
        
        await _context.UserFavoriteEvents.AddAsync(userFavoriteEvent);
        await _context.SaveChangesAsync();
        
        return true;
    }
    
    public async Task<bool> RemoveFromFavorites(string token, int eventId)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        var favoriteEvent = await _context.UserFavoriteEvents
            .FirstOrDefaultAsync(ufe => ufe.UserId == userId && ufe.EventId == eventId);

        if (favoriteEvent != null)
        {
            _context.UserFavoriteEvents.Remove(favoriteEvent);
            await _context.SaveChangesAsync();
            return true;
        }
        
        return false;
    }
    
    public async Task<List<UserEvent>> GetUserFavoriteEvents(string token)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        return await _context.UserFavoriteEvents
            .Where(ufe => ufe.UserId == userId)
            .Select(ufe => ufe.UserEvent)
            .ToListAsync();
    }
    
}