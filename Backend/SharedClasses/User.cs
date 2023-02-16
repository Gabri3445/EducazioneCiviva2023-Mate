using MongoDB.Bson.Serialization.Attributes;

namespace SharedClasses;

public class User
{
    [BsonId] public string Id;

    public User(string id, List<Question> questionsToAnswer)
    {
        Id = id;
        QuestionsToAnswer = questionsToAnswer;
        Score = 0;
        Questions = new List<Question>();
        Username = "Giglo";
    }

    public User(string id, string username, List<Question> questionsToAnswer)
    {
        Id = id;
        Username = username;
        QuestionsToAnswer = questionsToAnswer;
        Score = 0;
        Questions = new List<Question>();
    }

    public List<Question> Questions { get; set; }
    
    public int Score { get; set; }
    
    public string Username { get; set; }
    
    public List<Question> QuestionsToAnswer { get; set; } // Make a list of all the answers and randomize the order of them and assign them here
}