namespace Together.Core.Models.ChatModels;

public class RoomDetailsResponseModel
{
    public int ChatRoomId { get; set; }
    public int UserEventId { get; set; }
    public string RoomTitle { get; set; }
    public DateTime CreatedDate { get; set; }
    public List<ChatRoomUsersView> ChatRoomUsers { get; set; }
    public EventDetailView EventDetails { get; set; }
}