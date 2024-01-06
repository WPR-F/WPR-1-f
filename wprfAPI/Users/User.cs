using Microsoft.AspNetCore.Identity;
using System;

namespace wprfAPI.Users
{
    public class User : IdentityUser
    {
        public string LastName { get; set; }

        public User() { }
        
        public User(string userName, string lastName, string email, string passwordHash)
        {
            UserName = userName;
            LastName = lastName;
            Email = email;
            PasswordHash = passwordHash;
        }
    }
}