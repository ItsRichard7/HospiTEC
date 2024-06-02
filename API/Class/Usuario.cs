namespace API.Models
{
    public class Usuario
    {
        public decimal cedula { get; set; }
        public int rol { get; set; }
        public string contrasena { get; set; }
        public string pNombre { get; set; }
        public string sNombre { get; set; }
        public string pApellido { get; set; }
        public string sApellido { get; set; }
        public DateTime fecha_nacimiento { get; set; }
        public string pais { get; set; }
        public string provincia { get; set; }
        public string distrito { get; set; }
        public string domicilio { get; set; }
    }
}
