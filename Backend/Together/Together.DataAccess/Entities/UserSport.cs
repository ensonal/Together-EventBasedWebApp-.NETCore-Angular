namespace Together.DataAccess.Entities;

public class UserSport
{
    public int UserSportId { get; set; }
    public string UserId { get; set; }
    public int SportId { get; set; }
    public int SportExperienceId { get; set; }
    
    public virtual Sport Sport { get; set; }
    public virtual SportExperience SportExperience { get; set; }
}