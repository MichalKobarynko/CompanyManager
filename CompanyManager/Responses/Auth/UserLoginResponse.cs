﻿namespace MojaJIRA.Responses.Auth
{
    public class UserLoginResponse
    {
        public bool IsAuthSuccessful { get; set; }
        public string? ErrorMessage { get; set; }
        public string? Token { get; set; }
    }
}
