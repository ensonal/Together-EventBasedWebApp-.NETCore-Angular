using Microsoft.EntityFrameworkCore;
using Together.Contracts;
using Together.DataAccess;
using Together.DataAccess.Entities;

namespace Together.Service;

public class SportService : ISportService
{
    private readonly TogetherDbContext _context;
    
    public SportService(TogetherDbContext context)
    {
        _context = context;
    }
    
    public async Task<List<Sport>> GetAllSports()
    {
        return await _context.Sports.ToListAsync();
    }
    
    public async Task<Sport?> GetSportById(int sportId)
    {
        var sport = await _context.Sports.FirstOrDefaultAsync(x => x.SportId == sportId);
        return sport;
    }
    
}