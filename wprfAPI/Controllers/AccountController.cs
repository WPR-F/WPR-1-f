using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
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
        /*
        [HttpPost]
        [Route("getemail")]
        public async Task<ActionResult<string>> GetEmail([FromForm]string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if(user == null){
                return BadRequest();
            }

            return Ok(user.Email);
        }
        */

        /*
        [HttpPost]
        [Route("getemail")]
        public async Task<ActionResult<string>> GetEmail([FromForm]string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            
            return Ok(user.Email);
        }
        */
        [HttpPost]
        [Route("getemail")]
        public async Task<ActionResult<string>> GetEmail([FromForm]string email)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                {
                    return BadRequest("Email is required.");
                }

                var user = await _userManager.FindByEmailAsync(email);

                if (user != null)
                {
                    return Ok(user.Email);
                }

                return NotFound("User does not exist");
                System.Diagnostics.Debug.WriteLine("This is a log");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
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
            
            {

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