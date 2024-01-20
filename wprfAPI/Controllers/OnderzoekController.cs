using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace wprfAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OnderzoekController : ControllerBase
    {
        private readonly ILogger<OnderzoekController> _logger;
        private readonly OnderzoekContext _context; // Replace YourDbContext with your actual DbContext

        public OnderzoekController(ILogger<OnderzoekController> logger, OnderzoekContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        [Route("createOnderzoek")]
        public IActionResult CreateOnderzoek([FromBody] Onderzoek onderzoek)
        {
            var onderzoekData = new Onderzoek(onderzoek.titel, onderzoek.typeBeperking, onderzoek.postcode, onderzoek.leeftijd);
           
            Console.WriteLine($"Titel: {onderzoek.titel}");
            Console.WriteLine($"Type beperking: {onderzoek.typeBeperking}");
            Console.WriteLine($"Postcode: {onderzoek.postcode}");
            Console.WriteLine($"Leeftijd: {onderzoek.leeftijd}");

            _context.Onderzoeken.Add(onderzoekData);
            _context.SaveChanges();

             return CreatedAtAction(nameof(CreateOnderzoek), new { id = onderzoek.OnderzoekId }, onderzoekData);
        }
                
        [HttpGet]
        [Route("getOnderzoeken")]
        public IActionResult GetOnderzoeken()
        {
            var onderzoeken = _context.Onderzoeken.ToList();
            return Ok(onderzoeken);
        }
    }
}
