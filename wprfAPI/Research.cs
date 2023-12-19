using wprfAPI;

namespace wprfAPI
{
    public class Research {
        public int id { get; set; }
        public string title { get; set; }
        public string summary { get; set; }
        public string researcher { get; set; }
        public string researchLocation { get; set; }
        public string compensation { get; set; }
        public string category { get; set; }
        public Boolean isActivated { get; set; }

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
