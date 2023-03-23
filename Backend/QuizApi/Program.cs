using QuizApi.Middleware;
using QuizApi.Singletons;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Host.UseWindowsService(options =>
{
    options.ServiceName = "QuizServer";
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton(sp => MongoDbClientSingleton.Instance);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseMiddleware<AddCorsHeaderMiddleware>();

app.MapControllers();

app.Run();