using Together.Contracts;
using Together.DependencyInjection;
using Together.Service;

var builder = WebApplication.CreateBuilder(args);

ConfigurationManager configuration = builder.Configuration;

builder.Services.AddHttpClient();
builder.Services.AddHttpContextAccessor();

builder.Services.RegisterServices(configuration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(p => p.AddPolicy("devCorsPolicy", 
    builder => {
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}
    ));

var app = builder.Build();

app.UseCors("devCorsPolicy");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();