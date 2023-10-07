using CompanyManager.Models;
using CompanyManager.Models.DBContext;
using CompanyManager.Models.DTOs.API;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using MediatR;

namespace CompanyManager.Features.Commands.Projects
{
    public class CreateProjectCommand : IRequest<ProjectDTO>
    {
        public string Title { get; set; }
        public string OwnerID { get; set; }

        public class CreateProjectCommandHandler : IRequestHandler<CreateProjectCommand, ProjectDTO>
        {
            private readonly IRepositoryManager repository;
            private readonly ILoggerManager logger;

            public CreateProjectCommandHandler(
                IRepositoryManager repository,
                ILoggerManager logger)
            {
                this.repository = repository;
                this.logger = logger;
            }

            public async Task<ProjectDTO> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
            {
                var project = new Project
                {
                    ID = Guid.NewGuid(),
                    Title = request.Title,
                    OwnerID = request.OwnerID
                };

                await repository.Project.CreateProject(project);
                await repository.Save();

                var projectDTO = new ProjectDTO
                {
                    ID = project.ID,
                    Title = project.Title,
                    Owner = null,
                    Boards = null,
                    CreateAt = project.CreateAt,
                    CUpdateAt = project.UpdateAt,
                    IsFinished = project.IsFinished
                };

                return projectDTO;
            }
        }
    }
}
