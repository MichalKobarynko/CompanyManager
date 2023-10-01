using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CompanyManager.Data.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(
                new IdentityRole
                {
                    Name = "viewer",
                    NormalizedName = "VIEWER"
                },
                new IdentityRole
                {
                    Name = "user",
                    NormalizedName = "USER",
                },
                new IdentityRole
                {
                    Name = "admin",
                    NormalizedName = "ADMIN",
                });
        }
    }
}
