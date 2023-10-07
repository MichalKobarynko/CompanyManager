using CompanyManager.Models.DBContext;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CompanyManager.Models.DTOs.API
{
    public class ProjectDTO
    {
        public Guid ID { get; set; }
        public string Title { get; set; }
        public string OwnerID { get; set; }
        public IEnumerable<BoardDTO> Boards { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public bool IsFinished { get; set; } = false;
    }

    public class ProjectCreateDTO
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public Guid OwnerID { get; set; }
    }

    public class ProjectListDTO
    {
        public int Count { get; set; } = 0;
        public List<ProjectDTO> Projects { get; set; } = new List<ProjectDTO> { };
    }

    public class ProjectEditDTO
    {
        [Required]
        public Guid ProjectID { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public Guid OwnerID { get; set; }
    }

    public class ProjectDelteDTO
    {
        [Required]
        public Guid OwnerID { get; set; }
    }

}
