using Microsoft.AspNetCore.Hosting;
using Data;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Requests.Users;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Services
{
    public class UserService : IUserService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;
 
        public UserService(IAuthenticationService<int> authSerice, IDataProvider dataProvider)
        {
            _authenticationService = authSerice;
            _dataProvider = dataProvider;
        }

        public async Task<bool> LogInAsync(UserLoginRequest loginModel)
        {
            bool isSuccessful = false;

            AuthUser authModel = GetAuth(loginModel);
            if (authModel != null)
            {
                isSuccessful = await LogIn(authModel);
            }

            return isSuccessful;
        }

        public async Task<bool> LogIn(AuthUser model)
        {
            bool isSuccessful = false;

            if (model != null)
            {
                string name = model.Email;
                if (model.FirstName != null && model.LastName != null)
                {
                    name = model.FirstName + " " + model.LastName;
                }

                IUserAuthData response = new UserBase
                {
                    Id = model.Id,
                    Name = name,
                    Roles = model.Roles.Select(role => role.Name),
                    TenantId = "API Live"
                };
                isSuccessful = true;

                Claim fullName = new Claim("CustomClaim", "Sabio");
                await _authenticationService.LogInAsync(response, new Claim[] { fullName });
            }

            return isSuccessful;
        }

        public AuthUser GetAuth(UserLoginRequest loginModel)
        {
            Dictionary<int, List<Role>> userRoles = null;
            AuthUser authModel = null;
            string passwordHash = "";

            _dataProvider.ExecuteCmd(
                "dbo.Users_GetAuth",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Email", loginModel.Email);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index;

                    switch (set)
                    {
                        case 0:
                            index = 0;
                            int userId = reader.GetSafeInt32(index++);
                            int roleId = reader.GetSafeInt32(index++);
                            string roleName = reader.GetSafeString(index++);

                            if (userRoles == null)
                            {
                                userRoles = new Dictionary<int, List<Role>>();
                            }

                            Role role = new Role(id: roleId, name: roleName);
                            if (userRoles.ContainsKey(userId))
                            {
                                userRoles[userId].Add(role);
                            }
                            else
                            {
                                userRoles.Add(userId, new List<Role> { role });
                            }
                            break;

                        case 1:
                            passwordHash = reader.GetSafeString(4);
                            bool isValid = BCrypt.BCryptHelper.CheckPassword(loginModel.Password, passwordHash);

                            if (isValid)
                            {
                                authModel = new AuthUser();
                                index = 0;

                                authModel.Id = reader.GetSafeInt32(index++);
                                authModel.FirstName = reader.GetSafeString(index++);
                                authModel.LastName = reader.GetSafeString(index++);
                                authModel.Email = reader.GetSafeString(index++);

                                if (userRoles.ContainsKey(authModel.Id))
                                {
                                    authModel.Roles = userRoles[authModel.Id];
                                }
                            }
                            break;
                    }
                }
            );
            return authModel;
        }

        public Paged<AuthUser> Get(int pageIndex, int pageSize, string userRole = null)
        {
            Dictionary<int, List<Role>> userRoles = null;
            List<AuthUser> authUserList = null;
            Paged<AuthUser> pagedResult = null;
            int totalCount = 0;

            if (userRole == null)
            {
                _dataProvider.ExecuteCmd(
                    "dbo.Users_GetAllPaginated",
                    inputParamMapper: delegate (SqlParameterCollection paramCol)
                    {
                        paramCol.AddWithValue("@PageIndex", pageIndex);
                        paramCol.AddWithValue("@PageSize", pageSize);
                    },
                    singleRecordMapper: delegate (IDataReader reader, short set)
                    {
                        AuthUser model = MapAuthUser(reader);

                        if (totalCount <= 0)
                        {
                            totalCount = reader.GetSafeInt32(8);
                        }

                        if (authUserList == null)
                        {
                            authUserList = new List<AuthUser>();
                        }
                        authUserList.Add(model);
                    }
                );
            }
            else
            {
                _dataProvider.ExecuteCmd(
                    "dbo.Users_GetPaginatedByUserRole",
                    inputParamMapper: delegate (SqlParameterCollection paramCol)
                    {
                        paramCol.AddWithValue("@UserRole", userRole);
                        paramCol.AddWithValue("@PageIndex", pageIndex);
                        paramCol.AddWithValue("@PageSize", pageSize);
                    },
                    singleRecordMapper: delegate (IDataReader reader, short set)
                    {
                        switch (set)
                        {
                            case 0:
                                int index = 0;
                                int userId = reader.GetSafeInt32(index++);
                                int roleId = reader.GetSafeInt32(index++);
                                string roleName = reader.GetSafeString(index++);

                                if (userRoles == null)
                                {
                                    userRoles = new Dictionary<int, List<Role>>();
                                }

                                Role role = new Role(id: roleId, name: roleName);
                                if (userRoles.ContainsKey(userId))
                                {
                                    userRoles[userId].Add(role);
                                }
                                else
                                {
                                    userRoles.Add(userId, new List<Role> { role });
                                }
                                break;

                            case 1:
                                AuthUser model = MapAuthUser(reader);

                                if (userRoles.ContainsKey(model.Id))
                                {
                                    model.Roles = userRoles[model.Id];
                                }

                                if (totalCount <= 0)
                                {
                                    totalCount = reader.GetSafeInt32(8);
                                }

                                if (authUserList == null)
                                {
                                    authUserList = new List<AuthUser>();
                                }
                                authUserList.Add(model);
                                break;
                        }
                    }
                );
            }

            if (authUserList != null)
            {
                pagedResult = new Paged<AuthUser>(authUserList, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public List<User> Get()
        {
            List<User> userList = null;

            _dataProvider.ExecuteCmd(
                "dbo.Users_GetAll",
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    User model = MapUser(reader);

                    if (userList == null)
                    {
                        userList = new List<User>();
                    }

                    userList.Add(model);
                }
            );
            return userList;
        }

        public User Get(int id)
        {
            User model = null;

            _dataProvider.ExecuteCmd(
                "dbo.Users_GetById",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    model = MapUser(reader);
                }
            );
            return model;
        }

        // Other co-workers' content

        public User MapUser(IDataReader reader)
        {
            User model = new User();
            int index = 0;

            model.Id = reader.GetSafeInt32(index++);
            model.Email = reader.GetSafeString(index++);
            model.IsConfirmed = reader.GetSafeBool(index++);
            model.Status = reader.GetSafeInt32(index++);
            model.DateCreated = reader.GetSafeDateTime(index++);
            model.DateModified = reader.GetSafeDateTime(index++);

            return model;
        }

        public AuthUser MapAuthUser(IDataReader reader)
        {
            AuthUser model = new AuthUser();
            int index = 0;

            model.Id = reader.GetSafeInt32(index++);
            model.FirstName = reader.GetSafeString(index++);
            model.LastName = reader.GetSafeString(index++);
            model.Email = reader.GetSafeString(index++);
            model.IsConfirmed = reader.GetSafeBool(index++);
            model.Status = reader.GetSafeInt32(index++);
            model.DateCreated = reader.GetSafeDateTime(index++);
            model.DateModified = reader.GetSafeDateTime(index++);

            return model;
        }

        public bool EmailExists(string email)
        {
            bool emailExists = false;

            _dataProvider.ExecuteCmd(
                "dbo.Users_EmailExists",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Email", email);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    emailExists = reader.GetSafeBool(0);
                }
            );
            return emailExists;
        }

        public string HashPassword(string password)
        {
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);
            return hashedPassword;
        }

        public int Insert(UserAddRequest model)
        {
            int id = 0;
            string hashedPassword = HashPassword(model.Password);

            _dataProvider.ExecuteNonQuery(
                "dbo.Users_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Email", model.Email);
                    paramCol.AddWithValue("@PasswordHash", hashedPassword);
                    paramCol.AddWithValue("@IsConfirmed", model.IsConfirmed);
                    paramCol.AddWithValue("@Status", model.Status);
                    paramCol.AddWithValue("@RoleName", model.Role);

                    SqlParameter paramId = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    paramId.Direction = System.Data.ParameterDirection.Output;
                    paramCol.Add(paramId);
                },
                returnParameters: delegate (SqlParameterCollection param)
                {
                    Int32.TryParse(param["@Id"].Value.ToString(), out id);
                }
            );

            return id;
        }

        public void Update(UserUpdateRequest model)
        {
            string hashedPassword = HashPassword(model.Password);

            _dataProvider.ExecuteNonQuery(
                "dbo.Users_Update",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", model.Id);
                    paramCol.AddWithValue("@Email", model.Email);
                    paramCol.AddWithValue("@PasswordHash", hashedPassword);
                    paramCol.AddWithValue("@IsConfirmed", model.IsConfirmed);
                    paramCol.AddWithValue("@Status", model.Status);
                }
            );
        }

        public void Update(int userId, int status)
        {
            _dataProvider.ExecuteNonQuery(
                "dbo.Users_UpdateStatus",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", userId);
                    paramCol.AddWithValue("@Status", status);
                }
            );
        }

        public void Update(UserUpdatePasswordRequest model)
        {
            string hashedPassword = HashPassword(model.Password);

            _dataProvider.ExecuteNonQuery(
                "dbo.Users_UpdatePassword",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", model.Id);
                    paramCol.AddWithValue("@PasswordHash", hashedPassword);
                }
            );
        }

        // Other co-workers' content

        public void Delete(int id)
        {
            _dataProvider.ExecuteNonQuery(
                "dbo.Users_Delete",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                }
            );
        }
    }
}