using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.Interface.Repositories
{
    public interface IBatchRepository : IRepository<Batch>
    {
        //Task<Batch> GetAsyncWithOrganization(Guid id);
        Task<Batch> AddAsyncEntity(Batch batch);
        IQueryable<Batch> GetUserBatchesAsQueryable(User user, bool includeBatches);
    }
}
