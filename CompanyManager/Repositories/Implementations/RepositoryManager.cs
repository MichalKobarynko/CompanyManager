using CompanyManager.Data;
using CompanyManager.Repositories.Interfaces;

namespace CompanyManager.Repositories.Implementations
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly ApplicationDbContext context;
        private  IProjectRepository projectRepository;
        private  IBoardRepository boardRepository;

        public RepositoryManager(ApplicationDbContext context)
        {
            this.context = context;
        }

        public IProjectRepository Project
        {
            get
            {
                if(projectRepository is null)
                    projectRepository = new ProjectRepository(context);

                return projectRepository;
            }

        }

        public IBoardRepository Board
        {
            get
            {
                if (boardRepository is null)
                    boardRepository = new BoardRepository(context);

                return boardRepository;
            }

        }

        public async Task Save()
        {
            await context.SaveChangesAsync();
        }
    }
}
