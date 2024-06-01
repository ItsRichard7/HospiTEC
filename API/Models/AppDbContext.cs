using API.Class;
using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Salon> Salones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Salon>().HasNoKey();

            modelBuilder.Entity<Salon>().Property(s => s.Tipo).HasColumnType("VARCHAR(30)");
            modelBuilder.Entity<Salon>().Property(s => s.Nombre).HasColumnType("VARCHAR(30)");
            modelBuilder.Entity<Salon>().Property(s => s.Capacidad).HasColumnType("NUMERIC(2,0)");
            modelBuilder.Entity<Salon>().Property(s => s.Piso).HasColumnType("NUMERIC(1,0)");
        }
    }
}
