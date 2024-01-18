using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using wprfAPI.Users;

// Database context class die IdentityDbContext overerft.
// Wordt gebruikt om te communiceren met de database met behulp van Entity Framework Core en ASP.NET Core Identity.
// <User> voegt onze User toe aan de IdentityUser class van Microsoft.AspNetCore.Identity (voegt momenteel alleen een LastName property toe)
public class AccountContext : IdentityDbContext<User>
{

    public AccountContext(DbContextOptions<AccountContext> options)
            : base(options)
        {
        }

    // parameterloze constructor voor moq
    public AccountContext()
    {
    }

<<<<<<< HEAD
=======
     public DbSet<Panellid> Panelleden { get; set; }

>>>>>>> origin/Develop
}