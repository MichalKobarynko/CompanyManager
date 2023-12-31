﻿using CompanyManager.Features.Commands.Projects;
using CompanyManager.Features.Queries;
using CompanyManager.Features.Queries.Projects;
using CompanyManager.Models;
using CompanyManager.Models.DTOs.API;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CompanyManager.Controllers.Projects
{
    [ApiController]
    [Route("api/project/command/[action]")]
    public class ProjectCommandController : ControllerBase
    {
        private readonly IRepositoryManager repo;
        private readonly ILoggerManager logger;
        private readonly IMediator mediator;
        public ProjectCommandController(
            IRepositoryManager repo,
            ILoggerManager logger,
            IMediator mediator)
        {
            this.repo = repo;
            this.logger = logger;
            this.mediator = mediator;
        }

        

        [HttpPost("{id}")]
        public async Task<ActionResult> DeleteProject(Guid id, [FromBody] ProjectDelteDTO model)
        {
            var project = await repo.Project.GetProject(id);

            if (project is null)
            {
                logger.LogWarn($"Project with id: {id} dosn't exist in the database.");
                return BadRequest();
            }

            if (project.OwnerID is null || project.OwnerID != model.OwnerID.ToString())
            {
                logger.LogWarn($"Only owner can delete project with id: {id}.");
                return Unauthorized();
            }

            var result = await mediator.Send(new DeleteProjectCommand()
            {
                Project = project
            });
            
            return NoContent();
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<ProjectDTO>> UpdateProject(Guid id, [FromBody] ProjectEditDTO projectDTO)
        {
            if (id != projectDTO.ProjectID)
            {
                logger.LogWarn($"ID and project.ID not match.");
                return BadRequest();
            }

            var updatedProject = await mediator.Send(new UpdateProjectCommand()
            {
                ID = projectDTO.ProjectID,
                Title = projectDTO.Title,
                OwnerID = projectDTO.OwnerID.ToString()
            });

            if(updatedProject is null)
                return BadRequest();

            return Ok(updatedProject);
        }


        [HttpPost]
        public async Task<ActionResult> CreateProject([FromBody] ProjectCreateDTO model)
        {
            if (!ModelState.IsValid || model is null)
            {
                logger.LogWarn($"ProjectCreateDTO sent from client is null or invalid.");
                return BadRequest();
            }

            var createdProject = await mediator.Send(new CreateProjectCommand() {
                Title = model.Title,
                OwnerID = model.OwnerID.ToString(), 
            });

            if (createdProject is null)
                return BadRequest();

            return CreatedAtAction(nameof(ProjectQueryController.GetProject), new { id = createdProject.ID }, createdProject);
        }
    }
}
