using System.Text.Json.Serialization;

namespace Together.Core.DTO;

public class AuthenticationResponseDTO
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public bool IsVerified { get; set; }
    public List<string> Roles { get; set; }
    public string JWToken { get; set; }
    [JsonIgnore]
    public string RefreshToken { get; set; }
}