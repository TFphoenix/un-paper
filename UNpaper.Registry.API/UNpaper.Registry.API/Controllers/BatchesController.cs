using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web.Resource;
using System;
using System.Threading.Tasks;
using UNpaper.Registry.API.Parameters;
using UNpaper.Registry.Interface.Services;
using UNpaper.Registry.Model.Entities;

namespace UNpaper.Registry.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route(Routes.BatchesRoute)]
    public class BatchesController : ControllerBase
    {
        private readonly ILogger<BatchesController> _logger;
        private readonly IBatchService _batchService;

        public BatchesController(ILogger<BatchesController> logger, IBatchService batchService)
        {
            _logger = logger;
            _batchService = batchService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Batch batch)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.WriteScope);

            try
            {
                var createdBatch = await _batchService.CreateBatch(batch);
                return (IActionResult)Ok(createdBatch);
            }
            catch
            {
                return BadRequest(ResponseMessages.BatchCreateError);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Read(string id, bool? organization)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.ReadScope);

            var batch = organization.HasValue ?
                await _batchService.GetBatch(new Guid(id), organization.Value) :
                await _batchService.GetBatch(new Guid(id));

            return batch != null
                ? (IActionResult)Ok(batch)
                : NotFound(ResponseMessages.BatchNotFoundError);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Batch batch)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.ReadWriteScope);

            try
            {
                var updated = await _batchService.ModifyBatch(batch);
                return updated
                    ? (IActionResult)Ok(new ResponseMessages.Response()
                    {
                        Status = ResponseMessages.ResponseStatus.Success,
                        Message = ResponseMessages.BatchUpdateSuccess
                    })
                    : NotFound(ResponseMessages.BatchNotFoundError);
            }
            catch
            {
                return BadRequest(ResponseMessages.BatchUpdateError);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(Scopes.ReadWriteScope);

            var deleted = await _batchService.DeleteBatch(new Guid(id));

            return deleted ?
                (IActionResult)Ok(new ResponseMessages.Response()
                {
                    Status = ResponseMessages.ResponseStatus.Success,
                    Message = ResponseMessages.BatchDeleteSuccess
                }) :
                NotFound(ResponseMessages.BatchNotFoundError);
        }
    }
}
