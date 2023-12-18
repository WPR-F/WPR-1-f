using wprfAPI.Users.UserInterfaces;

namespace wprfAPI.Users
{
    public class User : Iaccount
    {
        private int Id { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        private string Name { get; set; }
        private string LastName { get; set; }
        private string Email { get; set; }
        private string Password { get; set; }
        
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
