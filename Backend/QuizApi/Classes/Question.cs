namespace QuizApi.Classes;

public class Question
{
    public Question(string questionString, List<Answer> answers)
    {
        QuestionString = questionString;
        Answers = answers;
    }

    public string QuestionString { get; } // The question
    public List<Answer> Answers { get; } // The answers
}