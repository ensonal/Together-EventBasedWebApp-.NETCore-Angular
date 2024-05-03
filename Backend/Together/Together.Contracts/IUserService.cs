using Together.Core.DTO;

namespace Together.Contracts;

public interface IUserService
{
    Task<bool> Register(UserRegisterDto registerRequest);
    Task<AuthenticationResponseDTO> Login(AuthenticationRequest authenticationRequest, string ipAddress);
}