using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using API.Class;

var builder = WebApplication.CreateBuilder(args);

// Configurar servicios para controladores
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar la cadena de conexión a la base de datos relacional
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

// Configurar MongoDB
builder.Services.Configure<EvalServicioService.MongoDBSettings>(
    builder.Configuration.GetSection(nameof(EvalServicioService.MongoDBSettings)));
builder.Services.AddSingleton<IMongoClient>(s =>
    new MongoClient(builder.Configuration.GetValue<string>($"{nameof(EvalServicioService.MongoDBSettings)}:ConnectionString")));
builder.Services.AddSingleton<IMongoDatabase>(s =>
    s.GetRequiredService<IMongoClient>().GetDatabase(builder.Configuration.GetValue<string>($"{nameof(EvalServicioService.MongoDBSettings)}:DatabaseName")));

// Registrar EvalServicioService
builder.Services.AddSingleton<EvalServicioService>();

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configurar el pipeline de solicitud HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.Run();
