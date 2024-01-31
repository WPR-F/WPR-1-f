using System.ComponentModel.DataAnnotations;

public class Message
{
    [Key]
    public int Id { get; set; }
    public string Sender { get; set; }
    public string Receiver { get; set; }
    public string Text { get; set; }
    public DateTime Date { get; set; }

    public Message(string sender, string receiver, string text, DateTime date)
    {
        Sender = sender;
        Receiver = receiver;
        Text = text;
        Date = date;
    }
    public Message()
    {
        
    }
}