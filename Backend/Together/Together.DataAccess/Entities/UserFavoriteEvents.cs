using Microsoft.AspNetCore.Identity;

namespace Together.DataAccess.Entities;

public class UserFavoriteEvent
{
    public int UserFavoriteEventId { get; set; }
    public string UserId { get; set; }
    public int EventId { get; set; }
    public virtual UserInfo UserInfo { get; set; }
    public virtual UserEvent UserEvent { get; set; }
}
