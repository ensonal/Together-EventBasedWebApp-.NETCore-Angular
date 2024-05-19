using Together.Core.Models.FilterModels;

namespace Together.Contracts;

public interface IFilterService
{
    Task<IEnumerable<SportFilterModel>> GetSportFilters();
    Task<IEnumerable<SportExperienceFilterModel>> GetSportExperienceFilters();
}