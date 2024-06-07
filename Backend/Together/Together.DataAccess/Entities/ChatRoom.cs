namespace Together.DataAccess.Entities;

public class ChatRoom
{
    public int ChatRoomId { get; set; }
    public int UserEventId { get; set; }
    public string RoomTitle { get; set; }
    public DateTime CreatedDate { get; set; }
    
    public UserEvent? UserEvent { get; set; }
    public List<ChatMessage>? ChatMessages { get; set; }
    public List<ChatRoomUser>? ChatRoomUsers { get; set; }
}