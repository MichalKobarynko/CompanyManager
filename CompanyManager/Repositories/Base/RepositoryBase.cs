using CompanyManager.Data;

namespace CompanyManager.Repositories.Base
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected ApplicationDbContext context;

        public RepositoryBase(ApplicationDbContext context)
        {
            this.context = context;
        }

        public IQueryable<T> FindByCondition(System.Linq.Expressions.Expression<Func<T, bool>> expression)
        {
            return context.Set<T>()
                .Where(expression);
        }

        public IQueryable<T> FindAll()
        {
            return context.Set<T>();
        }

        public void Create(T entity)
        {
            context.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            context.Set<T>().Remove(entity);
        }

        public void Update(T entity)
        {
            context.Set<T>().Update(entity);
        }
    }
}
