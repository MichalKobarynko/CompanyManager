
using CompanyManager.Features.Queries.Projects;

public class BoardEditDTO
{ 
    public Guid BoardID { get; set; }
    public Guid ProjectID {  get; set; }  
    public string Name { get; set; }    
}
