using Microsoft.AspNetCore.Mvc;
using Together.Contracts;

namespace Together.Controllers;

[ApiController]
[Route("[controller]")]
public class FavoriteController : ControllerBase
{
    private readonly IFavoriteService _favoriteService;
    
    public FavoriteController(IFavoriteService favoriteService)
    {
        _favoriteService = favoriteService;
    }
    
    [HttpPost]
    [Route("AddFavorite/{eventId}")]
    public async Task<IActionResult> AddFavorite(int eventId)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        var result = await _favoriteService.AddFavorite(token, eventId);
        return Ok(result);
    }
    
    [HttpGet]
    [Route("GetUserFavoriteEvents")]
    public async Task<IActionResult> GetUserFavoriteEvents()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        var result = await _favoriteService.GetUserFavoriteEvents(token);
        return Ok(result);
    }
    
    [HttpPost]
    [Route("RemoveFromFavorites/{eventId}")]
    public async Task<IActionResult> RemoveFromFavorites(int eventId)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        var result = await _favoriteService.RemoveFromFavorites(token, eventId);
        return Ok(result);
    }
    
    
    
}