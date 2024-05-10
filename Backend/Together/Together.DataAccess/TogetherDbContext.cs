using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Together.DataAccess.Entities;

namespace Together.DataAccess;

public class TogetherDbContext : IdentityDbContext<IdentityUser>
{
    public TogetherDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<UserInfo> UserInfo { get; set; }
    public DbSet<UserAccountLevel> UserAccountLevels { get; set; }
    public DbSet<UserEquipment> UserEquipments { get; set; }
    public DbSet<Sport> Sports { get; set; }
    

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserInfo>(entity =>
        {
            entity.HasKey(c => c.UserID);
            entity.ToTable(name: "UserInfo");
        });
        
        modelBuilder.Entity<UserAccountLevel>(entity =>
        {
            entity.HasKey(c => c.UserId);
            entity.ToTable(name: "UserAccountLevel");
        });
    }
}