using CompanyManager.Data;
using CompanyManager.Models;
using CompanyManager.Repositories.Base;
using CompanyManager.Repositories.Interfaces;
using MediatR;

namespace CompanyManager.Repositories.Implementations
{
    public class BoardRepository : RepositoryBase<Board>, IBoardRepository
    {
        public BoardRepository(ApplicationDbContext context)
            : base(context)
        { }
    }
}


