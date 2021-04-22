using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UNpaper.Registry.Interface.Repositories
{
    public interface IRepository<T>
    {
        int Add(T model);
        Task<int> AddAsync(T model);
        IQueryable<T> GetAsQueryable();
        Task<T> GetAsync(Guid id);
    }
}
