using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<IdentityUser> _userManager;

        public AccountsController(AccountContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<User>> PostAccount(User account)
        {
            var result = await _userManager.CreateAsync(account, account.PasswordHash);

            if (result.Succeeded)
            {
                return CreatedAtAction("GetUser", new { id = account.Id }, account);
            }

            return BadRequest(result.Errors);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user as User;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<User>> Login(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return NotFound();
            }

            var isCorrectPassword = await _userManager.CheckPasswordAsync(user, model.Password);

            if (!isCorrectPassword)
            {
                return Unauthorized();
            }

            return Ok(user);
        }
    }
}