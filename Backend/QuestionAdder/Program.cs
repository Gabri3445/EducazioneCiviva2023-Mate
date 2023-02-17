using MongoDB.Driver;
using SharedClasses;

namespace QuestionAdder;

public static class Program
{
    public static void Main(string[] args)
    {
        var client = new MongoClient("mongodb://localhost:27017");
        var database = client.GetDatabase("eduCiv");
        var questionsDatabase = database.GetCollection<Question>("questions");
        var exit = false;
        do
        {
            Console.WriteLine("Domanda");
            var question = Console.ReadLine() ?? string.Empty;
                Console.WriteLine("Numero di risposte");
                var num = int.Parse(Console.ReadLine() ?? string.Empty);
                var answers = new List<Answer>();
                for (var i = 0; i < num; i++)
                {
                    Console.WriteLine("Risposta");
                    var answer = Console.ReadLine() ?? string.Empty;
                    Console.WriteLine("Vera? 0 vero, 1 falso");
                    var isTrue = int.Parse(Console.ReadLine() ?? string.Empty) == 0;
                    var explanation = "";
                    if (isTrue)
                    {
                        explanation = Console.ReadLine() ?? String.Empty;
                    }
                    answers.Add(new Answer(answer, isTrue, explanation));
                }
                Console.WriteLine("0 to continue");
                exit = int.Parse(Console.ReadLine() ?? string.Empty) == 0;
                questionsDatabase.InsertOne(new Question(question, answers));
        } while (exit);
    }
}