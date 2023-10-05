using CompanyManager.Data;
using CompanyManager.Models;
using CompanyManager.Repositories.Base;
using CompanyManager.Repositories.Interfaces;

namespace CompanyManager.Repositories.Implementations
{
    public class ProjectRepository : RepositoryBase<Project>, IProjectRepository
    {
        public ProjectRepository(ApplicationDbContext context) 
            : base(context)
        { }
    }
}
