using MongoDB.Bson.Serialization.Attributes;

namespace SharedClasses;

public class Question
{
    public Question(string questionString, List<Answer> answers)
    {
        Id = Guid.NewGuid().ToString();
        QuestionString = questionString;
        Answers = answers;
    }

    [BsonId] public string Id { get; set; }
    
    public string QuestionString { get; set; } // The question

    public List<Answer> Answers { get; set; } // The answers
}