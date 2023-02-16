using MongoDB.Driver;
using SharedClasses;

namespace QuestionAdder;

public static class Program
{
    public static async Task Main(string[] args)
    {
        var client = new MongoClient("mongodb://localhost:27017");
        var database = client.GetDatabase("eduCiv");
        var questionsDatabase = database.GetCollection<Question>("questions");
        var exit = false;
        var questions = new List<Question>();
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
                answers.Add(new Answer(answer, isTrue));
            }

            questions.Add(new Question(question, answers));
            Console.WriteLine("0 to continue");
            exit = int.Parse(Console.ReadLine() ?? string.Empty) == 0;
        } while (exit);

        await questionsDatabase.InsertManyAsync(questions);
    }
}