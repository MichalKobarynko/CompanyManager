namespace CompanyManager.Repositories.Interfaces
{
    public interface IRepositoryManager
    {
        IProjectRepository Project { get; }
        IBoardRepository Board { get; }
        Task Save();
    }
}
