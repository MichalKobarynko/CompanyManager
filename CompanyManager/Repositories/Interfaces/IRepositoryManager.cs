namespace CompanyManager.Repositories.Interfaces
{
    public interface IRepositoryManager
    {
        IProjectRepository Project { get; }
        IBoardRepository Board { get; }
        IColumnRepository Column { get; }   
        Task Save();
    }
}
