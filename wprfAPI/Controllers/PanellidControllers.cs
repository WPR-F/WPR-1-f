using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wprfAPI.Users;

namespace wprfAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PanellidController : ControllerBase
    {
        
        private readonly UserManager<User> _userManager;

          public PanellidController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }


        [HttpPost]
        [Route("createPanellid")]
        public async Task<ActionResult<User>> CreatePanellid(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.AddToRoleAsync(user, "Panellid");

            if (result.Succeeded)
            {
                return Ok();
            }
            
            return BadRequest(result.Errors);
        }

        [HttpGet]
        [Route("getPanellidUsers")]
        public async Task<ActionResult<IEnumerable<User>>> GetPanellidUsers()
        {
            var users = await _userManager.GetUsersInRoleAsync("Panellid");

            if (users == null || !users.Any())
            {
                return NotFound();
            }

            return Ok(users);
        }

    }
}