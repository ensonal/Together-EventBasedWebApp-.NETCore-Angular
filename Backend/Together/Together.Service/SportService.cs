using Microsoft.EntityFrameworkCore;
using Together.Contracts;
using Together.Core.DTO.SportDTOs;
using Together.Core.Models.SportModels;
using Together.DataAccess;
using Together.DataAccess.Entities;

namespace Together.Service;

public class SportService : ISportService
{
    private readonly TogetherDbContext _context;
    private readonly IJwtService _jwtService;
    
    public SportService(TogetherDbContext context, IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }
    
    public async Task<List<Sport>> GetAllSports()
    {
        return await _context.Sports.ToListAsync();
    }
    
    public async Task<bool> AddUserSport(AddUserSportDto request, string token)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        var userSport = new UserSport()
        {
            SportExperienceId = request.SportExperienceId,
            SportId = request.SportId,
            UserId = userId
        };
        
        await _context.UserSports.AddAsync(userSport);
        await _context.SaveChangesAsync();
        
        return true;
    }
    
    public async Task<UserSportResponseModel[]> GetAllUserSport(string token)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
    
        var userSports = await _context.UserSports
            .Include(x => x.Sport)
            .Include(x => x.SportExperience)
            .Where(x => x.UserId == userId)
            .ToListAsync();

        var userSportResponseModels = new List<UserSportResponseModel>();

        foreach (var userSport in userSports)
        {
            var sport = await GetSportById(userSport.SportId);
            var sportExperience = await GetSportExperienceById(userSport.SportExperienceId);

            var userSportResponseModel = new UserSportResponseModel
            {
                UserSportId = userSport.UserSportId,
                UserId = userSport.UserId,
                ImageUrl = sport!.ImageUrl,
                SportName = sport.Name,
                Level = sportExperience!.Level,
            };

            userSportResponseModels.Add(userSportResponseModel);
        }

        return userSportResponseModels.ToArray();
    }

    public async Task<UserSportResponseModel[]> GetUserSportsByUserId(string userId)
    {
        var userSports = await _context.UserSports
            .Include(x => x.Sport)
            .Include(x => x.SportExperience)
            .Where(x => x.UserId == userId)
            .ToListAsync();

        var userSportResponseModels = new List<UserSportResponseModel>();

        foreach (var userSport in userSports)
        {
            var sport = await GetSportById(userSport.SportId);
            var sportExperience = await GetSportExperienceById(userSport.SportExperienceId);

            var userSportResponseModel = new UserSportResponseModel
            {
                UserSportId = userSport.UserSportId,
                UserId = userSport.UserId,
                ImageUrl = sport!.ImageUrl,
                SportName = sport.Name,
                Level = sportExperience!.Level,
            };

            userSportResponseModels.Add(userSportResponseModel);
        }
        
        return userSportResponseModels.ToArray();
    }

    public async Task<bool> DeleteUserSport(int userSportId, string token)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        var userSport = await _context.UserSports.FirstOrDefaultAsync(x => x.UserSportId == userSportId && x.UserId == userId);
        
        if (userSport == null)
        {
            return false;
        }
        
        _context.UserSports.Remove(userSport);
        await _context.SaveChangesAsync();
        
        return true;
    }
    
    public async Task<List<SportExperience>> GetAllSportExperience()
    {
        return await _context.SportExperience.ToListAsync();
    }
    
    private async Task<SportExperience?> GetSportExperienceById(int sportExperienceId)
    {
        var sportExperience = await _context.SportExperience.FirstOrDefaultAsync(x => x.SportExperienceId == sportExperienceId);
        return sportExperience;
    }
    
    private async Task<Sport?> GetSportById(int sportId)
    {
        var sport = await _context.Sports.FirstOrDefaultAsync(x => x.SportId == sportId);
        return sport;
    }
    
}