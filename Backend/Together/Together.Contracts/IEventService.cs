using Together.Core.DTO.EventDTOs;

namespace Together.Contracts;

public interface IEventService
{
    Task<bool> AddUserEvent(AddUserEventDto request, string token);
}