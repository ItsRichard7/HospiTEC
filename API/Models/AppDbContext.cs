using API.Class;
using API.Controllers;
using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Salon> Salones { get; set; }
        public DbSet<Usuario2> Usuario2 { get; set; }
        public DbSet<VerificarInicioSesionResponse> VerificarInicioSesionResponses { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Salon>().HasNoKey();
            modelBuilder.Entity<Usuario2>().HasNoKey();
            modelBuilder.Entity<VerificarInicioSesionResponse>().HasNoKey();



            modelBuilder.Entity<Salon>().Property(s => s.numeroSalon).HasColumnName("numero");
            modelBuilder.Entity<Salon>().Property(s => s.tipo).HasColumnName("tipo");
            modelBuilder.Entity<Salon>().Property(s => s.nombreSalon).HasColumnName("nombre");
            modelBuilder.Entity<Salon>().Property(s => s.capacidadCamas).HasColumnName("capacidad");
            modelBuilder.Entity<Salon>().Property(s => s.piso).HasColumnName("piso");

            modelBuilder.Entity<Usuario2>().Property(s => s.cedula).HasColumnName("cedula");
            modelBuilder.Entity<Usuario2>().Property(s => s.rol).HasColumnName("rol_id");
            modelBuilder.Entity<Usuario2>().Property(s => s.pNombre).HasColumnName("p_nombre");
            modelBuilder.Entity<Usuario2>().Property(s => s.sNombre).HasColumnName("s_nombre");
            modelBuilder.Entity<Usuario2>().Property(s => s.pApellido).HasColumnName("p_apellido");
            modelBuilder.Entity<Usuario2>().Property(s => s.sApellido).HasColumnName("s_apellido");
            modelBuilder.Entity<Usuario2>().Property(s => s.edad).HasColumnName("edad");
            modelBuilder.Entity<Usuario2>().Property(s => s.pais).HasColumnName("pais");
            modelBuilder.Entity<Usuario2>().Property(s => s.provincia).HasColumnName("provincia");
            modelBuilder.Entity<Usuario2>().Property(s => s.distrito).HasColumnName("distrito");
            modelBuilder.Entity<Usuario2>().Property(s => s.domicilio).HasColumnName("domicilio");

        }
    }
}
