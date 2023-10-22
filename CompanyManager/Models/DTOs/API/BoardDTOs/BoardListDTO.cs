namespace CompanyManager.Models.DTOs.API.BoardDTOs
{
    public class BoardListDTO
    {
        public int Count { get; set; } = 0;
        public List<BoardDTO> Boards { get; set; } = new List<BoardDTO> { };
    }
}
