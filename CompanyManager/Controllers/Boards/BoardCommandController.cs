using CompanyManager.Controllers.Projects;
using CompanyManager.Features.Commands.Boards;
using CompanyManager.Features.Commands.Projects;
using CompanyManager.Models.DTOs.API;
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

        [HttpPost("{id}")]
        public async Task<ActionResult<ProjectDTO>> UpdateBoard(Guid id, [FromBody] BoardEditDTO boardDTO)
        {
            if (id != boardDTO.BoardID)
            {
                logger.LogWarn($"ID and project.ID not match.");
                return BadRequest();
            }

            if(boardDTO.ProjectID == Guid.Empty)
            {
                logger.LogWarn($"Project ID is incorrect.");
                return BadRequest();
            }

            var project = repo.Project.GetProject(boardDTO.ProjectID);
            if (project is null)
            {
                logger.LogWarn($"The indicated project does not exist in the data base.");
                return BadRequest();
            }

            var updatedBoard = await mediator.Send(new UpdateBoardCommand()
            {
                ID = boardDTO.BoardID,
                Name = boardDTO.Name,
                ProjectID = boardDTO.ProjectID
            });

            if (updatedBoard is null)
                return BadRequest();

            return Ok(updatedBoard);
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

            return CreatedAtAction(nameof(BoardQueryController.GetBoard), new { id = createdBoard.ID }, createdBoard);
        }

        [HttpPost("{boardId}")]
        public async Task<ActionResult> DeleteBoard(Guid boardId, [FromBody] BoardDeleteDTO model)
        {
            var board = await repo.Board.GetBoard(boardId, false);

            if (board is null)
            {
                logger.LogWarn($"Board with id: {boardId} dosn't exist in the database.");
                return BadRequest();
            }

            var result = await mediator.Send(new DeleteBoardCommand()
            {
                Board = board
            });

            if (!result)
                return BadRequest();

            return NoContent();
        }
    }
}
