namespace SharedClasses;

public class Answer
{
    public Answer(string answerString, bool isCorrect, string explanation)
    {
        AnswerString = answerString;
        IsCorrect = isCorrect;
        Explanation = explanation;
    }

    public string AnswerString { get; set; } // The answer

    public bool IsCorrect { get; set; } // Is the answer correct
    public string Explanation { get; set; }
}