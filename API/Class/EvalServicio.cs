using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Class
{

    public class EvalServicio
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public int cedPaciente { get; set; }
        public int aseo { get; set; }
        public int trato { get; set; }
        public int puntualidad { get; set; }
        public string comentarios { get; set; }
    }

}
