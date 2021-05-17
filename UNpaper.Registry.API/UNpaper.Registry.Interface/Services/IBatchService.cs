using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.Interface.Services
{
    public interface IBatchService
    {
        Task<List<Batch>> GetUserBatches(ClaimsPrincipal userClaims, bool includeBatches = false);
        Task<Batch> GetBatch(Guid id, bool includeOrganization = false);
        Task<Batch> CreateBatch(Batch batch);
        Task<bool> ModifyBatch(Batch batch);
        Task<bool> DeleteBatch(Guid id);
    }
}
