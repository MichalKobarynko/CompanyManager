namespace CompanyManager.Models.DTOs.API
{
    public class UserDTO
    {
        public string ID { get; set; }
        public string UserName { get; set; }
        public IList<string> Roles { get; set; } = new List<string>();
    }

    public class UserListDTO
    { 
        public int Count { get; set; }  
        public List<UserDTO> Users { get; set; }
    }
}
