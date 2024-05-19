namespace Together.Core.Models.FilterModels;

public class BaseFilterModel
{
    public BaseFilterModel(
        int id,
        string name,
        int usageCount)
    {
        Id = id;
        Name = name;
        UsageCount = usageCount;
    }

    public int Id { get; private set; }
    public string Name { get; private set; }
    public int UsageCount { get; private set; }
}