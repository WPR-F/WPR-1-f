using Microsoft.EntityFrameworkCore;

public class ClickstreamContext : DbContext
{
    public ClickstreamContext(DbContextOptions<ClickstreamContext> options)
        : base(options)
    {
    }

    public DbSet<Clickstream> Clickstream { get; set; }
}