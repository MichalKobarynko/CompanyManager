using System.ComponentModel.DataAnnotations;

namespace CompanyManager.DTOs.Auth
{
    public class ForgotPasswordDTO
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? ClientURI { get; set; }
    }
}
