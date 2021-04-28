using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UNpaper.Registry.Interface.Repositories;
using UNpaper.Registry.Interface.Services;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.Business.Services
{
    public class BatchService : IBatchService
    {
        private readonly IBatchRepository _batchRepository;

        private readonly IUserService _userService;

        public BatchService(IBatchRepository batchRepository, IUserService userService)
        {
            _batchRepository = batchRepository;
            _userService = userService;
        }

        public async Task<List<Batch>> GetUserBatches(ClaimsPrincipal userClaims, bool includeBatch = false)
        {
            var user = await _userService.GetLoggedInUser(userClaims);
            return _batchRepository.GetUserBatchesAsQueryable(user, includeBatch).ToList();
        }

        public async Task<Batch> GetBatch(Guid id)
        {
            return await _batchRepository.GetAsync(id);
        }

        public async Task<Batch> CreateBatch(Batch batch)
        {
            var createdBatch = await _batchRepository.AddAsyncEntity(batch);

            // For avoinding depenency cycle exception
            //createdBatch.BatchUsers = new List<BatchUser>();

            return createdBatch;
        }

        public async Task<bool> ModifyBatch(Batch batch)
        {
            var oldBatch = await _batchRepository.GetAsync(batch.Id);

            if (oldBatch == null)
            {
                return false;
            }

            oldBatch.Name = batch.Name;
            oldBatch.Description = batch.Description;
            oldBatch.OrganizationId = batch.OrganizationId;

            return await _batchRepository.SaveAsync() > 0;
        }

        public async Task<bool> DeleteBatch(Guid id)
        {
            var batch = await _batchRepository.GetAsync(id);

            if (batch == null)
            {
                return false;
            }

            batch.IsDeleted = true;

            return await _batchRepository.SaveAsync() > 0;
        }
    }
}
