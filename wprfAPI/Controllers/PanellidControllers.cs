using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using wprfAPI.Users;

namespace wprfAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PanellidController : ControllerBase
    {
        
        private readonly UserManager<User> _userManager;
        private readonly AccountContext _context;

        public PanellidController(UserManager<User> userManager, AccountContext context)
        {
            _userManager = userManager;
            _context = context;
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

        [HttpPost]
        [Route("UpdatePanellidInfo")]
        public async Task<ActionResult<Panellid>> UpdatePanellidInfo([FromBody] Panellid panellidInfo)
        {
            var existingPanellid = await _context.Panelleden.FindAsync(panellidInfo.UserId);

            if (existingPanellid != null)
            {
                // Update existing Panellid
                existingPanellid.postalCode = panellidInfo.postalCode;
                existingPanellid.phoneNumber = panellidInfo.phoneNumber;
                existingPanellid.DisabilityType = panellidInfo.DisabilityType;
                existingPanellid.Tools = panellidInfo.Tools;
                existingPanellid.condition = panellidInfo.condition;
                existingPanellid.ResearchType = panellidInfo.ResearchType;
                existingPanellid.PreferdresearchApproach = panellidInfo.PreferdresearchApproach;
                existingPanellid.CommercialApproach = panellidInfo.CommercialApproach;
                existingPanellid.Availibility = panellidInfo.Availibility;
            }
            else
            {
                // Add new Panellid
                _context.Panelleden.Add(panellidInfo);
            }

            await _context.SaveChangesAsync();

            return Ok(panellidInfo);
        }    

        
        [HttpPost]
        [Route("checkPanellid")]
        public async Task<ActionResult<User>> checkPanellid(CheckPanellidRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return NotFound();
            }

             var isAdmin = await _userManager.IsInRoleAsync(user, "Panellid");

                if (!isAdmin)
                {
                    return Forbid();
                }

            return Ok();
        }   
                
    } 
}