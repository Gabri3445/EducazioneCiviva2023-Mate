using MongoDB.Driver;

namespace Backend.Singletons;

public class MongoDbClientSingleton
{
    private static IMongoClient _client;

    private MongoDbClientSingleton()
    {
        _client = new MongoClient("mongodb//localhost:27017");
    }

    public static MongoDbClientSingleton Instance { get; } = new();

    public IMongoClient Client => _client;
}