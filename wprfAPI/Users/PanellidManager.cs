using Microsoft.EntityFrameworkCore;
using wprfAPI.Users;
public class PanellidManager 
{
    private readonly AccountContext _context;

    public PanellidManager(AccountContext context)
    {
        _context = context;
    }

    public async Task<Panellid> FindByIdAsync(string id)
    {
        return await _context.Panelleden.FindAsync(id);
    }

    public async Task<List<Panellid>> GetAllAsync()
{
    return await _context.Panelleden.ToListAsync();
}

}