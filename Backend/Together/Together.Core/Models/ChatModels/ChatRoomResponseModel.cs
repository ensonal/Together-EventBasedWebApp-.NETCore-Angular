namespace Together.Core.Models.ChatModels;

public class ChatRoomResponseModel
{
    public int ChatRoomId { get; set; }
    public int UserEventId { get; set; }
    public string RoomTitle { get; set; }
    public DateTime CreatedDate { get; set; }
    public ChatRoomEventView? UserEventView { get; set; }
    
}