using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wprfAPI.Users;

namespace wprfAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
       // private readonly AccountContext _context;
        private readonly UserManager<User> _userManager;

        public CompanyController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        [Route("createCompany")]
        public async Task<ActionResult<User>> CreateCompany(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.AddToRoleAsync(user, "Company");

            if (result.Succeeded)
            {
                return Ok();
            }
            
            return BadRequest(result.Errors);
        }

        [HttpGet]
        [Route("getCompanyUsers")]
        public async Task<ActionResult<IEnumerable<User>>> GetCompanyUsers()
        {
            var users = await _userManager.GetUsersInRoleAsync("Company");

            if (users == null || !users.Any())
            {
                return NotFound();
            }

            return Ok(users);
        }

    }
}