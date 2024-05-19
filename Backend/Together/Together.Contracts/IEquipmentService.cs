using Together.Core.DTO.EquipmentDTOs;
using Together.DataAccess.Entities;

namespace Together.Contracts;

public interface IEquipmentService
{
    Task<bool> AddUserEquipment(AddEquipmentDto request, string token);
    Task<List<UserEquipment>> GetUserEquipments(string token);
    Task<bool> DeleteUserEquipment(int userEquipmentId, string token);
    Task<List<UserEquipment>> GetUserEquipmentsByUserId(string userId);
}