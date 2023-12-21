using wprfAPI.Users.UserInterfaces;

namespace wprfAPI.Users
{
    public class Company: User, ICompany
    {
        //private int CompanyId {get; set;} erft van user
        //private string Name { get; set; } erft van user
        private Adress Adress { get; set; }
        //private string Email { get; set;} erft van user
        private string Description { get; set;}
        //private string Password { get; set;} erft van user
        private string WebsiteLink { get; set; }

        public Company(int id, string name, string location, string email, string password, string description, string websiteLink) : base(id, name, email, password)
        {
            //CompanyId = id;
            //Name = name;
            Location = location;
            //Email = email;
            Description = description;
            Password = password;
            WebsiteLink = websiteLink;
        }
    }
}
