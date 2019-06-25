using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain;
using Models.Requests;
using Models.Requests.Users;
using Services;
using Web.Controllers;
using Web.Models.Responses;

namespace Web.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserApiController : BaseApiController
    {
        private ILogger _logger = null;
        private IUserService _userService = null;
        private IAuthenticationService<int> _authService = null;
        
        // Other co-workers' content below
        private IEmailService _emailService = null;
        private ITokenService _tokenService = null;


        public UserApiController(IUserService userService, IEmailService emailService, ITokenService tokenService, ILogger<UserApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _logger = logger;
            _userService = userService;

            // Other co-workers' content below
            _emailService = emailService;
            _tokenService = tokenService;
            _authService = authService;
        }

        [HttpPost("login"), AllowAnonymous]
        public async Task<ActionResult<SuccessResponse>> Login(UserLoginRequest loginModel)
        {
            try
            {
                User model = _userService.Get(loginModel.Email);

                if (model != null && !model.IsConfirmed)
                {
                    return StatusCode(401, new ErrorResponse("Please confirm your account"));
                }
                else
                {
                    bool loggedIn = await _userService.LogInAsync(loginModel);

                    if (loggedIn)
                    {
                        SuccessResponse response = new SuccessResponse();
                        return Ok200(response);
                    }
                    else
                    {
                        return StatusCode(401, new ErrorResponse("Invalid credentials"));
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpGet("current")]
        public ActionResult<ItemResponse<IUserAuthData>> GetCurrent()
        {
            IUserAuthData user = _authService.GetCurrentUser();
            ItemResponse<IUserAuthData> response = new ItemResponse<IUserAuthData>();
            response.Item = user;

            if (response.Item == null)
            {
                return NotFound404(new ErrorResponse("Not Logged In"));
            }
            else
            {
                return Ok200(response);
            }
        }

        [HttpGet("logout")]
        public async Task<ActionResult<SuccessResponse>> LogoutAsync()
        {
            await _authService.LogOutAsync();
            SuccessResponse response = new SuccessResponse();
            return Ok200(response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<AuthUser>>> Get(int pageIndex, int pageSize, string userRole = null)
        {
            try
            {
                Paged<AuthUser> paged = _userService.Get(pageIndex, pageSize, userRole);

                if (paged == null)
                {
                    return NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<AuthUser>> response = new ItemResponse<Paged<AuthUser>>();
                    response.Item = paged;
                    return Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpGet]
        public ActionResult<ItemsResponse<User>> Get()
        {
            try
            {
                List<User> list = _userService.Get();

                if (list == null)
                {
                    return NotFound404(new ErrorResponse("Records not found"));
                }
                else
                {
                    ItemsResponse<User> response = new ItemsResponse<User>();
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

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<User>> Get(int id)
        {
            try
            {
                User model = _userService.Get(id);

                if (model == null)
                {
                    return NotFound404(new ErrorResponse("Record not found"));
                }
                else
                {
                    ItemResponse<User> response = new ItemResponse<User>();
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

        // Other co-workers' content

        [HttpGet("email/exists")]
        public ActionResult<ItemResponse<bool>> EmailExists(string email)
        {
            try
            {
                bool emailExists = _userService.EmailExists(email);

                if (emailExists)
                {
                    ItemResponse<bool> response = new ItemResponse<bool>();
                    response.Item = emailExists;
                    return Ok200(response);
                }
                else
                {
                    return NotFound404(new ErrorResponse("Record not found"));
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        // Other co-workers' content

        [HttpPost("register"), AllowAnonymous]
        public async Task<ActionResult<ItemResponse<int>>> Insert(UserAddRequest model)
        {
            string token = "";
            int tokenTypeId = 1;
            try
            {
                ItemResponse<int> response = new ItemResponse<int>();
                response.Item = _userService.Insert(model);
                if (response.Item > 0)
                {
                    // Other co-workers' content
                    token = _tokenService.CreateToken(response.Item, tokenTypeId);
                    await _emailService.ProcessRequest(model.Email, token);
                    return Created201(response);
                }
                else
                {
                    return StatusCode(400, new ErrorResponse("Register Fails"));
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        // Other co-workers' content

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(UserUpdateRequest model, int id)
        {
            try
            {
                if (model.Id == id)
                {
                    _userService.Update(model);
                    SuccessResponse response = new SuccessResponse();
                    return Ok200(response);
                }
                else
                {
                    return StatusCode(400, new ErrorResponse("Bad Request: Body Id does not match Entity"));
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpPut("{userId:int}/{status:int}")]
        public ActionResult<SuccessResponse> Update(int userId, int status)
        {
            try
            {
                _userService.Update(userId, status);
                SuccessResponse response = new SuccessResponse();
                return Ok200(response);

            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpPut("{id:int}/password"), AllowAnonymous]
        public ActionResult<SuccessResponse> Update(UserUpdatePasswordRequest model)
        {
            try
            {
                _userService.Update(model);
                SuccessResponse response = new SuccessResponse();
                return Ok200(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        // Other co-workers' content

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            try
            {
                _userService.Delete(id);
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