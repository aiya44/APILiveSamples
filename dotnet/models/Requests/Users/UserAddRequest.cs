using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests.Users
{
    public class UserAddRequest
    {
        [Required, StringLength(255), EmailAddress(ErrorMessage = "The email address is not valid")]
        public string Email { get; set; }

        [Required, StringLength(128), RegularExpression(@"^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*_-]).{8,}$", ErrorMessage = "Password must contain at least One lowercase character, One uppercase character, One special character, One digit, and be at least 8 characters in length")]
        public string Password { get; set; }
        
        [Required, Compare("Password", ErrorMessage = "Passwords must match")]
        public string PasswordConfirm { get; set; }

        [Required]
        public bool? IsConfirmed { get; set; }

        [Required, Range(1, UInt32.MaxValue)]
        public int Status { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
