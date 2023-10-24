using CompanyManager.Features.Commands.Columns;
using CompanyManager.Models.DTOs.API.Columns;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CompanyManager.Controllers.Columns
{

    [ApiController]
    [Route("api/column/command/[action]")]
    public class ColumnCommandController : Controller
    {
        private readonly IRepositoryManager repo;
        private readonly ILoggerManager logger;
        private readonly IMediator mediator;

        public ColumnCommandController(
            IRepositoryManager repo,
            ILoggerManager logger,
            IMediator mediator)
        {
            this.repo = repo;
            this.logger = logger;
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult> CreateColumn([FromBody] ColumnCreateDTO model)
        {
            if (!ModelState.IsValid || model is null)
            {
                logger.LogWarn($"ColumnCreateDTO sent from client is null or invalid.");
                return BadRequest();
            }

            var createdColumn = await mediator.Send(new CreateColumnCommand()
            {
                Name = model.Name,
                DotColor = model.DotColor,
                BoardID = model.BoardID,
            });

            if (createdColumn is null)
                return BadRequest();

            return Ok(createdColumn);
            //return CreatedAtAction(nameof(ProjectQueryController.GetProject), new { id = createdProject.ID }, createdProject);
        }
    }

}
