using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Together.DataAccess;

public class TogetherDbContextFactory : IDesignTimeDbContextFactory<TogetherDbContext>
{
    public TogetherDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<TogetherDbContext>();
        optionsBuilder.UseSqlServer("Server=localhost; Database=TogetherDb; uid=SA; pwd=reallyStrongPwd123; TrustServerCertificate=true");

        return new TogetherDbContext(optionsBuilder.Options);
    }
}
