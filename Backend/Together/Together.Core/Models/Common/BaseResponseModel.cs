namespace Together.Core.Models.Common;

public class BaseResponseModel
{
    public bool Succeeded { get; set; }
    public string Message { get; set; }
    public string Error { get; set; }
    public int StatusCode { get; set; }
    public void setResponseMessage(bool succed, string message, int code)
    {
        Succeeded = succed;
        Message = message;
        StatusCode = code;
    }
    public void SetErrorMessage(string error, bool succeed,string message, int statusCode)
    {
        Error = error;           
        Message = message;
        StatusCode = statusCode;
        Succeeded = succeed;
    }
}