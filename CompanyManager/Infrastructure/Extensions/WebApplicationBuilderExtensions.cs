using Microsoft.EntityFrameworkCore;
using CompanyManager.Data;

namespace CompanyManager.Infrastructure.Extensions
{
    public static class WebApplicationBuilderExtensions
    {
        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using var service = app.ApplicationServices.CreateScope();

            var context = service.ServiceProvider.GetService<ApplicationDbContext>();
            context?.Database.Migrate();
        }
    }
}
