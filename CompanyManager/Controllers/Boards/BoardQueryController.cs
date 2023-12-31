﻿using CompanyManager.Features.Queries.Boards;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CompanyManager.Controllers.Boards
{
    [ApiController]
    [Route("api/board/query/[action]")]
    public class BoardQueryController : ControllerBase
    {
        private readonly IRepositoryManager repository;
        private readonly ILoggerManager logger;
        private readonly IMediator mediator;
        public BoardQueryController(
            IRepositoryManager repository,
            ILoggerManager logger,
            IMediator mediator)
        {
            this.repository = repository;
            this.logger = logger;
            this.mediator = mediator;
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult> GetProject(Guid id)
        //{
        //    var projectDTO = await mediator.Send(new GetProjectByID() { ID = id });

        //    if (projectDTO is null)
        //    {
        //        logger.LogWarn($"Project with id: {id} dosn't exist in the database.");
        //        return NotFound();
        //    }

        //    return Ok(projectDTO);


        [HttpGet("{projectId}")]
        public async Task<ActionResult> GetBoardsByProject(Guid projectId)
        {
            var project = await repository.Project.GetProject(projectId);

            if (project is null)
            {
                logger.LogWarn($"Project with id: {projectId} dosn't exist in the database.");
                return BadRequest();
            }
            var boards = await mediator.Send(new GetBoardsByProjectQuery() { ProjectId = projectId });

            return Ok(boards);
        }
    }
}
