using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UNpaper.Registry.Interface.Repositories;
using UNpaper.Registry.Interface.Services;

namespace UNpaper.Registry.Business.Services
{
    public class BatchService : IBatchService
    {
        private readonly IBatchRepository _batchRepository;

        public BatchService(IBatchRepository batchRepository)
        {
            _batchRepository = batchRepository;
        }
    }
}
