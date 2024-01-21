using Microsoft.AspNetCore.Identity;
using System;

namespace wprfAPI.Users
{
    //we maken nu gebruik van de IdentityUser class van Microsoft.AspNetCore.Identity inplaats van onze eigen Iuser interface
    // Moet nog veranderd worden in UML
    // Mogelijk zijn overige User classes ook niet meer nodig omdat we rollen kunnen toevoegen aan de IdentityUser class (moet ik nog uitzoeken)
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