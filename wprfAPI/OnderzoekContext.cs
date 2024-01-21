using Microsoft.EntityFrameworkCore;

public class OnderzoekContext : DbContext
{
    public OnderzoekContext(DbContextOptions<OnderzoekContext> options)
        : base(options)
    {
    }


    public DbSet<Onderzoek> Onderzoeken { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    
}

    internal void SaveChanges()
    {
        throw new NotImplementedException();
    }
}
