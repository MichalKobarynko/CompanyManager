using CompanyManager.DTOs.API;
using CompanyManager.Models;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using Microsoft.AspNetCore.Mvc;

namespace CompanyManager.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProjectController : ControllerBase
    {
        private readonly IRepositoryManager repo;
        private readonly ILoggerManager logger;
        public ProjectController(
            IRepositoryManager repo,
            ILoggerManager logger)
        {
            this.repo = repo;
            this.logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetProject(Guid id)
        {
            var project = await repo.Project.GetProject(id);
            if(project is null)
            {
                logger.LogInfo($"Project with id: {id} dosn't exist in the database.");
                return NotFound();
            }

            var projectDTO = new ProjectDTO
            {
                ID = project.ID,
                Title = project.Title,
                Owner = null,
                Boards = null,
                CreateAt = project.CreateAt,
                CUpdateAt = project.CUpdateAt,
                IsFinished = project.IsFinished
            };

            return Ok(projectDTO);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult> DeleteProject(Guid id, [FromBody] Guid userID)
        {
            var project = await repo.Project.GetProject(id);

            if (project is null)
                return BadRequest();

            if (project.OwnerID is null || project.OwnerID != userID.ToString())
                return Unauthorized();

            project.IsDeleted = true;

            await repo.Project.UpdateProject(project);
            await repo.Save();

            return NoContent();
        }

        [HttpPost("{id}")]
        public async Task<ActionResult> UpdateProject(Guid id, [FromBody] ProjectEditDTO projectDTO)
        {
            if (id != projectDTO.ProjectID)
                return BadRequest();

            var project = await repo.Project.GetProject(id);

            if (project is null)
                return NotFound();

            project.ID = projectDTO.ProjectID;
            project.Title = projectDTO.Title;
            project.OwnerID = projectDTO.OwnerID.ToString();
            project.CUpdateAt = DateTime.Now;

            await repo.Project.UpdateProject(project);
            await repo.Save();

            return NoContent();
        }


        [HttpGet] 
        public async Task<ActionResult> GetProjects()
        {
            var projects = await repo.Project.GetAllProjects();
            var ptojectListDTO = new ProjectListDTO
            {
                Projects = projects.Select(p => new ProjectDTO
                {
                    ID = p.ID,
                    Title = p.Title,
                    Owner = null,
                    Boards = null,
                    CreateAt = p.CreateAt,
                    CUpdateAt = p.CUpdateAt,
                    IsFinished = p.IsFinished
                }).ToList(),

                Count = projects.Count()
            };
                
            return Ok(ptojectListDTO);
        }

        [HttpPost]
        public async Task<ActionResult> CreateProject([FromBody] ProjectCreateDTO model)
        {
            if(!ModelState.IsValid || model is null)
            {
                logger.LogWarn($"ProjectCreateDTO object sent from client is null or invalid.");
                return BadRequest();
            }

            var project = new Project
            {
                ID = Guid.NewGuid(),
                Title = model.Title,
                OwnerID = model.OwnerID.ToString()
            };

            await repo.Project.CreateProject(project);
            await repo.Save();

            var projectDTO = new ProjectDTO
            {
                ID = project.ID,
                Title = project.Title,
                Owner = null,
                Boards = null,
                CreateAt = project.CreateAt,
                CUpdateAt = project.CUpdateAt,
                IsFinished = project.IsFinished
            };

            return CreatedAtAction(nameof(GetProject), new { id = projectDTO.ID }, projectDTO);
        }
    }
}
