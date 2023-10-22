namespace CompanyManager.Models.DTOs.API.BoardDTOs
{
    public class BoardDTO
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public Guid ProjectID { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public bool IsFinished { get; set; }
    }
}
