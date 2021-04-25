using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.Interface.Repositories
{
    public interface IOrganizationRepository : IRepository<Organization>
    {
        Task<Organization> AddAsyncEntity(Organization organization);
        IQueryable<Organization> GetUserOrganizationsAsQueryable(User user, bool includeBatches);
    }
}
