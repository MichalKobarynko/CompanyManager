using CompanyManager.Models.DBContext;

namespace CompanyManager.Repositories.Interfaces
{
    public interface IColumnRepository
    {
        Task CreateColumn(Column column);
    }
}
