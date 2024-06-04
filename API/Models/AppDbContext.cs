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
        public DbSet<EquipoMedico> EquiposMedicos { get; set; }
        public DbSet<Cama> Camas { get; set; }
        public DbSet<ProcedimientoMedico> ProcedimientosMedicos { get; set; }
        public DbSet<PersonalMedico> PersonalMedico { get; set; }
        public DbSet<HistorialMedico> HistorialMedico { get; set; }
        public DbSet<Patologia> Patologia { get; set; }
        public DbSet<HistorialMedicoDetalle> HistorialMedicoDetalle { get; set; }
        public DbSet<HistorialMedicoModif> HistorialMedicoModif { get; set; }
        public DbSet<ReservacionUsuario> ReservacionUsuario { get; set; }
        public DbSet<ReservacionCama> ReservacionCama { get; set; }
        public DbSet<DisponibilidadResult> DisponibilidadResult { get; set; }
        public DbSet<ReservacionResult> ReservacionResult { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Salon>().HasNoKey();
            modelBuilder.Entity<Usuario2>().HasNoKey();
            modelBuilder.Entity<VerificarInicioSesionResponse>().HasNoKey();
            modelBuilder.Entity<EquipoMedico>().HasNoKey();
            modelBuilder.Entity<Cama>().HasNoKey();
            modelBuilder.Entity<ProcedimientoMedico>().HasNoKey();
            modelBuilder.Entity<PersonalMedico>().HasNoKey();
            modelBuilder.Entity<HistorialMedico>().HasNoKey();
            modelBuilder.Entity<Patologia>().HasNoKey();
            modelBuilder.Entity<HistorialMedicoDetalle>().HasNoKey();
            modelBuilder.Entity<HistorialMedicoModif>().HasNoKey();
            modelBuilder.Entity<DisponibilidadResult>().HasNoKey();
            modelBuilder.Entity<ReservacionResult>().HasNoKey().ToView(null);




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

            modelBuilder.Entity<EquipoMedico>().Property(s => s.placa).HasColumnName("p_placa");
            modelBuilder.Entity<EquipoMedico>().Property(s => s.tipo).HasColumnName("p_id_tipo");
            modelBuilder.Entity<EquipoMedico>().Property(s => s.cantidadDefault).HasColumnName("p_cant_default");
            modelBuilder.Entity<EquipoMedico>().Property(s => s.proveedor).HasColumnName("p_proveedor");
            modelBuilder.Entity<EquipoMedico>().Property(s => s.nombre).HasColumnName("p_nombre_tipo");

            modelBuilder.Entity<Cama>().Property(s => s.numeroCama).HasColumnName("numero");
            modelBuilder.Entity<Cama>().Property(s => s.salon).HasColumnName("numero_salon");
            modelBuilder.Entity<Cama>().Property(s => s.UCI).HasColumnName("cuidados_intensivos");
            modelBuilder.Entity<Cama>().Property(s => s.nombreSalon).HasColumnName("nombre_salon");
            modelBuilder.Entity<Cama>().Property(s => s.equipoMedico).HasColumnName("tipo_equipo");

            modelBuilder.Entity<ProcedimientoMedico>().Property(s => s.id).HasColumnName("p_id");
            modelBuilder.Entity<ProcedimientoMedico>().Property(s => s.nombreProcedimiento).HasColumnName("p_nombre");
            modelBuilder.Entity<ProcedimientoMedico>().Property(s => s.diasRecuperacion).HasColumnName("p_dias_recuperacion");

            modelBuilder.Entity<PersonalMedico>().Property(s => s.cedula).HasColumnName("cedula");
            modelBuilder.Entity<PersonalMedico>().Property(s => s.rol).HasColumnName("rol_nombre");
            modelBuilder.Entity<PersonalMedico>().Property(s => s.pNombre).HasColumnName("p_nombre");
            modelBuilder.Entity<PersonalMedico>().Property(s => s.sNombre).HasColumnName("s_nombre");
            modelBuilder.Entity<PersonalMedico>().Property(s => s.pApellido).HasColumnName("p_apellido");
            modelBuilder.Entity<PersonalMedico>().Property(s => s.sApellido).HasColumnName("s_apellido");
            modelBuilder.Entity<PersonalMedico>().Property(s => s.fecha_nacimiento).HasColumnName("f_nacim");
            modelBuilder.Entity<PersonalMedico>().Property(s => s.edad).HasColumnName("edad");
            modelBuilder.Entity<PersonalMedico>().Property(s => s.pais).HasColumnName("pais");
            modelBuilder.Entity<PersonalMedico>().Property(s => s.provincia).HasColumnName("provincia");
            modelBuilder.Entity<PersonalMedico>().Property(s => s.distrito).HasColumnName("distrito");
            modelBuilder.Entity<PersonalMedico>().Property(s => s.domicilio).HasColumnName("domicilio");
            modelBuilder.Entity<PersonalMedico>().Property(s => s.fecha_ingreso).HasColumnName("fecha_ingreso");

            modelBuilder.Entity<HistorialMedicoDetalle>().Property(s => s.id).HasColumnName("id");
            modelBuilder.Entity<HistorialMedicoDetalle>().Property(s => s.fecha_procedimiento).HasColumnName("fecha");
            modelBuilder.Entity<HistorialMedicoDetalle>().Property(s => s.procedimiento_realizado).HasColumnName("id_procedimiento");
            modelBuilder.Entity<HistorialMedicoDetalle>().Property(s => s.nombre_procedimiento).HasColumnName("nombre_procedimiento");
            modelBuilder.Entity<HistorialMedicoDetalle>().Property(s => s.tratamiento_prescrito).HasColumnName("tratamiento");

            modelBuilder.Entity<ReservacionUsuario>().Property(s => s.id).HasColumnName("p_id");
            modelBuilder.Entity<ReservacionUsuario>().Property(s => s.numeroCama).HasColumnName("p_num_cama");
            modelBuilder.Entity<ReservacionUsuario>().Property(s => s.fechaIngreso).HasColumnName("p_fecha_ingreso");
            modelBuilder.Entity<ReservacionUsuario>().Property(s => s.fechaSalida).HasColumnName("p_fecha_salida");

            modelBuilder.Entity<ReservacionCama>().Property(s => s.cedula).HasColumnName("p_user_ced");
            modelBuilder.Entity<ReservacionCama>().Property(s => s.id).HasColumnName("p_id");
            modelBuilder.Entity<ReservacionCama>().Property(s => s.fechaIngreso).HasColumnName("p_fecha_ingreso");
            modelBuilder.Entity<ReservacionCama>().Property(s => s.fechaSalida).HasColumnName("p_fecha_salida");
        }
    }
}
