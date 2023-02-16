using MongoDB.Bson.Serialization.Attributes;

namespace SharedClasses;

public class Question
{
    [BsonId] public string Id;

    public Question(string questionString, List<Answer> answers)
    {
        Id = Guid.NewGuid().ToString();
        QuestionString = questionString;
        Answers = answers;
    }

    public string QuestionString { get; } // The question
    public List<Answer> Answers { get; } // The answers
    
    public bool AnsweredCorrectly { get; set; }
}