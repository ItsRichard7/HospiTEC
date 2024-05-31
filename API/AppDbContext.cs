using Microsoft.EntityFrameworkCore;

namespace API
{
    public class AppDbContext : DbContext
    {
        public AppDbContext()
        {

        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public virtual DbSet<Salones> Salones { get; set; }

    }

    public class Salones
    {
        public int numero { get; set; }
        public int id { get; set; }
        public string nombre { get; set; }
        public int capacidad { get; set; }
        public string piso { get; set; }
    }
}
