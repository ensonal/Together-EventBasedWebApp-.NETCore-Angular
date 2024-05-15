using Together.Core.DTO;
using Together.DataAccess.Entities;

namespace Together.Contracts;

public interface IUserService
{
    Task<bool> Register(UserRegisterDto registerRequest);
    Task<AuthenticationResponseDTO> Login(AuthenticationRequest authenticationRequest, string ipAddress);
    bool IsLoginSuccessful(string? token);
    Task<UserInfo> GetUserInfoAsync(string? token);
    Task<UserInfo> SettingUserInfo(UserInfoDTO dto, string token);
    Task<UserInfo?> ChangeUserProfileImage(string url, string token);
}