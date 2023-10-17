using CompanyManager.Models.DBContext;

namespace CompanyManager.Repositories.Interfaces
{
    public interface IProjectRepository
    {
        Task CreateProject(Project project);
        Task DeleteProject(Project project);
        Task UpdateProject(Project project);
        Task<IEnumerable<Project>> GetAllProjects();
        Task<Project> GetProject(Guid companyId);
    }
}
