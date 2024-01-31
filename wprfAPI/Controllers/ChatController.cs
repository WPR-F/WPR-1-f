using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using wprfAPI.Users;

namespace wprfAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly ChatContext _context;

        public ChatController(ChatContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("getMessages")]
        public ActionResult<IEnumerable<Message>> GetMessages()
        {
        
            return _context.Messages.ToList();
        }
        [HttpPost]
        [Route("getMessagesByDate")]
        public async Task<ActionResult<Message>> getMessagesByDate([FromBody] Message message)
        {
            var sender = message.Sender;
            var receiver = message.Receiver;
            var messages = _context.Messages.Where(m => m.Sender == sender && m.Receiver == receiver || m.Sender == receiver && m.Receiver == sender).OrderBy(m => m.Date).ToList();

            return Ok(messages);
        }

        [HttpPost]
        [Route("postMessage")]
        public async Task<ActionResult<Message>> PostMessage([FromBody] Message message)
        {
            var messageData = new Message
            {
                Sender = message.Sender,
                Receiver = message.Receiver,
                Text = message.Text,
                Date = message.Date
            };
            _context.Messages.Add(messageData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMessages", new { id = message.Id }, message);
        }
    }
}
