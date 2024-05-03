using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace Together.Contracts;

public interface IJwtService
{
    JwtSecurityToken GetToken(IList<Claim> userClaim, IList<string> roles, IdentityUser users);
    JwtSecurityToken? ValidateToken(string token);
    IEnumerable<Claim> GetTokenClaims(string tokenStr);
    string GetUserIdFromJWT(string token);
    string GetUserName(string token);
    string GetUserRole(string token);
}