namespace Together.Core.Models.ChatModels;

public class ChatMessageResponseModel
{
    public int ChatMessageId { get; set; }
    public int ChatRoomId { get; set; }
    public string SenderId { get; set; }
    public string? Content { get; set; }
    public DateTime SentDate { get; set; }
    public bool IsMine { get; set; }
    public MessageUserView? MessageUserView { get; set; }
}