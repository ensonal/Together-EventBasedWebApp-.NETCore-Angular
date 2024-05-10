using Together.Core.DTO.EquipmentDTOs;

namespace Together.Contracts;

public interface IEquipmentService
{
    Task<bool> AddUserEquipment(AddEquipmentDto request, string token);
}