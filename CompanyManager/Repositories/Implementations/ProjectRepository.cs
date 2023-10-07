using CompanyManager.Data;
using CompanyManager.Models.DBContext;
using CompanyManager.Repositories.Base;
using CompanyManager.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace CompanyManager.Repositories.Implementations
{
    public class ProjectRepository : RepositoryBase<Project>, IProjectRepository
    {
        public ProjectRepository(ApplicationDbContext context) 
            : base(context)
        { }

        public async Task CreateProject(Project project)
        {
            Create(project);
        }

        public async Task DeleteProject(Project project)
        {
            Delete(project);
        }

        public async Task UpdateProject(Project project)
        {
            Update(project);
        }

        public async Task<IEnumerable<Project>> GetAllProjects()
        {
            return await FindAll()
                .OrderByDescending(p => p.CreateAt)
                .Where(p => p.IsDeleted == false)
                .ToListAsync();
        }

        public async Task<Project> GetProject(Guid companyId)
        {
            return await FindByCondition(p => p.ID.Equals(companyId))
                .SingleOrDefaultAsync();
        }
    }
}
