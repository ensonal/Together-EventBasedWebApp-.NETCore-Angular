using Together.DataAccess.Entities;

namespace Together.Core.Models.NotificationModels;

public class SendNotificationResponseModel
{
    public UserEvent UserEvent { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    
}