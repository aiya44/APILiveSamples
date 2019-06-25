using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain;
using Models.Requests;
using Services;
using Web.Controllers;
using Web.Models.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Models.Requests.Events;

namespace Web.Api.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventApiController : BaseApiController
    {
        private IEventService _eventService = null;
        private IAuthenticationService<int> _authService;

        public EventApiController(IEventService eventService, IAuthenticationService<int> authService, ILogger<EventApiController> logger) : base(logger)
        {
            _eventService = eventService;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Insert(EventAddRequest model)
        {

            try
            {
                int id = _eventService.Insert(model, _authService.GetCurrentUserId());
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

        // Other co-workers' content
    }
}