using CompanyManager.Models.DTOs.API;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using MediatR;

namespace CompanyManager.Features.Queries.Projects
{
    public class GetProjectByID : IRequest<ProjectDTO>
    {
        public Guid ID { get; set; }

        public class GetProjectByIDQueryHandler : IRequestHandler<GetProjectByID, ProjectDTO>
        {
            private readonly IRepositoryManager repository;
            private readonly ILoggerManager logger;

            public GetProjectByIDQueryHandler(
                IRepositoryManager repository,
                ILoggerManager logger)
            {
                this.repository = repository;
                this.logger = logger;
            }

            public async Task<ProjectDTO> Handle(GetProjectByID request, CancellationToken cancellationToken)
            {
                var project = await repository.Project.GetProject(request.ID);

                if (project is null)
                    return null;

                var projectDTO = new ProjectDTO
                {
                    ID = project.ID,
                    Title = project.Title,
                    OwnerID = project.OwnerID.ToUpper(),
                    Boards = null,
                    CreateAt = project.CreateAt,
                    UpdateAt = project.UpdateAt,
                    IsFinished = project.IsFinished
                };

                return projectDTO;
            }
        }
    }
}
