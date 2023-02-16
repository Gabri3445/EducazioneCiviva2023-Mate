namespace QuizApi.Controllers.Responses;

public class CreateUserResponse
{
    public CreateUserResponse(string id)
    {
        Id = id;
    }

    public string Id { get; set; }
}