using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Classes;
using Backend.Singletons;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Serialization;
using MongoDB.Driver;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IMongoCollection<Question> _questionCollection;
        private readonly IMongoDatabase _database;
        private readonly ILogger<QuizController> _logger;

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
}
