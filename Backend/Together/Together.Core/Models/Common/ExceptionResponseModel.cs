using System.Globalization;

namespace Together.Core.Models.Common;

public class ExceptionResponseModel : Exception
{
    public ExceptionResponseModel() : base()
    {
    }

    public ExceptionResponseModel(string message) : base(message)
    {
    }

    public ExceptionResponseModel(string message, params object[] args)
        : base(String.Format(CultureInfo.CurrentCulture, message, args))
    {
    }
}