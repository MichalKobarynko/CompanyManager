using CompanyManager.Features.Queries.Users;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CompanyManager.Controllers.Users
{
    [ApiController]
    [Route("api/user/query/[action]")]
    public class UserQueryController : ControllerBase
    {
        private readonly ILoggerManager logger;
        private readonly IRepositoryManager repository;
        private readonly IMediator mediator;

        public UserQueryController(
            ILoggerManager logger,
            IRepositoryManager repository,
            IMediator mediator)
        {
            this.logger = logger;
            this.repository = repository;
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllUserList()
        {
            var users = await mediator.Send(new GetAllUserListQuery());

            return Ok(users);
        }
    }
}
