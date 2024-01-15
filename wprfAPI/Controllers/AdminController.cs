using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wprfAPI.Users;

namespace wprfAPI.Controllers
{
    
    
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AccountContext _context;
        private readonly UserManager<User> _userManager;

        [HttpPost]
        [Route("createAdmin")]
        public async Task<ActionResult<Admin>> CreateAdmin(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }


            //here it adds the user to the role as dotnet wants it
            var result = await _userManager.AddToRoleAsync(user, "Admin");


            //here is how i thought it would work
            // Admin admin = new Admin(id);

            if (result.Succeeded)
            {
                return Ok();
            }
            
            return BadRequest(result.Errors);
            
        }
    }
}
