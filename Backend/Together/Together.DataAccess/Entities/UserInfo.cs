namespace Together.DataAccess.Entities;

public class UserInfo
{
    public string? UserID { get; set; }
    public string? UserName { get; set; }
    public string? Name { get; set; }
    public string? Surname { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public DateTime? BirthDay { get; set; }
    public string? Role { get; set; }
    public DateTime? MembershipDate { get; set; }
    public string? ProfileImageUrl { get; set; }
    
    public virtual ICollection<UserEvent> UserEvents { get; set; }
    public virtual ICollection<UserFavoriteEvent> UserFavoriteEvents { get; set; }
    public virtual ICollection<UserEventRequest> UserEventRequests { get; set; }
}