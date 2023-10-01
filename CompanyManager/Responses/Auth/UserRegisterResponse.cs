namespace MojaJIRA.Responses.Auth
{
    public class UserRegisterResponse
    {
        public bool IsSuccess { get; set; }
        public IEnumerable<string> Errors { get; set; } = Enumerable.Empty<string>();
    }
}
