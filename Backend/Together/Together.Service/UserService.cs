using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Together.Contracts;
using Together.Core.DTO;
using Together.Core.Models.Common;
using Together.DataAccess;
using Together.DataAccess.Entities;

namespace Together.Service;

public class UserService : IUserService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly IJwtService _jwtService;
    private readonly TogetherDbContext _context;

    public UserService(
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        IJwtService jwtService,
        TogetherDbContext context)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtService = jwtService;
        _context = context;
    }

    public async Task<bool> Register(UserRegisterDto registerRequest)
    {
        var existUser = await _userManager.FindByEmailAsync(registerRequest.Email);
        if (existUser != null)
            throw new Exception($"Username '{registerRequest.Email}' is already taken.");

        if (!IsValidEmail(registerRequest.Email) || !IsValidatePassword(registerRequest.Password))
        {
            throw new ExceptionResponseModel("Invalid email or passwprd !");
        }

        var user = new IdentityUser()
        {
            Email = registerRequest.Email,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = registerRequest.UserName
        };
        
        var result = await _userManager.CreateAsync(user, registerRequest.Password);
        if (!result.Succeeded)
        {
            return false;
        }

        await _userManager.AddToRoleAsync(user, "Basic");
        await initalLevel(user.Id);

        var userInfo = new UserInfo
        {
            UserName = registerRequest.UserName,
            Email = registerRequest.Email,
            UserID = user.Id,
            Role = "Basic",
            Name = registerRequest.Name,
            Surname = registerRequest.Surname,
            PhoneNumber = registerRequest.PhoneNumber,
            BirthDay = registerRequest.BirthDay,
            Country = registerRequest.Country,
            City = registerRequest.City
        };

        await _context.UserInfo.AddAsync(userInfo);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<AuthenticationResponseDTO> Login(AuthenticationRequest authenticationRequest, string ipAddress)
    {
        var user = await _userManager.FindByEmailAsync(authenticationRequest.Email);

        if (user == null)
        {
            throw new Exception($"User not be found");
        }

        var result = await _signInManager.PasswordSignInAsync(user.UserName, authenticationRequest.Password, false,
            lockoutOnFailure: false);

        if (!result.Succeeded)
        {
            throw new Exception($"Invalid Credentials for '{authenticationRequest.Email}'.");
        }

        var userClaims = await _userManager.GetClaimsAsync(user);
        var roles = await _userManager.GetRolesAsync(user);
        var token = _jwtService.GetToken(userClaims, roles, user);

        var dto = new AuthenticationResponseDTO
        {
            Id = user.Id,
            JWToken = new JwtSecurityTokenHandler().WriteToken(token),
            Email = user.Email,
            UserName = user.UserName
        };

        var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);

        dto.Roles = rolesList.ToList();
        dto.IsVerified = user.EmailConfirmed;

        var refreshToken = GenerateRefreshToken(ipAddress);
        dto.RefreshToken = refreshToken.Token;

        return dto;
    }
    
    public bool IsLoginSuccessful(string? token)
    {
        Console.WriteLine("TOKEN : ", token);
            
        if(string.IsNullOrEmpty(token))
        {
            return false;
        }

        if (string.IsNullOrEmpty(token)) {

            Console.WriteLine("null or empty", string.IsNullOrEmpty(token));

            return false; }

        var validateToken = _jwtService.ValidateToken(token);

        if (validateToken == null)
            return false;
        return true;
    }
    
    public async Task<UserInfo> GetUserInfoAsync(string? token)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        var user = await _userManager.FindByIdAsync(userId);
        var userEmail = await _userManager.GetEmailAsync(user);
        var userInfo = await _context.UserInfo.Where(x => x.UserID == userId).FirstOrDefaultAsync();
        
        if (userInfo == null)
            throw new ExceptionResponseModel("User Not Found");
        
        userInfo.Email = userEmail;
        await _context.SaveChangesAsync();
        
        return (userInfo);
    }

    private static bool IsValidEmail(string email)
    {
        var trimmedEmail = email.Trim();

        if (trimmedEmail.EndsWith("."))
        {
            return false;
        }

        try
        {
            var mailAddress = new MailAddress(trimmedEmail);
            return true;
        }
        catch
        {
            return false;
        }
    }

    private static bool IsValidatePassword(string passWord)
    {
        if (string.IsNullOrEmpty(passWord) || passWord.Length < 8)
            return false;

        var validConditions = 0;

        if (passWord.Any(c => c is >= 'a' and <= 'z'))
        {
            validConditions++;
        }

        if (passWord.Any(c => c is >= 'A' and <= 'Z'))
        {
            validConditions++;
        }

        if (validConditions == 1) return false;

        if (passWord.Any(c => c is >= '0' and <= '9'))
        {
            validConditions++;
        }

        if (validConditions == 2) return false;
        return true;
    }

    private RefreshToken GenerateRefreshToken(string ipAddress)
    {
        return new RefreshToken
        {
            Token = RandomTokenString(),
            Expires = DateTime.UtcNow.AddDays(7),
            Created = DateTime.UtcNow,
            CreatedByIp = ipAddress
        };
    }

    private string RandomTokenString()
    {
        var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
        var randomBytes = new byte[40];

        rngCryptoServiceProvider.GetBytes(randomBytes);

        return BitConverter.ToString(randomBytes).Replace("-", "");
    }

    private async Task<bool> initalLevel(string userID)
    {
        var userLevel = new UserAccountLevel();
        userLevel.AccountLevelId = 1;
        userLevel.UserId = userID;
        _context.UserAccountLevels.Add(userLevel);

        await _context.SaveChangesAsync();
        return true;
    }
}