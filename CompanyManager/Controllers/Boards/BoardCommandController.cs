using CompanyManager.Controllers.Projects;
using CompanyManager.Features.Commands.Boards;
using CompanyManager.Features.Commands.Projects;
using CompanyManager.Models.DTOs.API.BoardDTOs;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CompanyManager.Controllers.Boards
{
    [ApiController]
    [Route("api/board/command/[action]")]
    public class BoardCommandController : Controller
    {
        private readonly IRepositoryManager repo;
        private readonly ILoggerManager logger;
        private readonly IMediator mediator;

        public BoardCommandController(
            IRepositoryManager repo,
            ILoggerManager logger,
            IMediator mediator)
        {
            this.repo = repo;
            this.logger = logger;
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult> CreateBoard([FromBody] BoardCreateDTO model)
        {
            if (!ModelState.IsValid || model is null)
            {
                logger.LogWarn($"BoardCreateDTO sent from client is null or invalid.");
                return BadRequest();
            }

            var createdBoard = await mediator.Send(new CreateBoardCommand()
            {
                Name = model.Name,
                ProjectID = model.ProjectID,
            });

            if (createdBoard is null)
                return BadRequest();

            return Ok(createdBoard);
            //return CreatedAtAction(nameof(ProjectQueryController.GetProject), new { id = createdProject.ID }, createdProject);
        }
    }
}
