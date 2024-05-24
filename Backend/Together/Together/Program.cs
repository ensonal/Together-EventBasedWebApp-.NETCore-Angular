using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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
builder.Services.AddCors(options =>
{
    options.AddPolicy("devCorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000") // React uygulamanızın URL'si
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials(); // SignalR için gerekli
    });
});

builder.Services.AddSignalR();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("devCorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<NotificationHub>("/notificationHub");
});

app.Run();