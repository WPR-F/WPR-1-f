using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using Microsoft.VisualBasic;
public class Onderzoek {

    [Key]
    public int id { get; set; }
    public string titel { get; set; }
    public string beschrijving { get; set; }
    public string locatie { get; set; }
    public string datum { get; set; }
    public string uitvoerder { get; set; }
    public string beloning { get; set; }
    public string categorie { get; set; }
    public int aanmeldingen { get; set; }
    public string typeBeperking { get; set; }
    public string postcode { get; set; }
    public int leeftijd { get; set; }
    public Onderzoek(string titel, string beschrijving, string locatie, string datum, string uitvoerder, string beloning, string categorie, int aanmeldingen, string typeBeperking, string postcode, int leeftijd) {

        this.titel = titel;
        this.beschrijving = beschrijving;
        this.locatie = locatie;
        this.datum = datum;
        this.datum = datum;
        this.uitvoerder = uitvoerder;
        this.beloning = beloning;
        this.categorie = categorie;
        this.aanmeldingen = aanmeldingen;
        this.typeBeperking = typeBeperking;
        this.postcode = postcode;
        this.leeftijd = leeftijd;           
    }
    public Onderzoek() {
        
    }
}
