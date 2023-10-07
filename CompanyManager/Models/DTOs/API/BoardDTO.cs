namespace CompanyManager.Models.DTOs.API
{
    public class BoardDTO
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime CUpdateAt { get; set; }
        public bool IsFinished { get; set; }
    }
}
