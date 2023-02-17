namespace SharedClasses;

public class Answer
{
    public Answer(string answerString, bool isCorrect)
    {
        AnswerString = answerString;
        IsCorrect = isCorrect;
        Selected = false;
    }
    
    public string AnswerString { get; set; } // The answer
    
    public bool IsCorrect { get; set; } // Is the answer correct
    
    public bool Selected { get; set; }
}