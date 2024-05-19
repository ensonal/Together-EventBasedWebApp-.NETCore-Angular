using Together.Core.DTO.SportDTOs;
using Together.Core.Models.SportModels;
using Together.DataAccess.Entities;

namespace Together.Contracts;

public interface ISportService
{
    Task<List<Sport>> GetAllSports();
    Task<bool> AddUserSport(AddUserSportDto userSport, string token);
    Task<UserSportResponseModel[]> GetAllUserSport(string token);
    Task<UserSportResponseModel[]> GetUserSportsByUserId(string userId);
    Task<bool> DeleteUserSport(int userSportId, string token);
    Task<List<SportExperience>> GetAllSportExperience();
}