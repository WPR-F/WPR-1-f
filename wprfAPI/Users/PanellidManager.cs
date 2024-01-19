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

}