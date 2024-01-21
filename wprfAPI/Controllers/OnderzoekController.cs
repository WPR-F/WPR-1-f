using System.Globalization;
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
            var onderzoekData = new Onderzoek 
            {
            titel = onderzoek.titel,
            beschrijving = onderzoek.beschrijving,
            locatie = onderzoek.locatie,
            datum = onderzoek.datum,
            uitvoerder = onderzoek.uitvoerder,
            beloning = onderzoek.beloning,
            categorie = onderzoek.categorie,
            aanmeldingen = onderzoek.aanmeldingen,
            typeBeperking = onderzoek.typeBeperking,
            postcode = onderzoek.postcode,
            leeftijd = onderzoek.leeftijd,
            };
            
            _context.Onderzoeken.Add(onderzoek);
            _context.SaveChanges();

             return CreatedAtAction(nameof(CreateOnderzoek), new { id = onderzoek.id }, onderzoek);
        }
                
        [HttpGet]
        [Route("getOnderzoeken")]
        public IActionResult GetOnderzoeken()
        {
            var onderzoeken = _context.Onderzoeken.ToList();

            if (onderzoeken == null) {
                return NotFound();
            }
            return Ok(onderzoeken);
        }
    }
}
