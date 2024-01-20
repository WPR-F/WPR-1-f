using wprfAPI.Users.UserInterfaces;

namespace wprfAPI.Users
{
    public class Company: User, ICompany
    {
        private string Name { get; set; }
        private string Location { get; set; }
        private string WebsiteLink { get; set; }

        public Company(int id, string name, string lastname, string email, string password, string location, string websiteLink) 
        {
            Name = name;
            Location = location;
            WebsiteLink = websiteLink;
        }
        public void plaatsOnderzoek(string titel, string typeBeperking, string postcode, int leeftijd) {

            Onderzoek onderzoek = new Onderzoek(titel, typeBeperking, postcode, leeftijd);

        }
    }
}
