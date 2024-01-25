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
        private readonly IPanellidManager _panellidManager;
        private readonly AccountContext _context;

        public PanellidController(UserManager<User> userManager, AccountContext context, IPanellidManager panellidManager)
        {
            _userManager = userManager;
            _panellidManager = panellidManager;
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
        public async Task<ActionResult<dynamic>> getPanellidUsers()
        {
            var panellid = await _panellidManager.GetAllAsync();

            if (!panellid.Any()) // Check if the list is empty
            {
                return NotFound();
            }

            var user = await _userManager.GetUsersInRoleAsync("Panellid");

            if (!user.Any()) // Check if the list is empty
            {
                return NotFound();
            }

            return Ok(new { Panellid = panellid, User = user });
        }

        // [HttpGet]
        // [Route("getPanellidUsers")]
        // public async Task<ActionResult<dynamic>> getPanellidUsers()
        // {
        //     var panellid = await _panellidManager.GetAllAsync();

        //     if (panellid == null)
        //     {
        //         return NotFound();
        //     }

        //     var user = await _userManager.GetUsersInRoleAsync("Panellid");

        //     if (user == null)
        //     {
        //         return NotFound();
        //     }

        //     return Ok(new { Panellid = panellid, User = user });
        // } 

        [HttpPost]
        [Route("UpdatePanellidInfo")]
        public async Task<ActionResult<Panellid>> UpdatePanellidInfo([FromBody] Panellid panellidInfo)
        {
            if (panellidInfo == null)
            {
                return BadRequest("Panellid info is null");
            }

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

        [HttpGet]
        [Route("getPanellidInfo")]
        public async Task<ActionResult<dynamic>> getPanellidInfo(string id)
        {
            var panellid = await _panellidManager.FindByIdAsync(id);

            if (panellid == null)
            {
                return NotFound();
            }

            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new { Panellid = panellid, User = user });
        }

    }
}