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
        private readonly UserManager<User> _userManager;

        public AccountsController(AccountContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<User>> PostAccount(RegisterModel model)
            {
            var result = await _userManager.CreateAsync(model.User, model.Password);

            if (result.Succeeded)
            {
                return CreatedAtAction("GetUser", new { id = model.User.Id }, model.User);
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