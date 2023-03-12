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
        if (createUserRequest.Username.Equals("")) return BadRequest();
        var questions = _questionCollection
            .AsQueryable()
            .Where(x => true)
            .OrderBy(x => Guid.NewGuid())
            .ToList();
        var user = new User(createUserRequest.Username, questions);
        _userCollection.InsertOne(user);
        return Ok(new CreateUserResponse(user.Id));
    }

    [HttpGet("GetQuestion")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public ActionResult<GetQuestionResponse> GetQuestion(string userGuid)
    {
        if (!Guid.TryParse(userGuid, out _)) return BadRequest();

        var user = _userCollection
            .AsQueryable()
            .FirstOrDefault(x => x.Id == userGuid);

        if (user == null) return NotFound();

        var question = user.QuestionsToAnswer[user.NextQuestion];
        user.NextQuestion++;

        var answerList = question.Answers.Select(answer => answer.AnswerString).ToList();

        var filter = Builders<User>.Filter.Eq(x => x.Id, userGuid);
        var update = Builders<User>.Update.Inc(x => x.NextQuestion, 1);
        _userCollection.UpdateOne(filter, update);
        return Ok(new GetQuestionResponse(question.QuestionString, answerList));
    }

    [HttpPut("SendAnswer")]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(200)]
    public ActionResult<SendAnswerResponse> SendAnswer(SendAnswerRequest sendAnswerRequest)
    {
        if (!Guid.TryParse(sendAnswerRequest.UserGuid, out _)) return BadRequest();

        var user = _userCollection
            .AsQueryable()
            .FirstOrDefault(x => x.Id == sendAnswerRequest.UserGuid);

        if (user == null) return NotFound();

        var question = user.QuestionsToAnswer[user.NextQuestion];

        var correctAnswer = question.Answers[sendAnswerRequest.AnswerIndex].IsCorrect;

        var explanation = string.Empty;

        return Ok(new SendAnswerResponse(correctAnswer, explanation));
    }

    [HttpGet("GetLeaderboard")]
    [ProducesResponseType(200)]
    public ActionResult<GetLeaderBoardResponse> GetLeaderboard()
    {
        var leaderboard = _userCollection
            .AsQueryable()
            .OrderBy(x => x.Score)
            .Select(x => new {x.Username, x.Score})
            .ToList();
        var usernames = leaderboard.Select(x => x.Username).ToList();
        var scores = leaderboard.Select(x => x.Score).ToList();
        return Ok(new GetLeaderBoardResponse(usernames, scores));
    }
}