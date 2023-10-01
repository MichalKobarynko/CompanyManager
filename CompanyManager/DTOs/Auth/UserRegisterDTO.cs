using System.ComponentModel.DataAnnotations;

namespace CompanyManager.DTOs.Auth
{
    public class UserRegisterDTO
    {
        [Required(ErrorMessage = "UserName is required")]
        public string UserName { get; set; } = "";


        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Provide valid email")]
        public string Email { get; set; } = "";


        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password to short (min 5 chars)")]
        public string Password { get; set; } = "";


        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; } = "";

        public string? ClientURI { get; set; }
    }
}
