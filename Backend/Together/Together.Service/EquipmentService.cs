using Microsoft.EntityFrameworkCore;
using Together.Contracts;
using Together.Core.DTO.EquipmentDTOs;
using Together.DataAccess;
using Together.DataAccess.Entities;

namespace Together.Service;

public class EquipmentService : IEquipmentService
{
    private readonly IJwtService _jwtService;
    private readonly TogetherDbContext _context;
    
    public EquipmentService(IJwtService jwtService, TogetherDbContext context)
    {
        _jwtService = jwtService;
        _context = context;
    }
    
    public async Task<bool> AddUserEquipment(AddEquipmentDto request, string token)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        var equipment = new UserEquipment()
        { 
            UserId = userId,
            SportId = request.SportId, 
            EquipmentName = request.EquipmentName, 
            ImageUrl = request.ImageUrl
        };
        
        await _context.UserEquipments.AddAsync(equipment);
        await _context.SaveChangesAsync();
        
        return true;
    }
    
    public async Task<List<UserEquipment>> GetUserEquipments(string token)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);
        var equipments = await _context.UserEquipments.Where(x => x.UserId == userId).ToListAsync();
        
        return equipments;
    }
    
}