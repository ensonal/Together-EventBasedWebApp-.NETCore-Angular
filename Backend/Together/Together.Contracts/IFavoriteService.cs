using Together.DataAccess.Entities;

namespace Together.Contracts;

public interface IFavoriteService
{
    Task<bool> AddFavorite(string token, int eventId);
    Task<List<UserEvent>> GetUserFavoriteEvents(string token);
    Task<bool> RemoveFromFavorites(string token, int eventId);
}