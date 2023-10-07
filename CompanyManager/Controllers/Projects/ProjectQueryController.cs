using CompanyManager.DTOs.API;
using CompanyManager.Features.Queries;
using CompanyManager.Features.Queries.Projects;
using CompanyManager.Models;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CompanyManager.Controllers.Projects
{
    [ApiController]
    [Route("api/[controller]/query/[action]")]
    public class ProjectQueryController : ControllerBase
    {
        private readonly IRepositoryManager repo;
        private readonly ILoggerManager logger;
        private readonly IMediator mediator;
        public ProjectQueryController(
            IRepositoryManager repo,
            ILoggerManager logger,
            IMediator mediator)
        {
            this.repo = repo;
            this.logger = logger;
            this.mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetProject(Guid id)
        {
            var projectDTO = await mediator.Send(new GetProjectByID() { ID = id });

            if (projectDTO is null)
            {
                logger.LogWarn($"Project with id: {id} dosn't exist in the database.");
                return NotFound();
            }
               
            return Ok(projectDTO);
        }

        [HttpGet]
        public async Task<ActionResult> GetProjects()
        {
            var projects = await mediator.Send(new GetAllProjectsQuery());

            return Ok(projects);
        }

    }
}
