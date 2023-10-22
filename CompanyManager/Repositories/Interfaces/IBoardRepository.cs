using CompanyManager.Models.DBContext;

namespace CompanyManager.Repositories.Interfaces
{
    public interface IBoardRepository
    {
        Task CreateBoard(Board board);
        Task DeleteBoard(Board board);
        Task UpdateBoard(Board board);
        Task<IEnumerable<Board>> GetAllBoardsByProjectID(Guid projectID);
        Task<Project> GetBoard(Guid boardID);
    }
}
