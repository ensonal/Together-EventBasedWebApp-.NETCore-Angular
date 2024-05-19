using Together.Core.DTO.EventDTOs;
using Together.Core.Models.EventModels;
using Together.Core.Models.FilterModels;
using Together.DataAccess.Entities;

namespace Together.Contracts;

public interface IEventService
{
    Task<bool> AddUserEvent(AddUserEventDto request, string token);
    Task<bool> DeleteUserEvent(int userEventId);
    Task<List<UserEvent>> GetUserEvents(string token);
    Task<List<UserEvent>> GetAllEvents(EventFilterDto filter);
    Task<UserEventResponseModel> GetEventById(int userEventId);
    Task<List<UserEvent>> GetUserEventsByUserId(string userId);
}