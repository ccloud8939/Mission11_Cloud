using Microsoft.EntityFrameworkCore;

namespace Mission11_Cloud.Data;

public class BooksDbContext : DbContext
{
    public BooksDbContext(DbContextOptions<BooksDbContext> options) : base(options)
    {
        
    }

    public DbSet<Books> Books { get; set; }  // Ensure this matches your database
}

