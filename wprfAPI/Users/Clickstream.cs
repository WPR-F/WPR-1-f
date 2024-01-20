using System.ComponentModel.DataAnnotations;
public class Clickstream
{
    [Key]
    public int ClickstreamId { get; set; }
    public string GebeurtenisType { get; set; } 
    public string ElementId { get; set; }       
    public string PaginaUrl { get; set; }    
    public DateTime Tijd { get; set; }  

    

   
}


