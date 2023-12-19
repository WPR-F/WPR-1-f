using wprfAPI.Users.UserInterfaces;

namespace wprfAPI.Users
{
    public class User : Iaccount
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public User() { }
        
        public User(int id, string name, string lastname, string email, string password) {

            Id = id;
            Name = name;
            LastName = lastname;
            Email = email;
            Password = password;

        }

        public void Login()
        {
            throw new NotImplementedException();
        }

        public void Logout()
        {
            throw new NotImplementedException();
        }
    }
}
