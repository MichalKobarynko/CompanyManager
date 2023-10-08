using Microsoft.AspNetCore.Identity;

namespace CompanyManager.Models.DBContext
{
    public class User : IdentityUser
    {
        public IEnumerable<Project> Projects { get; set; }

    }
}