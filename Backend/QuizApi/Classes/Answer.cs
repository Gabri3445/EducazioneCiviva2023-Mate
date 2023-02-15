namespace QuizApi.Classes;

public class Answer
{
    public Answer(string answerString, bool isCorrect)
    {
        AnswerString = answerString;
        this.IsCorrect = isCorrect;
    }

    public String AnswerString { get; } // The answers
    public bool IsCorrect { get; } // Is the answer correct
}