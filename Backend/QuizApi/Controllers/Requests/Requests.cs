namespace QuizApi.Controllers.Requests;

public class CreateUserRequest
{
    public string Username { get; set; }
}

public class SendAnswerRequest
{
    public string UserGuid { get; set; }

    public int AnswerIndex { get; set; }
}