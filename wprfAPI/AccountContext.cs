using Microsoft.EntityFrameworkCore;
using wprfAPI.Users;

public class AccountContext : DbContext 
{

public AccountContext(DbContextOptions<AccountContext> options)
        : base(options)
    {
    }

    public DbSet<User> Accounts { get; set; }

}