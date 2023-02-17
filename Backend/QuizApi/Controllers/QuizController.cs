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
    [ProducesResponseType(400)]
    [ProducesResponseType(200)]
    public ActionResult<CreateUserResponse> CreateUser([FromBody] CreateUserRequest createUserRequest)
    {
        if (createUserRequest.Username.Equals(""))
        {
            return BadRequest();
        }
        var questions = _questionCollection.AsQueryable()
            .Where(x => true)
            .OrderBy(x => Guid.NewGuid())
            .ToList();
        var user = new User(createUserRequest.Username, questions);
        _userCollection.InsertOne(user);
        return Ok(new CreateUserResponse(user.Id));
    }

    [HttpGet("GetQuestion")]
    public ActionResult<GetQuestionResponse> GetQuestion(string userGuid)
    {
        if (!Guid.TryParse(userGuid, out _))
        {
            return BadRequest();
        }

        var user = _userCollection
            .AsQueryable()
            .FirstOrDefault(x => x.Id == userGuid);
        
        if (user == null)
        {
            return NotFound();
        }

        var question = user.QuestionsToAnswer[user.NextQuestion];
        user.NextQuestion++;

        List<string> answerList = new List<string>();

        foreach (var answer in question.Answers)
        {
            answerList.Add(answer.AnswerString);
        }

        var filter = Builders<User>.Filter.Eq(x => x.Id, userGuid);
        var update = Builders<User>.Update.Inc(x => x.NextQuestion, 1);
        _userCollection.UpdateOne(filter, update);
        return Ok(new GetQuestionResponse(question.QuestionString, answerList));
    }
}