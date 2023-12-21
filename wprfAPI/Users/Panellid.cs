using wprfAPI.Users.UserInterfaces;

namespace wprfAPI.Users
{
    public class Panellid : User, IPanellid
    {
        private string TypeDisability { get; set; }
        private string Tools { get; set; }
        private string Handicap { get; set; }
        private string PrefferdResearch { get; set; }
        private string PreferdresearchApproach { get; set; }
        private string CommercialApproach { get; set; }
        private List<DateTime> Availibility { get; set; }

        public Panellid(int id, string name, string lastname, string email, string password, string typeDisability, string tools, string handicap, string preferredResearch, string preferredResearchApproach, string commercialApproach, List<DateTime> availability) : base(id, name, lastname, email, password)
        {
            TypeDisability = typeDisability;
            Tools = tools;
            Handicap = handicap;
            PrefferdResearch = preferredResearch;
            PreferdresearchApproach = preferredResearchApproach;
            CommercialApproach = commercialApproach;
            Availibility = availability;
        }
    }


}
