using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models.Domain;
using Models.Requests.AdvertisementDocuments;
using Services;
using Web.Controllers;
using Web.Models;
using Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Web.Api.Controllers
{
    [Route("api/advertisementdocuments")]
    [ApiController]
    public class AdvertisementDocumentApiController : BaseApiController
    {
        private IAdvertisementDocumentService _advertisementDocumentService = null;
        private IAuthenticationService<int> _authService;

        public AdvertisementDocumentApiController(IAdvertisementDocumentService advertisementDocumentService, IAuthenticationService<int> authService, ILogger<AdvertisementDocumentApiController> logger) : base(logger)
        {
            _advertisementDocumentService = advertisementDocumentService;
            _authService = authService;
        }

        [HttpGet("{adId:int}")]
        public ActionResult<ItemResponse<AdvertisementDocument>> Get(int adId)
        {
            try
            {
                AdvertisementDocument model = _advertisementDocumentService.Get(adId);

                if (model == null)
                {
                    return NotFound404(new ErrorResponse("Record not found"));
                }
                else
                {
                    ItemResponse<AdvertisementDocument> response = new ItemResponse<AdvertisementDocument>();
                    response.Item = model;
                    return Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpGet("event/{eventId:int}")]
        public ActionResult<ItemsResponse<AdvertisementDocument>> GetByEventId(int eventId)
        {
            try
            {
                List<AdvertisementDocument> list = _advertisementDocumentService.GetByEventId(eventId);

                if (list == null)
                {
                    return NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemsResponse<AdvertisementDocument> response = new ItemsResponse<AdvertisementDocument>();
                    response.Items = list;
                    return Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpGet("createdby/{createdBy:int}")]
        public ActionResult<ItemsResponse<AdvertisementDocument>> GetByCreatedBy(int createdBy)
        {
            try
            {
                List<AdvertisementDocument> list = _advertisementDocumentService.GetByCreatedBy(createdBy);

                if (list == null)
                {
                    return NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemsResponse<AdvertisementDocument> response = new ItemsResponse<AdvertisementDocument>();
                    response.Items = list;
                    return Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Insert(AdvertisementDocumentAddRequest model)
        {
            try
            {
                int id = _advertisementDocumentService.Insert(model, _authService.GetCurrentUserId());
                ItemResponse<int> response = new ItemResponse<int>();
                response.Item = id;
                return Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            try
            {
                _advertisementDocumentService.Delete(id);
                SuccessResponse response = new SuccessResponse();
                return Ok200(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }
    }
}
