using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace wprfAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClickstreamController : ControllerBase
    {
        private readonly ClickstreamContext _context;

        public ClickstreamController(ClickstreamContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("clickstream")]
        public IActionResult getClickstream([FromBody] Clickstream clickstream)
        {
            var clickstreamData = new Clickstream 
             {
            Event = clickstream.Event,
            ElementId = clickstream.ElementId,
            PaginaUrl = clickstream.PaginaUrl,
            Tijd = clickstream.Tijd
            };
        
            _context.Clickstream.Add(clickstream);
            _context.SaveChanges();

            return CreatedAtAction(nameof(getClickstream), new { id = clickstream.id }, clickstream);

        }
    }
}
    