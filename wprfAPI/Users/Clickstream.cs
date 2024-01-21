using System.ComponentModel.DataAnnotations;
public class Clickstream
{
    [Key]
    public int id { get; set; }
    public string Event { get; set; } 
    public string ElementId { get; set; }       
    public string PaginaUrl { get; set; }    
    public DateTime Tijd { get; set; }  

    

   
}


