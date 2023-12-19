using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.Transactions;
using wprfAPI.Users.UserInterfaces;

namespace wprfAPI.Users
{
    public class Admin: User, IAdmin
    {

        public Admin(int id, string name, string lastname, string email, string password) : base(id, name, lastname, email, password)   
        {

        }
        public void Viewlogs()
        {

        }
        public void EditUser()
        {

        }
        public void EditData()
        {

        }
    }
}
