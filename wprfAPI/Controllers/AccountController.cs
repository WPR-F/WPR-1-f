using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using wprfAPI.Users;

namespace wprfAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly AccountContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public AccountsController(AccountContext context, UserManager<User> userManager, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _configuration = configuration;
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
        [HttpPost]
        [Route("google")]
        public async Task<ActionResult<User>> PostGoogleAccount(GoogleModel model)
            {
            var result = await _userManager.CreateAsync(model.User);

            if (result.Succeeded)
            {
                return CreatedAtAction("GetUser", new { id = model.User.Id }, model.User);
            }

            return BadRequest(result.Errors);
        }
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
        [HttpGet("{getbyemail}")]
        public async Task<ActionResult<User>> GetUserByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [HttpPost]
        [Route("postbyemail")]
        public async Task<ActionResult<User>> PostUserByEmail([FromForm]string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

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
            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);

            if (user == null)
            {
                return NotFound();
            
            }

            var isCorrectPassword = await _userManager.CheckPasswordAsync(user, model.Password);

            if (!isCorrectPassword)
            {
                return Unauthorized();
            }

            var token = await GenerateJwtToken(model.Email);
            return Ok(new { user, token });
        }

        [HttpGet]
        [Route("getAccounts")]
        public IActionResult GetAccounts()
        {
            var users = _context.Users.Select(u => u).ToList();

            if (users == null) 
            {
                return NotFound();
            }
            return Ok(users);
        }
        
    [NonAction]
   public async Task<string> GenerateJwtToken(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        var roles = await _userManager.GetRolesAsync(user);

        var claims = new List<Claim>
        {
            new Claim("Id", user.Id),
            new Claim("UserName", user.UserName),
            new Claim(ClaimTypes.Email, user.Email),
        };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(Convert.ToDouble(_configuration["Jwt:ExpirationHours"])),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
        
    }

    
}