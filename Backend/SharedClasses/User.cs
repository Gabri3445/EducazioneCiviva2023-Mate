using MongoDB.Bson.Serialization.Attributes;

namespace SharedClasses;

public class User
{
    [BsonId] public string Id;

    public User(string username, List<Question> questionsToAnswer)
    {
        Id = Guid.NewGuid().ToString();
        Username = username;
        QuestionsToAnswer = questionsToAnswer;
        Score = 0;
        NextQuestion = 0;
        Questions = new List<Question>();
    }

    public List<Question> Questions { get; set; }

    public int Score { get; set; }

    public int NextQuestion { get; set; }

    public string Username { get; set; }

    public List<Question>
        QuestionsToAnswer
    {
        get;
        set;
    } // Make a list of all the answers and randomize the order of them and assign them here
}