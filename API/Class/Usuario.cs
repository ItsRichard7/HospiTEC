namespace API.Models
{
    public class Usuario
    {
        public decimal Cedula { get; set; }
        public string Contrasena { get; set; }
        public string PNombre { get; set; }
        public string SNombre { get; set; }
        public string PApellido { get; set; }
        public string SApellido { get; set; }
        public DateTime FNacim { get; set; }  // Cambiar a DateTime
        public string Pais { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public string Domicilio { get; set; }
    }
}
