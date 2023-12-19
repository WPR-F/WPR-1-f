using Microsoft.AspNetCore.Mvc;
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

}
}