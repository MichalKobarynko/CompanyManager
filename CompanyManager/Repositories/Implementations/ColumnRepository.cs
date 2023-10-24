using CompanyManager.Data;
using CompanyManager.Models.DBContext;
using CompanyManager.Repositories.Base;
using CompanyManager.Repositories.Interfaces;

namespace CompanyManager.Repositories.Implementations
{
    public class ColumnRepository : RepositoryBase<Column>, IColumnRepository
    {
        public ColumnRepository(ApplicationDbContext context) 
            : base(context)
        {

        }

        public async Task CreateColumn(Column column)
        {
            Create(column);
        }
    }
}
