using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.Transactions;
using wprfAPI.Users.UserInterfaces;

namespace wprfAPI.Users
{
    
    public class Admin: IAdmin
    {
        public string Id { get; set; }

        public Admin(string id)  
        {
            id = Id;
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
