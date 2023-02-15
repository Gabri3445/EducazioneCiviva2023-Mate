using MongoDB.Driver;
using QuizApi.Classes;

namespace QuestionAdder;

public static class Program
{
    public static async Task Main(string[] args)
    {
        var client = new MongoClient("mongodb://localhost:27017");
        var database = client.GetDatabase("eduCiv");
        var questionsDatabase = database.GetCollection<Question>("questions");
        var list = new List<Answer>()
        {
            new Answer("Giglo", false),
            new Answer("Nicolo", true)
        };
        await questionsDatabase.InsertOneAsync(new Question("Barille is barille?", list));
    }
}