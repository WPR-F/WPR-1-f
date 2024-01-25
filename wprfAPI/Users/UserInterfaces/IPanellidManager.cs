using wprfAPI.Users;

public interface IPanellidManager
{
    Task<List<Panellid>> GetAllAsync();
    Task<Panellid> FindByIdAsync(string id);
}