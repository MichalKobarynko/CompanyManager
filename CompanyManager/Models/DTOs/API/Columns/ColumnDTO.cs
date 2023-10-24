namespace CompanyManager.Models.DTOs.API.Columns
{
    public class ColumnDTO
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public Guid BoardID { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
