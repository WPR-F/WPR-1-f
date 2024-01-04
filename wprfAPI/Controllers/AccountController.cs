using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wprfAPI.Users;


namespace wprfAPI.Controllers
{
[Route("api/[controller]")]
[ApiController]
public class AccountsController : ControllerBase
{
    private readonly AccountContext _context;

    public AccountsController(AccountContext context)
    {
        _context = context;
    }

    [HttpPost]
    [Route("register")]
    public async Task<ActionResult<User>> PostAccount(User account)
    {
        _context.Accounts.Add(account);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetAccount", new { id = account.Id }, account);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetAccount(int id)
    {
        var account = await _context.Accounts.FindAsync(id);

        if (account == null)
        {
            return NotFound();
        }

        return account;
    }


    [HttpPost]
    [Route("login")]
    public async Task<ActionResult<User>> Login(LoginModel model)
    {
        var user = await _context.Accounts.FirstOrDefaultAsync(u => u.Email == model.Email);

        if (user == null || user.Password != model.Password) // replace this with actual password hashing and comparison
        {
            return NotFound();
        }

        return Ok(user);
    }

    }
}