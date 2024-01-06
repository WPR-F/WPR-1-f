using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using wprfAPI.Users;

public class AccountContext : IdentityDbContext<IdentityUser>
{

public AccountContext(DbContextOptions<AccountContext> options)
        : base(options)
    {
    }

  

}