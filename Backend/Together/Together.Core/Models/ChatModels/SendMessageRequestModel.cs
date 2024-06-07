namespace Together.Core.Models.ChatModels;

public class SendMessageRequestModel
{
    public int ChatRoomId { get; set; }
    public string? Content { get; set; }
}