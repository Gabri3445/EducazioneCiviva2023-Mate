using MongoDB.Bson.Serialization.Attributes;

namespace SharedClasses;

public class Answer
{
    public Answer(string answerString, bool isCorrect)
    {
        AnswerString = answerString;
        IsCorrect = isCorrect;
        Selected = false;
    }

    [BsonElement("answerString")]
    public string AnswerString { get; set; } // The answers
    
    [BsonElement("isCorrect")]
    public bool IsCorrect { get; set; } // Is the answer correct
    
    [BsonElement("selected")]
    public bool Selected { get; set; }
}