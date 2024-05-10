using Together.Core.Models.Common;
using Together.DataAccess.Entities;

namespace Together.Core.Models;

public class UserInfoResponseModel : BaseResponseModel
{
    public UserInfo UserInfo { get; set; }
    public UserInfoResponseModel(UserInfo userInfo, bool succeeded, string message, int statusCode)
    {
        UserInfo = userInfo;
        Succeeded = succeeded;
        Message = message;
        StatusCode = statusCode;
    }
}