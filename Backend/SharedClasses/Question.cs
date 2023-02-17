using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace SharedClasses;

public class Question
{
    [BsonId] public string Id { get; set; }

    public Question(string questionString, List<Answer> answers)
    {
        Id = Guid.NewGuid().ToString();
        QuestionString = questionString;
        Answers = answers;
        AnsweredCorrectly = false;
    }
    [BsonElement("questionString")]
    public string QuestionString { get; set; } // The question
    [BsonElement("answers")]
    public List<Answer> Answers { get; set; } // The answers
    
    [BsonElement("answeredCorrectly")]
    public bool AnsweredCorrectly { get; set; }
}