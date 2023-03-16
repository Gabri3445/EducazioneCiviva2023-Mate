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

public class SendAnswerResponse
{
    public SendAnswerResponse(bool correctAnswer, string explanation, int correctAnswerIndex)
    {
        CorrectAnswer = correctAnswer;
        Explanation = explanation;
        CorrectAnswerIndex = correctAnswerIndex;
    }

    public bool CorrectAnswer { get; set; }

    public int CorrectAnswerIndex { get; set; }

    public string Explanation { get; set; }
}

public class GetLeaderBoardResponse
{
    public GetLeaderBoardResponse(List<string> usernames, List<int> scores)
    {
        Usernames = usernames;
        Scores = scores;
    }

    public List<string> Usernames { get; set; }

    public List<int> Scores { get; set; }
}