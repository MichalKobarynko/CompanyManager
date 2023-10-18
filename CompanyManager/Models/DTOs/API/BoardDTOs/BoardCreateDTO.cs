using System.ComponentModel.DataAnnotations;

namespace CompanyManager.Models.DTOs.API.BoardDTOs
{
    public class BoardCreateDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public Guid ProjectID { get; set; }
    }
}
