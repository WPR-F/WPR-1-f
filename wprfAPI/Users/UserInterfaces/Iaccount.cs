using Microsoft.AspNetCore.Identity.Data;

namespace wprfAPI.Users.UserInterfaces
{
    public interface Iaccount
    {
        public int Id { get; set; }

        public void Login();
        public void Logout();
    }
}
