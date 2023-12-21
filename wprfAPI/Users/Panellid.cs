using wprfAPI.Users.UserInterfaces;

namespace wprfAPI.Users
{
    public class Panellid : User, IPanellid
    {
        private string PostalCode { get; set;}
        private string PhoneNumber { get; set;}
        private string TypeDisability { get; set; }
        private string Tools { get; set; }
        private string PrefferdResearch { get; set; }
        private string PreferdresearchApproach { get; set; }
        private string CommercialApproach { get; set; }
        private List<DateTime> Availibility { get; set; }
        private string Resources { get; set; }
        private string ConditionOrIllness { get; set; }
        private string TypeOfResearch { get; set; }
        
        
        
        
        

        public Panellid(int id, string name, string lastname, string email, string password, string postalCode, string phoneNumber, string typeDisability, string tools, string preferredResearch, string preferredResearchApproach, string commercialApproach, List<DateTime> availability, string resources, string conditionOrIllness, string typeOfResearch) : base(id, name, lastname, email, password)
        {
            PostalCode = postalCode;
            PhoneNumber = phoneNumber;
            TypeDisability = typeDisability;
            Tools = tools;
            PrefferdResearch = preferredResearch;
            PreferdresearchApproach = preferredResearchApproach;
            CommercialApproach = commercialApproach;
            Availibility = availability;
            Resources = resources;
            ConditionOrIllness = conditionOrIllness;
            TypeOfResearch = typeOfResearch;
        }
    }


}
