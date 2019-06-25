using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Users;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface IUserService
    {
        Task<bool> LogInAsync(UserLoginRequest loginModel);

        Task<bool> LogInTest(string email, string password, int id, string[] roles = null);
        
        AuthUser GetAuth(UserLoginRequest loginModel);

        Paged<AuthUser> Get(int pageIndex, int pageSize, string userRole = null);

        List<User> Get();

        User Get(int id);

        User Get(string email);

        UserProfile ForgotPassword(string email);

        bool EmailExists(string email);

        int Insert(UserAddRequest model);

        void Update(UserUpdateRequest model);

        void Update(int userId, int status);

        void Update(UserUpdatePasswordRequest model);

        void UpdateConfirmStatus(int id);

        void ConfirmAccount(int userId);

        bool CheckProfileStatus(int id);

        void UpdateProfileStatus(int id);

        void Delete(int id);
    }
}