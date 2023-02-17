using SharedClasses;

namespace QuizApi.Controllers.Responses;

public class CreateUserResponse
{
    public CreateUserResponse(string id)
    {
        Id = id;
    }

    public string Id { get; set; }
}

public class GetQuestionResponse
{
    public GetQuestionResponse(string questionString, List<string> answers)
    {
        QuestionString = questionString;
        Answers = answers;
    }

    public string QuestionString { get; set; } // The question
    public List<string> Answers { get; set; }
}