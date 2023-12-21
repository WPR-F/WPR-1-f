using wprfAPI;
using wprfAPI.Users;

namespace wprfAPI
{
    public class Research {
        private int ResearchId { get; set; }
        private string ResearchTitle { get; set; }
        private string ResearchDescription { get; set; }
        private Company Company { get; set; }
        private string Compensation { get; set; }
        private Boolean Approved { get; set; }

        public Research() { }
        
        public Research(int id, string title, string summary, string researcher, string researchLocation, string compensation, string category, Boolean isActivated) {

            id = id;
            title = title;
            summary = summary;
            researcher = researcher;
            researchLocation = researchLocation;
            compensation = compensation;
            category = category;
            isActivated = isActivated;

        }

        public void Message() {
            
        }
    }
}