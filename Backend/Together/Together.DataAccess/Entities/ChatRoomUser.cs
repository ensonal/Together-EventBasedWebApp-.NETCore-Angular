namespace Together.DataAccess.Entities;

public class ChatRoomUser
{
    public int ChatRoomUserId { get; set; }
    public int ChatRoomId { get; set; }
    public string UserId { get; set; }
    public DateTime JoinedDate { get; set; }
    
    public ChatRoom ChatRoom { get; set; }
    public UserInfo UserInfo { get; set; }
}