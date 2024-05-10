using Together.DataAccess.Entities;

namespace Together.Contracts;

public interface ISportService
{
    Task<List<Sport>> GetAllSports();
    Task<Sport?> GetSportById(int sportId);
}