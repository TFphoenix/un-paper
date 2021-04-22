using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.Interface.Repositories
{
    public interface IOrganizationRepository: IRepository
    {
        int Add(Organization organization);
        Task<int> AddAsync(Organization organization);
        IQueryable<Organization> GetAsQueryable();
        Task<Organization> GetAsync(Guid id);
    }
}
