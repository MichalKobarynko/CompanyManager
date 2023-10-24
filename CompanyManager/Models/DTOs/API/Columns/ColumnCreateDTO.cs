using System.ComponentModel.DataAnnotations;

namespace CompanyManager.Models.DTOs.API.Columns
{
    public class ColumnCreateDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]  
        public string DotColor { get; set; }

        [Required]
        public Guid BoardID { get; set; }
    }
}
