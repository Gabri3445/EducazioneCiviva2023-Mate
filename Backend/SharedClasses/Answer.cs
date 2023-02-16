namespace SharedClasses;

public class Answer
{
    public Answer(string answerString, bool isCorrect)
    {
        AnswerString = answerString;
        IsCorrect = isCorrect;
    }

    public string AnswerString { get; } // The answers
    public bool IsCorrect { get; } // Is the answer correct
}