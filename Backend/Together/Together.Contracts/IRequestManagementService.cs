using Together.Core.Models.RequestManagementModels;
using Together.DataAccess.Entities;

namespace Together.Contracts;

public interface IRequestManagementService
{
    Task<bool> SendRequestToJoinEvent(JoinEventRequestModel request, string token);
    Task<bool> AcceptRequestToJoinEvent(int requestId, string token);
    Task<bool> RejectRequestToJoinEvent(int requestId, string token);
    Task<List<IncomingRequestResponseModel>> GetIncomingRequest(string token);
    Task<List<UserEventRequest>> GetOutgoingRequest(string token);
}