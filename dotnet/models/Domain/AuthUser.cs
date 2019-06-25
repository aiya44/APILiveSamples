using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class AuthUser : User
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Role> Roles { get; set; }
    }
}