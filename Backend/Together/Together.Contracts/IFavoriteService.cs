using Together.Core.DTO.EventDTOs;
using Together.DataAccess.Entities;

namespace Together.Contracts;

public interface IFavoriteService
{
    Task<bool> AddFavorite(string token, int eventId);
    Task<List<UserEventDto>> GetUserFavoriteEvents(string token);
    Task<bool> RemoveFromFavorites(string token, int eventId);
}