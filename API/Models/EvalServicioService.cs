using MongoDB.Driver;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Class;
using API.Models;

public class EvalServicioService
{
    private readonly IMongoCollection<EvalServicio> _collection;

    public EvalServicioService(IMongoDatabase database, IOptions<MongoDBSettings> settings)
    {
        _collection = database.GetCollection<EvalServicio>(settings.Value.CollectionName);
    }

    public async Task InsertEvalServicio(EvalServicio evalServicio)
    {
        await _collection.InsertOneAsync(evalServicio);
    }

    public async Task<List<EvalServicio>> GetAllEvalServicio()
    {
        return await _collection.Find(_ => true).ToListAsync();
    }

    public class MongoDBSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string CollectionName { get; set; }
    }

}
