using CompanyManager.Models;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using CompanyManager.Data.Configurations;

namespace CompanyManager.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<User>
    {
        public DbSet<Project> Projects { get; set; }    
        public DbSet<Board> Boards { get; set; }    


        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new RoleConfiguration());
        }
    }
}