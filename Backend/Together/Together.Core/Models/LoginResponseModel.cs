using Together.Core.DTO;
using Together.Core.Models.Common;

namespace Together.Core.Models;

public class LoginResponseModel : BaseResponseModel
{
    public AuthenticationResponseDTO User { get; set; }
    public LoginResponseModel(AuthenticationResponseDTO user)
    {
        User = user;
    }
            
}