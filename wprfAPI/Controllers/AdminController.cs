using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using wprfAPI.Users;

namespace wprfAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {

        private readonly UserManager<User> _userManager;

        public AdminController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        [Route("createAdmin")]
        public async Task<ActionResult<User>> CreateAdmin(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            //here it adds the user to the role as dotnet wants it
            var result = await _userManager.AddToRoleAsync(user, "Admin");

            if (result.Succeeded)
            {
                return Ok();
            }
            
            return BadRequest(result.Errors);
            
        }

        [HttpPost]
        [Route("checkAdmin")]
        public async Task<ActionResult<User>> CheckAdmin(CheckAdminRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return NotFound();
            }

             var isAdmin = await _userManager.IsInRoleAsync(user, "Admin");

                if (!isAdmin)
                {
                    return Forbid();
                }

            return Ok();
        }
    }
}
