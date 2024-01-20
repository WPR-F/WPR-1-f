using System.ComponentModel.DataAnnotations;
public class Onderzoek {

    [Key]
    public int OnderzoekId { get; set; }
    public string titel { get; set; }
    public string typeBeperking { get; set; }
    public string postcode { get; set; }
    public int leeftijd { get; set; }

    public Onderzoek(string titel, string typeBeperking, string postcode, int leeftijd) {

        this.titel = titel;
        this.typeBeperking = typeBeperking;
        this.postcode = postcode;
        this.leeftijd = leeftijd;
    }
}
