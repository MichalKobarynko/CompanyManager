using CompanyManager.Data;
using CompanyManager.Infrastructure.Extensions;
using CompanyManager.Infrastructure.Services;
using CompanyManager.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using CompanyManager.Infrastructure.Extensions;
using CompanyManager.Infrastructure.Services;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.
var connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

builder.Services.ConfigureDBContext(connectionString)
    .ConfigureIdentity()
    .ConfigureCors()
    .ConfigureIISIntegration()
    .ConfigureLogger()
    .ConfigureJWT(configuration)
    .ConfigureEmail(configuration)
    .ConfigureAppServices()
    .AddSwaggerGen()
    .ConfigureRepositoryManager()
    .AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));



builder.Services.AddScoped<JwtHandler>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.All
});

app.UseCors("CorsePolicy");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapRazorPages();
app.MapFallbackToFile("index.html");
app.ApplyMigrations();
app.Run();
