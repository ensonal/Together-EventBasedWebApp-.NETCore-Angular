using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Together.Contracts;
using Together.Core.Models.FilterModels;
using Together.DataAccess;

namespace Together.Service;

public class FilterService : IFilterService
{
    private readonly TogetherDbContext _context;
    
    public FilterService(TogetherDbContext context)
    {
        _context = context;
    }
    
    public async Task<IEnumerable<SportFilterModel>> GetSportFilters()
    {
        var events = await _context.UserEvents
            .Select(
                x => new SportFilterModel
                {
                    SportId = x.SportId,
                    Name = x.Sport.Name,
                })
            .Distinct()
            .ToListAsync();
        
        return events;
    }
    
    public async Task<IEnumerable<SportExperienceFilterModel>> GetSportExperienceFilters()
    {
        var events = await _context.UserEvents
            .Select(
                x => new SportExperienceFilterModel
                {
                    SportExperienceId = x.SportExperienceId,
                    Level = x.SportExperience.Level
                })
            .Distinct()
            .ToListAsync();
        
        return events;
    }
}