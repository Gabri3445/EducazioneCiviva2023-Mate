using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using QuizApi.Classes;
using QuizApi.Singletons;

namespace QuizApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuizController : ControllerBase
{
    private readonly IMongoDatabase _database;
    private readonly ILogger<QuizController> _logger;
    private readonly IMongoCollection<Question> _questionCollection;

    public QuizController(ILogger<QuizController> logger)
    {
        var client = MongoDbClientSingleton.Instance;
        _database = client.Client.GetDatabase("eduCiv");
        _questionCollection = _database.GetCollection<Question>("questions");
        _logger = logger;
    }

    [HttpGet("Ping")]
    [ProducesResponseType(200)]
    public ActionResult Ping()
    {
        return Ok();
    }
}