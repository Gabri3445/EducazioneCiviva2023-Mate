namespace Backend.Classes;

public class Answer
{
    public Answer(string answerString, bool isCorrect)
    {
        AnswerString = answerString;
        this.IsCorrect = isCorrect;
    }

    public String AnswerString { get; }
    public bool IsCorrect { get; }
}