using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using QuizApi.Controllers.Requests;
using QuizApi.Controllers.Responses;
using QuizApi.Singletons;
using SharedClasses;

namespace QuizApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuizController : ControllerBase
{
    private readonly IMongoDatabase _database;
    private readonly ILogger<QuizController> _logger;
    private readonly IMongoCollection<Question> _questionCollection;
    private readonly IMongoCollection<User> _userCollection;

    public QuizController(ILogger<QuizController> logger)
    {
        var client = MongoDbClientSingleton.Instance;
        _database = client.Client.GetDatabase("eduCiv");
        _questionCollection = _database.GetCollection<Question>("questions");
        _userCollection = _database.GetCollection<User>("users");
        _logger = logger;
    }

    [HttpGet("Ping")]
    [ProducesResponseType(200)]
    public ActionResult Ping()
    {
        return Ok();
    }

    [HttpPost("CreateUser")]
    public ActionResult<CreateUserResponse> CreateUser([FromBody] CreateUserRequest createUserRequest)
    {
        List<Question> questions = _questionCollection.AsQueryable()
            .Where(x => true)
            .OrderBy(x => Guid.NewGuid())
            .ToList();
        User user = new User(createUserRequest.Username, questions);
        return Ok(new CreateUserResponse(user.Id));
    }
}