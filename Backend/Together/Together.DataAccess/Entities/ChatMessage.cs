namespace Together.DataAccess.Entities;

public class ChatMessage
{
    public int ChatMessageId { get; set; }
    public int ChatRoomId { get; set; }
    public string SenderId { get; set; }
    public string? Content { get; set; }
    public DateTime SentDate { get; set; }
    
    public ChatRoom ChatRoom { get; set; }
    public UserInfo Sender { get; set; }
}