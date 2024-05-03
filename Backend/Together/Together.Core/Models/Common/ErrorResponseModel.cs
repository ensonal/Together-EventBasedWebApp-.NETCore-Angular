namespace Together.Core.Models.Common;

public class ErrorResponseModel
{ 
    public ErrorResponseModel(string message, string errors, int statusCode)
    {
        IsSucceed = false;
        Message = message;
        Errors = errors;
        StatusCode = statusCode;
    }
    
    public bool IsSucceed { get; set; }
    public string Message { get; set; }
    public string Errors { get; set; }
    public int StatusCode { get; set; }
}