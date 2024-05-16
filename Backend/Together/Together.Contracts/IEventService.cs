using Together.Core.DTO.EventDTOs;
using Together.DataAccess.Entities;

namespace Together.Contracts;

public interface IEventService
{
    Task<bool> AddUserEvent(AddUserEventDto request, string token);
    Task<bool> DeleteUserEvent(int userEventId);
    Task<List<UserEvent>> GetUserEvents(string token);
}